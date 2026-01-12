import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const norm = (s: any) => (s ?? "").toString().trim();
const lower = (s: any) => norm(s).toLowerCase();
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

function issueJwt(user: any) {
  const payload = { email: user.email };
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign(payload, secret, { expiresIn });
}

function toSafeUser(doc: any) {
  const u = doc?.toObject ? doc.toObject() : { ...doc };
  delete u.password;
  return u;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    let { email, password } = body || {};
    password = norm(password);

    if (!password || !email) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
    }

    if (!isEmail(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "Email not found" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password!);
    if (!ok) {
      return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
    }

    const token = issueJwt(user);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      data: toSafeUser(user),
    });
  } catch (error: any) {
    console.error("login API error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

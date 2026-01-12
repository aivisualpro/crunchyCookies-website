// client/src/pages/Cart/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { createOrder } from "../api/order";
import { createPayment } from "../api/payments";

export default function PaymentSuccess() {
  const navigate = useRouter();
  const location = usePathname();
  const [ordersPath, setOrdersPath] = useState("/");
  const [status, setStatus] = useState("processing"); // processing | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    const createTransactions = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.user?._id;


        if (!userId) {
          setStatus("error");
          setErrorMsg("User not found in localStorage.");
          return;
        }

        const payload = { sessionId, userId };

        const payment = await createPayment(payload); // 👈 await

        if (payment?.success) {
          // yahan se pata chal jayega alreadyExists hai ya nahi
          // setStatus ko yahan success mat karo, neeche order create hone ke baad karo,
          // ya yahan sirf log rakh lo.
        } else {
          setStatus("error");
          setErrorMsg(payment?.message || "Payment could not be created.");
        }
      } catch (error) {
        console.error("createPayment from success page failed:", error);
        setStatus("error");
        setErrorMsg("Something went wrong while creating your payment.");
      }
    };

    createTransactions();
  }, [location.search]);

  useEffect(() => {
    const run = async () => {
      const raw = JSON.parse(localStorage.getItem("order"));
      if (!raw) {
        setStatus("error");
        setErrorMsg("No order data found. Please try again.");
        return;
      }

      try {
        const payload = raw;

        // route for "View Orders" button
        setOrdersPath(`/member/${payload.user}/orders`);

        const res = await createOrder(payload);

        if (res?.success) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMsg(res?.message || "Order could not be created.");
        }
      } catch (err) {
        console.error("createOrder from success page failed:", err);
        setStatus("error");
        setErrorMsg("Something went wrong while creating your order.");
      }
    };

    run();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7fb]">
      <div className="bg-white rounded-3xl shadow-xl px-10 py-10 w-full max-w-md text-center">
        {/* Green icon circle */}
        <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
          <FiCheckCircle className="text-emerald-500" size={32} />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Payment Successful
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          {status === "processing"
            ? "We received your payment, finalizing your order…"
            : "Thank you for your payment!"}
        </p>

        {/* {status === "error" && (
          <p className="text-xs text-red-500 mb-4">{errorMsg}</p>
        )} */}

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex justify-center items-center px-6 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate(ordersPath)}
            className="inline-flex justify-center items-center px-6 py-2.5 rounded-full border border-emerald-200 text-emerald-600 text-sm font-medium hover:bg-emerald-50 transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}

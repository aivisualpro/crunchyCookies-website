import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, enum: ['ADMIN', 'CUSTOMER', 'SUPER_ADMIN'] },
        permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permissions" }],
    },
    { timestamps: true }
);

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);

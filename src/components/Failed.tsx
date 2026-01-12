// client/src/pages/Cart/PaymentFailed.jsx
import React from "react";
import { useRouter } from "next/navigation";
import { FiXCircle } from "react-icons/fi";

export default function PaymentFailed() {
  const navigate = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7fb]">
      <div className="bg-white rounded-3xl shadow-xl px-10 py-10 w-full max-w-md text-center">
        {/* Red icon circle */}
        <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-red-100 flex items-center justify-center">
          <FiXCircle className="text-red-500" size={32} />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Payment Failed
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Something went wrong with your payment. Please try again or use a
          different method.
        </p>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => navigate.push('/')} // back to cart
            className="inline-flex justify-center items-center px-6 py-2.5 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
          >
            Go Back To Home
          </button>

        </div>
      </div>
    </div>
  );
}

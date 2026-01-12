// OngoingOrder.jsx
import React, { useMemo, useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import {
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { CyanConnector, DotStepIcon } from "./StepperUtils";
import Modal from "../Modal";
import Card from "./Card";
import { updateOrder } from "../../api/order";
import { ClipLoader } from "react-spinners";
import { useOngoingOrder } from "../../hooks/orders/useOrder";

const ORDER_STATUS = ["pending", "confirmed", "shipped", "delivered", "cancelled", "returned"];
const PAYMENT_STATUS = ["pending", "paid", "failed", "refunded", "partial"];

interface OrderItem {
  en_name: string;
  ar_name: string;
  image: string;
  qty: number;
  price: number;
  allocations: unknown[];
}

interface Recipient {
  phone?: string;
  [key: string]: unknown;
}

interface OrderData {
  _id: string;
  orderId: string;
  code: string;
  status: string;
  paymentStatus: string;
  placedAt: string;
  totalItems: number;
  grandTotal: number;
  sender: string;
  receiver: string;
  coupon?: unknown;
  couponType?: string;
  taxAmount?: number;
  items: OrderItem[];
  recipients: Recipient[];
}

export default function OngoingOrdersCard() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const matches = useMediaQuery("(max-width:767px)");
  const queryClient = useQueryClient();

  const [itemsOpen, setItemsOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderData | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reasonOpen, setReasonOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<OrderData | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [canceling, setCanceling] = useState(false);
  const [cancelErr, setCancelErr] = useState("");

  const statusToIndex = (s: string | null | undefined) =>
    Math.max(0, ORDER_STATUS.indexOf(String(s || "").toLowerCase()));

  const statusLabel = (s: string | null | undefined) => {
    const key = String(s || "").toLowerCase();
    if (!isAr) return key.charAt(0).toUpperCase() + key.slice(1);
    switch (key) {
      case "pending": return "زیر التواء";
      case "confirmed": return "تصدیق شدہ";
      case "shipped": return "بھیجا گیا";
      case "delivered": return "ڈیلیورڈ";
      case "cancelled": return "منسوخ";
      case "returned": return "واپس";
      default: return key;
    }
  };

  // user id
  const stored = localStorage.getItem("user");
  const parsed = stored ? JSON.parse(stored) : {};
  const userObj = parsed.user || parsed || {};
  const userId = userObj?._id || userObj?.id;

  const {
    data: raw,
    isLoading,
    isFetching,
    error,
  } = useOngoingOrder({
    userId,
    refetchInterval: 10000,
  });

  // ---------- JSON→UI mapping (updated for your payload) ----------
  const list = useMemo((): OrderData[] => {
    const rows = Array.isArray(raw?.data) ? raw.data : Array.isArray(raw) ? raw : [];
    return rows.map((node: Record<string, unknown>) => {
      // Your shape: node { _id, order: { _id, code, status, payment, items[], recipients[], ... }, paymentStatus, status, at/placedAt, ... }
      const o = (node?.order || {}) as Record<string, unknown>;
      const items = Array.isArray(o?.items) ? o.items : [];
      const recipients = Array.isArray(o?.recipients) ? o.recipients : [];

      const totalItems = items.reduce((sum: number, it: Record<string, unknown>) => sum + Number(it?.quantity || 0), 0);

      const modalItems = items.map((it: Record<string, unknown>) => {
        const p = (it?.product || {}) as Record<string, unknown>; // <- product (not products)
        return {
          en_name: (p?.title as string) || "",
          ar_name: (p?.ar_title as string) || "",
          image: (p?.featuredImage as string) || "",
          qty: Number(it?.quantity || 0),
          price: Number(p?.price ?? 0),
          allocations: Array.isArray(it?.allocations) ? it.allocations : [],
        };
      });

      return {
        _id: (node?._id || o?._id) as string,
        orderId: o?._id as string,
        code: (o?.code || node?.code) as string,
        status: (((node?.status || o?.status || "pending") as string)).toLowerCase(),
        paymentStatus: (((node?.paymentStatus || o?.payment || "pending") as string)).toLowerCase(),
        placedAt: (o?.placedAt || node?.at || node?.createdAt || o?.createdAt) as string,
        totalItems,
        grandTotal: Number(o?.grandTotal ?? node?.grandTotal ?? 0),
        sender: (o?.senderPhone || "") as string,
        // multiple recipients -> show all phones joined
        receiver: recipients.map((r: Record<string, unknown>) => r?.phone).filter(Boolean).join(", "),
        coupon: o?.appliedCoupon ? (o.appliedCoupon as Record<string, unknown>)?.value : undefined,
        couponType: o?.appliedCoupon ? (o.appliedCoupon as Record<string, unknown>)?.type as string : undefined,
        taxAmount: o?.taxAmount as number | undefined,
        items: modalItems,
        recipients: recipients as Recipient[], // pass through if your Modal wants to show them
      };
    });
  }, [raw]);

  const visibleList = useMemo(
    () => list.filter((o: OrderData) => !["cancelled", "returned", "delivered"].includes(o.status)),
    [list]
  );

  const openItems = (orderObj: OrderData) => {
    setActiveOrder(orderObj);
    setItemsOpen(true);
  };
  const closeItems = () => setItemsOpen(false);

  // ------- Cancel flow -------
  const askCancel = (order: OrderData) => {
    setCancelErr("");
    setCancelReason("");
    setCancelTarget(order);
    setConfirmOpen(true);
  };

  const onConfirmNo = () => {
    setConfirmOpen(false);
    setCancelTarget(null);
    setCancelReason("");
    setCancelErr("");
  };

  const onConfirmYes = () => {
    setConfirmOpen(false);
    setReasonOpen(true);
  };

  const onReasonCancel = () => {
    setReasonOpen(false);
    setCancelTarget(null);
    setCancelReason("");
    setCancelErr("");
  };

  const submitCancel = async () => {
    if (!cancelTarget?.orderId) return;
    if (!cancelReason.trim()) {
      setCancelErr(isAr ? "براہ کرم منسوخی کی وجہ درج کریں." : "Please provide a reason to cancel the order.");
      return;
    }
    try {
      setCancelErr("");
      setCanceling(true);
      const payload = { status: "cancelled", cancelReason: cancelReason.trim() };
      await updateOrder(payload, cancelTarget.orderId);
      await queryClient.invalidateQueries({ queryKey: ["orders:ongoing", userId] });
      setReasonOpen(false);
      setCancelTarget(null);
      setCancelReason("");
    } catch (e: unknown) {
      console.error(e);
      setCancelErr((e as Error)?.message || (isAr ? "آرڈر منسوخ کرنے میں ناکامی." : "Failed to cancel order."));
    } finally {
      setCanceling(false);
    }
  };

  // ---- UI states
  if (isLoading) {
    return (
      <Card>
        <div className="p-4 mx-auto">{isAr ? "جاری آرڈرز لوڈ ہو رہے ہیں..." : <ClipLoader />}</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="p-4 text-red-500">{error?.message || (isAr ? "لوڈ کرنے میں ناکامی۔" : "Failed to load ongoing orders.")}</div>
      </Card>
    );
  }

  return (
    <Card>
      {visibleList.length === 0 ? (
        <div className="p-4 opacity-70">
          {isAr ? "کوئی جاری آرڈر نہیں" : "No ongoing orders"}
        </div>
      ) : (
        visibleList.map((order) => {
          const current = statusToIndex(order.status);
          const itemsText = isAr ? "آئٹمز" : "items";
          const codText = isAr ? "ادائیگی" : "Payment";
          const orderNoText = isAr ? "آرڈر" : "Order";

          return (
            <div key={order._id} className="mb-6">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-primary ring-1 ring-primary/20">
                  <BsBagCheck />
                </div>
                <div className="text-black">
                  <div className="font-semibold">
                    {orderNoText} #{order.code || String(order._id).slice(-6)}
                  </div>
                  <div className="text-xs text-slate-500">
                    {codText}:{" "}
                    {PAYMENT_STATUS.includes(order.paymentStatus)
                      ? order.paymentStatus
                      : "pending"}
                    {isFetching && <span className="ml-2 opacity-60">• updating…</span>}
                  </div>
                </div>
              </div>

              {/* Stepper */}
              <div className="mt-4 flex md:flex-row flex-col items-center gap-4">
                <div className="md:w-[70%]" style={{ direction: "ltr" }}>
                  <Stepper
                    activeStep={current}
                    alternativeLabel
                    connector={matches ? undefined : <CyanConnector />}
                    orientation={matches ? "vertical" : "horizontal"}
                  >
                    {ORDER_STATUS.slice(0, 4).map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={DotStepIcon}>
                          {statusLabel(label)}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>

                {/* Actions */}
                <div className="shrink-0 flex md:flex-row flex-col gap-3">
                  <button
                    onClick={() => openItems(order)}
                    className="xl:text-base md:w-auto w-full lg:text-xs rounded-xl bg-primary px-3 xl:px-5 py-2 font-semibold text-white shadow hover:bg-primary/80"
                  >
                    {isAr ? "آئٹمز دیکھیں" : "View Items"}
                  </button>

                  <button
                    onClick={() => askCancel(order)}
                    className="xl:text-base md:w-auto w-full lg:text-xs rounded-xl hover:bg-rose-50 bg-rose-100 px-3 xl:px-5 py-2 font-semibold text-rose-500"
                  >
                    {isAr ? "آرڈر منسوخ کریں" : "Cancel Order"}
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="mt-4 flex md:flex-row flex-col items-center lg:gap-x-3 xl:gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">
                  {String(order.totalItems).padStart(2, "0")}{" "}
                </span>{" "}
                {itemsText}
                <span className="mx-1">•</span> {isAr ? "کل" : "Total"}: QAR {order.grandTotal ?? 0}
                {order.placedAt && (
                  <>
                    <span className="mx-1">•</span>
                    {isAr ? "آرڈر کیا گیا" : "Placed"}:{" "}
                    {new Date(order.placedAt).toLocaleString()}
                  </>
                )}
                <span className="mx-1">•</span>
                {isAr ? "سٹیٹس" : "Status"}: {statusLabel(order.status)}
              </div>
            </div>
          );
        })
      )}

      {/* Modal: view items */}
      <Modal itemsOpen={itemsOpen} closeItems={closeItems} activeOrder={activeOrder} isAr={isAr} />

      {/* Dialog 1: Confirm cancellation */}
      <Dialog open={confirmOpen} onClose={onConfirmNo} maxWidth="xs" fullWidth>
        <DialogTitle>{isAr ? "کیا آپ یقینی ہیں؟" : "Cancel this order?"}</DialogTitle>
        <DialogContent>
          {isAr ? "یہ کاروائی آرڈر کو منسوخ کر دے گی۔" : "This action will cancel the order."}
        </DialogContent>
        <DialogActions>
          <button onClick={onConfirmNo} className="rounded-lg px-4 py-2 bg-gray-100 hover:bg-gray-200">
            {isAr ? "منسوخ" : "No, keep it"}
          </button>
          <button onClick={onConfirmYes} className="rounded-lg px-4 py-2 bg-rose-600 text-white hover:bg-rose-700">
            {isAr ? "ہاں، منسوخ کریں" : "Yes, cancel"}
          </button>
        </DialogActions>
      </Dialog>

      {/* Dialog 2: Reason input */}
      <Dialog open={reasonOpen} onClose={onReasonCancel} maxWidth="sm" fullWidth>
        <DialogTitle>{isAr ? "منسوخی کی وجہ" : "Cancellation reason"}</DialogTitle>
        <DialogContent>
          {cancelErr && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {cancelErr}
            </Alert>
          )}
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={3}
            placeholder={isAr ? "یہاں وجہ لکھیں..." : "Write your reason here…"}
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={onReasonCancel}
            disabled={canceling}
            className="rounded-lg px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-60"
          >
            {isAr ? "منسوخ" : "Cancel"}
          </button>
          <button
            onClick={submitCancel}
            disabled={canceling}
            className="rounded-lg px-4 py-2 bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-60"
          >
            {canceling ? (isAr ? "برائے مہربانی انتظار کریں…" : "Please wait…") : isAr ? "جمع کرائیں" : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

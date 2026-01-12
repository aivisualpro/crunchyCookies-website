import React, { useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import { orders } from "../../lib/orderHistory";
import Link from "next/link";
import { MdOutlineArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";

const PRIMARY = "#0FB4BB";
const BORDER = "#BFE8E7";
const ROW_BG = "rgba(15, 180, 187, 0.03)";

const pad2 = (n) => String(n).padStart(2, "0");
const currency = (n) => `${n}`;

export default function OrdersTable({ rows = orders }) {
  const [itemsOpen, setItemsOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const openItems = (order) => {
    setActiveOrder(order);
    setItemsOpen(true);
  };
  const closeItems = () => setItemsOpen(false);

  return (
    <>
      <section id="order-history" className="pt-4 pb-10" dir={isAr ? "rtl" : "ltr"}>
        <div className="custom-container pb-8">
          <Link href={"/"}>
            <div className="bg-[#0fb5bb25] p-2 inline-block rounded-full">
              {isAr ? (
                <MdArrowForwardIos
                  size={24}
                  className="cursor-pointer text-primary"
                />
              ) : (
                <MdOutlineArrowBackIos
                  size={24}
                  className="cursor-pointer text-primary"
                />
              )}
            </div>
          </Link>

          <div className="flex items-center justify-between mt-4">
            <h2 className="text-center text-[2rem] lg:text-[2.5rem] text-primary">
              {isAr ? "تاريخ الطلب" : "Order History"}
            </h2>
          </div>

          <div className="mt-10">
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                border: `1px solid ${BORDER}`,
                borderRadius: "18px",
                overflow: "hidden",
                bgcolor: "#FFFFFF",
                width: "100%",
                overflowX: "auto",
              }}
            >
              <Box sx={{ px: { xs: 1, sm: 2 }, pt: 2 }}>
                <Table
                  sx={{
                    minWidth: 1200,
                    "& th": {
                      color: PRIMARY,
                      fontWeight: 600,
                      borderBottom: `1px solid ${BORDER}`,
                      whiteSpace: "nowrap",
                    },
                    "& td": { borderBottom: `1px solid ${BORDER}` },
                  }}
                  aria-label="orders table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: "1.2rem", width: 80 }}>
                        S.No
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.2rem", fontWeight: 400 }}>
                        Sender Number
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.2rem", fontWeight: 400 }}>
                        Receiver Number
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.2rem", fontWeight: 400 }}>
                        Price
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.2rem", fontWeight: 400 }}>
                        Total Items
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.2rem", fontWeight: 400 }}>
                        Date
                      </TableCell>
                      <TableCell align="right" sx={{ width: 220 }} />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows.map((row, idx) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          bgcolor: ROW_BG,
                          "&:last-child td": { borderBottom: 0 },
                        }}
                      >
                        <TableCell
                          sx={{
                            color: PRIMARY,
                            fontSize: "1.2rem",
                            fontWeight: 600,
                          }}
                        >
                          {pad2(idx + 1)}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#4B5563",
                            fontSize: "1.2rem",
                            fontWeight: 400,
                          }}
                        >
                          {row.sender}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#4B5563",
                            fontSize: "1.2rem",
                            fontWeight: 400,
                          }}
                        >
                          {row.receiver}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#4B5563",
                            fontSize: "1.2rem",
                            fontWeight: 400,
                          }}
                        >
                          {currency(row.price)}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#4B5563",
                            fontSize: "1.2rem",
                            fontWeight: 400,
                          }}
                        >
                          {pad2(row.totalItems)}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#4B5563",
                            fontSize: "1.2rem",
                            fontWeight: 400,
                          }}
                        >
                          {row.date}
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              justifyContent: "flex-end",
                              flexWrap: "wrap",
                            }}
                          >
                            {/* View receipt -> open in new tab */}
                            <Button
                              component="a"
                              href="https://b.stripecdn.com/docs-statics-srv/assets/terminal-pre-built-receipt.64db66739eaf8f8db1f9dd61c463a322.png"
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              variant="contained"
                              sx={{
                                textTransform: "none",
                                bgcolor: PRIMARY,
                                "&:hover": { bgcolor: "#0fb4bbd9" },
                                borderRadius: "10px",
                                px: 2,
                                minWidth: 120,
                              }}
                            >
                              {isAr ? "عرض الإيصال" : "View receipt"}
                            </Button>

                            {/* View items -> CRUNCHY style modal */}
                            <Button
                              onClick={() => openItems(row)}
                              size="small"
                              variant="outlined"
                              sx={{
                                textTransform: "none",
                                color: PRIMARY,
                                borderColor: PRIMARY,
                                "&:hover": {
                                  borderColor: PRIMARY,
                                  bgcolor: "rgba(15,180,187,0.08)",
                                },
                                borderRadius: "10px",
                                px: 2,
                                minWidth: 120,
                              }}
                            >
                              {isAr ? "عرض العناصر" : "View items"}
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Divider sx={{ borderColor: BORDER }} />
              </Box>
            </TableContainer>
          </div>

        </div>
      </section>

      {/* ---------- Items Modal (CRUNCHY COOKIES style) ---------- */}
      <Modal
        itemsOpen={itemsOpen}
        closeItems={closeItems}
        activeOrder={activeOrder}
        isAr={isAr}
      />
    </>
  );
}

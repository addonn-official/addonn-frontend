"use client";

import React, { useEffect, useMemo, useState } from "react";
import { showInfo } from "../../utils/swal";

import { useAppContext } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { refundRequestAction, resetRefundRequest } from "@/redux/action/OrderAction";
import Swal from "sweetalert2";

const OrderHistory = () => {
  const { userData, loadingUser } = useAppContext();
  const [refundStatusMap, setRefundStatusMap] = useState({});

  const [isRefundReq, setIsRefundReq] = useState(false)
  const [refundReqReason, setRefundReqReason] = useState('')
  const [orderID, setOrderID] = useState(null)

  const [refundType, setRefundType] = useState("full");
  const [partialAmount, setPartialAmount] = useState("");

  const { refundLoading, refundSuccess, refundError, refundMsg, } = useSelector((state) => state.OrderReducer);
  const dispatch = useDispatch();

  const u = userData || {};
  const orders = useMemo(() => u.orders || [], [u.orders]);

  if (loadingUser) return <div className="skeleton" style={{ height: "400px" }}></div>;

  const normalizeOrderStatus = (order) => {
    const label = String(order?.transaction?.status || "-").trim();
    const lowerLabel = label.toLowerCase();

    if (lowerLabel.includes("cancel")) return "Cancel";
    if (lowerLabel.includes("pending")) return "Pending";
    if (lowerLabel.includes("success")) return "Successful";
    if (lowerLabel.includes("paid")) return "Successful";
    return label || "N/A";
  };

  const formatDate = (dateString) => {
    if (!dateString) return { date: "-", time: "-" };
    const parts = String(dateString).split(" ");
    if (parts.length >= 2) {
      return { date: parts[0], time: parts.slice(1).join(" ") };
    }
    return { date: dateString, time: "" };
  };

  const getInfoMessage = (order) => {
    return (
      order.message ||
      order.status_message ||
      order.refund?.message ||
      order.refund?.note ||
      order.note ||
      ""
    );
  };

  const handleShowInfo = async (message) => {
    if (!message) return;
    await showInfo("Order Message", String(message));
  };

  const handleRefundClick = (orderId) => {
    setOrderID((prev) => orderId)
    setIsRefundReq(!isRefundReq)
  };


  // useEffect(() => {
  //   if (refundSuccess) {
  //     dispatch(resetRefundRequest());
  //   }
  // }, [refundSuccess, dispatch]);


  const handleRefundRequest = () => {
    if (isRefundReq) {
      const payload = {
        order_id: orderID,
        reason: refundReqReason,
        refund_type: refundType,
        ...(refundType === "partial" && {
          amount: Number(partialAmount),
        }),
      };

      dispatch(refundRequestAction(payload));
      setIsRefundReq(false);
      setRefundReqReason("");
      setPartialAmount("");
      setRefundType("full");
    }
  }


  return (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        <div className="content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">Order History</h4>
          </div>

          {/* <div className="rbt-dashboard-table table-responsive mobile-table-750"> */}
          <div
            className="rbt-dashboard-table"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              paddingBottom: "10px",
            }}
          >
            {/* <table className="rbt-table table table-borderless"> */}
            <table
              className="rbt-table table table-borderless align-middle"
              style={{ minWidth: "1300px" }}
            >
              <thead>
                <tr>
                  <th style={{ minWidth: "120px" }}>Order ID</th>

                  <th style={{ minWidth: "300px" }}>
                    Course/Bundle
                  </th>

                  <th style={{ minWidth: "150px" }}>
                    Date
                  </th>

                  <th style={{ minWidth: "120px" }}>
                    Price
                  </th>

                  <th style={{ minWidth: "220px" }}>
                    Transaction Status
                  </th>

                  <th style={{ minWidth: "300px" }}>
                    Transaction ID
                  </th>

                  <th style={{ minWidth: "150px" }}>
                    Refund
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => {
                    const { date, time } = formatDate(order.created_at);
                    const statusText = normalizeOrderStatus(order);
                    const orderRefundStatus = order?.status_label || "";
                    const infoMessage = getInfoMessage(order);

                    const canRefund = order?.status === "paid" || order?.status === "partially_refunded" && !orderRefundStatus;
                    console.log('order>>>>', order)

                    return (
                      <tr key={index}
                        style={{
                          borderBottom: "1px solid #eee",
                        }}>
                        <th>#{order.order_id}</th>
                        <td> <div
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            lineHeight: "1.5",
                          }}
                        >{order.items?.map((item) => item.course?.title).join(", ") || "N/A"}</div></td>
                        <td>
                          <td>
                            <div className="fw-bold">{date}</div>
                            <small className="text">
                              {time}
                            </small>
                          </td>
                        </td>
                        <td>₹{order.final_amount}</td>


                        <td>
                          <div className="d-flex align-items-center gap-2"
                            style={{ whiteSpace: "nowrap", fontSize: "15px" }}>
                            <span
                              className={`rbt-badge-5 ${statusText === "Successful"
                                ? "bg-color-success-opacity color-success"
                                : statusText === "Pending"
                                  ? "bg-color-warning-opacity color-warning"
                                  : "bg-color-danger-opacity color-danger"
                                } fs-2`}
                            >
                              {order?.transaction?.status.charAt(0).toUpperCase() + order?.transaction?.status.slice(1)}
                            </span>
                            {infoMessage ? (
                              <button
                                type="button"
                                className="rbt-btn btn-xs bg-color-info-opacity color-info radius-round"
                                onClick={() => handleShowInfo(infoMessage)}
                                title="View order info"
                              >
                                <i className="feather-info" />
                              </button>
                            ) : null}
                          </div>
                        </td>

                        <td>
                          <div
                            style={{
                              maxWidth: "300px",
                              wordBreak: "break-all",
                              fontSize: "13px",
                            }}
                          >{order.transaction.id}
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="d-flex justify-content-center">
                            {canRefund ? (
                              <button
                                type="button"
                                className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                                onClick={() => handleRefundClick(order?.id)}
                              // disabled={Number(order.final_amount) === 0}    
                              >
                                Request
                              </button>
                            ) :
                              orderRefundStatus ? (
                                <span className="b3">{orderRefundStatus}</span>
                              ) : (
                                <span className="b3">-</span>
                              )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {
        isRefundReq && (
          <>
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                  {/* Header */}
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Refund Request
                    </h5>

                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setIsRefundReq(false)}
                    />
                  </div>

                  {/* Body */}
                  <div className="modal-body">

                    {/* Refund Type */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Refund Type
                      </label>

                      <div className="d-flex flex-wrap gap-4">

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="refundType"
                            id="fullRefund"
                            checked={refundType === "full"}
                            onChange={() =>
                              setRefundType("full")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="fullRefund"
                          >
                            Full Amount
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="refundType"
                            id="partialRefund"
                            checked={refundType === "partial"}
                            onChange={() =>
                              setRefundType("partial")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="partialRefund"
                          >
                            Partial Amount
                          </label>
                        </div>

                      </div>
                    </div>

                    {/* Partial Amount */}
                    {refundType === "partial" && (
                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          Refund Amount
                        </label>

                        <input
                          type="number"
                          min="1"
                          className="form-control"
                          placeholder="Enter refund amount"
                          value={partialAmount}
                          onChange={(e) =>
                            setPartialAmount(e.target.value)
                          }
                        />
                      </div>
                    )}

                    {/* Reason */}
                    <div>
                      <label className="form-label fw-semibold">
                        How can we Improve?
                      </label>

                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Some suggestions for us..."
                        value={refundReqReason}
                        onChange={(e) =>
                          setRefundReqReason(e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="modal-footer">

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsRefundReq(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleRefundRequest}
                      disabled={
                        !refundReqReason.trim() ||
                        (refundType === "partial" &&
                          (!partialAmount ||
                            Number(partialAmount) <= 0))
                      }
                    >
                      Submit Request
                    </button>

                  </div>

                </div>
              </div>
            </div>
          </>
        )
      }

    </>
  );
};

export default OrderHistory;

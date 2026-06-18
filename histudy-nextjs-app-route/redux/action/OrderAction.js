
// =========================
// REFUND REQUEST ACTION
// =========================

import APIrequest from "@/services/axios";
import Swal from "sweetalert2";

export const refundRequestAction =
    ({ order_id, reason }) =>
        async (dispatch) => {
            try {
                dispatch({
                    type: "REFUND_REQUEST_REQ",
                });

                const res = await APIrequest({
                    method: "POST",
                    url: "/api/v1/order/refund-request",
                    bodyData: {
                        order_id,
                        reason,
                    },
                });

                if (!res?.success) {
                    Swal.fire("Fail!", res?.message);

                    return dispatch({
                        type: "REFUND_REQUEST_FAIL",
                        payload: res?.message || "Failed to submit refund request",
                    });
                }

                dispatch({
                    type: "REFUND_REQUEST_SUCCESS",
                    payload: res,
                });

                Swal.fire("Success!", res?.message);

                return res;
            } catch (error) {
                console.error("Refund Request Error:", error);

                dispatch({
                    type: "REFUND_REQUEST_FAIL",
                    payload: error?.message || "Something went wrong",
                });
            }
        };

// =========================
// RESET REFUND STATE
// =========================

export const resetRefundRequest = () => ({
    type: "REFUND_REQUEST_RESET",
});
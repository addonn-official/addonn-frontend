"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { UserOrderServices } from "@/services/User";
import { getToken, getUser } from "@/utils/storage";
import { getLocalStorageToken } from "@/utils";
// import { getLocalStorageToken, getToken, getUser } from "@/utils/auth";

const FreeCheckout = ({ course, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    try {
      const token = getLocalStorageToken() || getToken();
      const user = getUser();

      if (!token || !user) {
        window.location.href = "/login";
        return;
      }

      setLoading(true);

      const orderPayload = {
        order_status: "create_order",
        courses: [course.id],
        bundles: [],
        coupon_code: "",
        order_sub_total: 0,
        order_total: 0,
      };

      // Step 1 : Create Order
      const createRes = await UserOrderServices.placeOrder(orderPayload);

      if (createRes?.status !== "success") {
        throw new Error(createRes?.message || "Unable to create order.");
      }

      // Step 2 : Verify Free Order
      const verifyRes = await UserOrderServices.placeOrder({
        ...orderPayload,
        order_status: "verify_order_payment",
        gateway_amount: 0,
        gateway_currency: "INR",
        gateway_order_id: null,
        gateway_payment_id: null,
        gateway_signature: null,
      });

      if (verifyRes?.status !== "success") {
        throw new Error(
          verifyRes?.message || "Unable to enroll in free course.",
        );
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Course enrolled successfully.",
        confirmButtonText: "OK",
      });

      if (onSuccess) {
        await onSuccess();
      }
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="rbt-btn btn-border icon-hover w-100"
      disabled={loading}
      onClick={handleEnroll}
    >
      <span className="btn-text">
        {loading ? "Please wait..." : "Enroll Now"}
      </span>

      <span className="btn-icon">
        <i className="feather-arrow-right"></i>
      </span>
    </button>
  );
};

export default FreeCheckout;

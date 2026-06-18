const init = {
  total_items: 0,
  total_amount: 0,
  shipping_fee: 80,

  loading: false,
  error: false,
  msg: "",

  // Refund Request
  refundLoading: false,
  refundSuccess: false,
  refundError: false,
  refundMsg: "",
};

export const OrderReducer = (state = init, action) => {
  switch (action.type) {
    // =========================
    // ORDER
    // =========================

    case "ORDER_REQ":
      return {
        ...state,
        loading: true,
        error: false,
      };

    case "SET_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        msg: action.payload || "",
      };

    case "SET_ORDER_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };

    // =========================
    // REFUND REQUEST
    // =========================

    case "REFUND_REQUEST_REQ":
      return {
        ...state,
        refundLoading: true,
        refundSuccess: false,
        refundError: false,
        refundMsg: "",
      };

    case "REFUND_REQUEST_SUCCESS":
      return {
        ...state,
        refundLoading: false,
        refundSuccess: true,
        refundError: false,
        refundMsg:
          action.payload?.message ||
          "Refund request submitted successfully",
      };

    case "REFUND_REQUEST_FAIL":
      return {
        ...state,
        refundLoading: false,
        refundSuccess: false,
        refundError: true,
        refundMsg:
          action.payload ||
          "Failed to submit refund request",
      };

    case "REFUND_REQUEST_RESET":
      return {
        ...state,
        refundLoading: false,
        refundSuccess: false,
        refundError: false,
        refundMsg: "",
      };

    default:
      return state;
  }
};
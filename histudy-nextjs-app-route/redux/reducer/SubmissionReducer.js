const init = {
  loading: false,
  error: false,
  msg: "",
  submissions: [],
  meta: {},
  links: {},
};

export const SubmissionReducer = (state = init, action) => {

  switch (action.type) {
    case "SUBMISSION_REQ":
      return {
        ...state,
        loading: true,
        error: false,
      };

    case "SUBMISSION_REQ_OUT":
      return {
        ...state,
        loading: false,
      };

    case "GET_SUBMISSIONS":
      return {
        ...state,
        loading: false,
        submissions: action.payload || [],
        meta: action.payload?.meta || {},
        links: action.payload?.links || {},
      };

    case "SUBMISSION_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        msg: action.payload,
      };

    case "CLEAR_SUBMISSION_ERROR":
      return {
        ...state,
        error: false,
        msg: "",
      };

    default:
      return state;
  }
};
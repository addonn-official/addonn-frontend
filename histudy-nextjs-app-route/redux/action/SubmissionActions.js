import APIrequest from "@/services/axios";

export const getSubmissions = (courseId) => async (dispatch) => {
  try {

    dispatch({ type: "SUBMISSION_REQ" });

    const response = await APIrequest({
      method: "GET",
      url: `api/v1/submission-contents/${courseId}`,
    });

    // if (!response?.success) {
    //   dispatch({
    //     type: "SUBMISSION_ERROR",
    //     payload:
    //       response?.message ||
    //       "Failed to fetch submissions",
    //   });

    //   return;
    // }

    dispatch({
      type: "GET_SUBMISSIONS",
      payload: response.data, // ONLY data object
    });

    dispatch({ type: "SUBMISSION_REQ_OUT" });
  } catch (error) {
    dispatch({
      type: "SUBMISSION_ERROR",
      payload: error.message,
    });
  }
};
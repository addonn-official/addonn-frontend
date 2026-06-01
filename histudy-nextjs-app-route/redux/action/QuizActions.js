
// -----------------> GET COURSE QUIZZES

import APIrequest from "@/services/axios";

export const getCourseQuizzes =
  (courseId) => async (dispatch) => {
    try {
      dispatch({ type: "QUIZ_REQ" });

      const response = await APIrequest({
        method: "GET",
        url: `api/v1/quiz-attempts/${courseId}`,
      });

      if (
        response?.status === "success" &&
        response?.data
      ) {
        dispatch({
          type: "GET_COURSE_QUIZZES",
          payload: response.data,
          message: response.message,
        });
      } else {
        dispatch({
          type: "QUIZ_ERROR",
          payload:
            response?.message ||
            "Failed to fetch quizzes",
        });
      }

      dispatch({ type: "QUIZ_REQ_OUT" });
    } catch (error) {
      dispatch({
        type: "QUIZ_ERROR",
        payload: error.message,
      });
    }
  };
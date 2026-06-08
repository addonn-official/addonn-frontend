import APIrequest from "@/services/axios";

// -----------------> SEARCH COURSES

export const searchCourses = (searchText) => async (dispatch) => {
  try {
    dispatch({ type: "COURSE_SEARCH_REQ" });

    const response = await APIrequest({
      method: "GET",
      url: `api/v1/get-all-courses?search=${searchText}`,
    });

    if (response?.success) {
      dispatch({
        type: "SEARCH_COURSES_SUCCESS",
        payload: response.data,
        message: response.message,
      });
    } else {
      dispatch({
        type: "COURSE_SEARCH_ERROR",
        payload: response?.message,
      });
    }

    dispatch({ type: "COURSE_SEARCH_REQ_OUT" });
  } catch (error) {
    dispatch({
      type: "COURSE_SEARCH_ERROR",
      payload: error.message,
    });
  }
};
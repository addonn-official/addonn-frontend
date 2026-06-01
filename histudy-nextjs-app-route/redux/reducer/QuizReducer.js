const init = {
  loading: false,
  error: false,
  msg: "",
  course: null,
  quizzes: [],
};

export const QuizReducer = (state = init, action) => {
  switch (action.type) {
    case "QUIZ_REQ":
      return {
        ...state,
        loading: true,
        error: false,
      };

    case "QUIZ_REQ_OUT":
      return {
        ...state,
        loading: false,
      };

    case "GET_COURSE_QUIZZES":
      return {
        ...state,
        loading: false,
        course: action.payload,
        quizzes: action.payload || [],
        msg: action.message,
      };

    case "QUIZ_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        msg: action.payload,
      };

    case "CLEAR_QUIZ_ERROR":
      return {
        ...state,
        error: false,
        msg: "",
      };

    default:
      return state;
  }
};
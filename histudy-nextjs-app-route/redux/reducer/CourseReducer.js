const init = {
    loading: false,
    error: false,
    msg: "",
    courses: [],
};

export const CourseReducer = (
    state = init,
    action
) => {
    switch (action.type) {
        case "COURSE_SEARCH_REQ":
            return {
                ...state,
                loading: true,
                error: false,
            };

        case "COURSE_SEARCH_REQ_OUT":
            return {
                ...state,
                loading: false,
            };

        case "SEARCH_COURSES_SUCCESS":
            return {
                ...state,
                loading: false,
                courses: action.payload || [],
                msg: action.message,
            };

        case "COURSE_SEARCH_ERROR":
            return {
                ...state,
                loading: false,
                error: true,
                msg: action.payload,
            };

        case "CLEAR_COURSE_SEARCH_ERROR":
            return {
                ...state,
                error: false,
                msg: "",
            };

        default:
            return state;
    }
};
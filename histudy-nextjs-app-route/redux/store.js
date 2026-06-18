import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import ProductsReducer from "./reducer/ProductsReducer";
import { CartReducer } from "./reducer/CartReducer";
import { QuizReducer } from "./reducer/QuizReducer";
import { SubmissionReducer } from "./reducer/SubmissionReducer";
import { CourseReducer } from "./reducer/CourseReducer";
import { OrderReducer } from "./reducer/OrderReducer";


const root = combineReducers({
  //   ProductsReducer,
  CartReducer,
  QuizReducer,
  submission: SubmissionReducer,
  courseReducer: CourseReducer,
  OrderReducer,
});

const middleware = [thunk];

const Store = createStore(
  root,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default Store;

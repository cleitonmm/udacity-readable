import { combineReducers } from "redux";
import categories from "./categories";
import posts from "./posts";
import comments from "./comments";

export default combineReducers({
  categories,
  posts,
  comments
});

export * from "./posts";
export * from "./categories";
export * from "./comments";

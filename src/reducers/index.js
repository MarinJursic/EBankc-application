import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import configReducer from "./configReducer";
import priceReducer from "./priceReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  config: configReducer,
  price: priceReducer,
});

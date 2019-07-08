import { combineReducers } from "redux";
import { userReducer } from "./user";
import { storesReducer } from "./stores";
import { requestsReducer } from "./requests";
import { requestReducer } from "./request";
import { carsReducer } from "./cars";
import { carModelsReducer } from "./carmodels";
import { carBrandsReducer } from "./carbrands";
import { responseReducer } from "./response";
import { ordersReducer } from "./orders";
import { stoReducer } from "./sto";

export const rootReducer = combineReducers({
  user: userReducer,
  stores: storesReducer,
  sto: stoReducer,
  requests: requestsReducer,
  request: requestReducer,
  response: responseReducer,
  orders: ordersReducer,
  cars: carsReducer,
  carbrands: carBrandsReducer,
  carmodels: carModelsReducer
});

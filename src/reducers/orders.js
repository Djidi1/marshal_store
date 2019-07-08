import { ORDERS } from "../actions/DataActions";

const initialState = {
  orders: []
};

export function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
}

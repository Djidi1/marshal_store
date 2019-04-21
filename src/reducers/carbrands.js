import {CAR_BRANDS} from "../actions/DataActions";

const initialState = [];

export function carBrandsReducer(state = initialState, action) {
    switch (action.type) {
        case CAR_BRANDS:
            return action.payload;
        default:
            return state
    }
}
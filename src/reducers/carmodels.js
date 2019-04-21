import {CAR_MODELS} from "../actions/DataActions";

const initialState = [];

export function carModelsReducer(state = initialState, action) {
    switch (action.type) {
        case CAR_MODELS:
            return action.payload;
        default:
            return state
    }
}
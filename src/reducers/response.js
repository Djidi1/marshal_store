import {RESPONSE} from "../actions/DataActions";

const initialState = [];

export function responseReducer(state = initialState, action) {
    switch (action.type) {
        case RESPONSE:
            return action.payload;
        default:
            return state
    }
}
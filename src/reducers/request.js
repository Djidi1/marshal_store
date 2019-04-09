import {REQUEST} from "../actions/DataActions";

const initialState = [];

export function requestReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST:
            return action.payload;
        default:
            return state
    }
}
import {REQUESTS, ADD_REQUESTS} from "../actions/DataActions";

const initialState = [];

export function requestsReducer(state = initialState, action) {
    switch (action.type) {
        case REQUESTS:
            return action.payload;
        case ADD_REQUESTS:
            let newState = [...state];
            newState.push(action.payload);
            return newState;
        default:
            return state
    }
}
import {ADD_CAR, CARS} from "../actions/DataActions";

const initialState = [];

export function carsReducer(state = initialState, action) {
    switch (action.type) {
        case CARS:
            return action.payload;
        case ADD_CAR:
            let newState = [...state];
            newState.push(action.payload);
            return newState;
        default:
            return state
    }
}
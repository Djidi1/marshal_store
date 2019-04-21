import {ADD_CAR, CARS, UPDATE_CAR, DELETE_CAR} from "../actions/DataActions";

const initialState = [];
let newState = [];
let carIndex = 0;

export function carsReducer(state = initialState, action) {
    switch (action.type) {
        case CARS:
            return action.payload;
        case ADD_CAR:
            newState = [...state];
            newState.push(action.payload);
            return newState;
        case UPDATE_CAR:
            const edited_car = action.payload;
            newState = [...state];
            carIndex = newState.findIndex((car => car.id === edited_car.id));
            newState[carIndex] = edited_car;
            return newState;
        case DELETE_CAR:
            const car_id = action.payload;
            console.log('delete', car_id);
            newState = [...state];
            carIndex = newState.findIndex((car => car.id === car_id));
            newState.splice(carIndex, 1);
            return newState;
        default:
            return state
    }
}
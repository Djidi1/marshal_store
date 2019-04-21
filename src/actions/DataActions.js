export const SHOPS_REQUEST = 'SHOPS_REQUEST';
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const REQUESTS = 'REQUESTS';
export const REQUEST = 'REQUEST';
export const ADD_REQUESTS = 'ADD_REQUESTS';
export const RESPONSE = 'RESPONSE';
export const CARS = 'CARS';
export const ADD_CAR = 'ADD_CAR';
export const CAR_BRANDS = 'CAR_BRANDS';
export const CAR_MODELS = 'CAR_MODELS';

export function handleShops(callback) {
    return function(dispatch) {
        dispatch({
            type: SHOPS_REQUEST,
            payload: callback,
        })
    }
}
export function handleCategories(payload) {
    return function(dispatch) {
        dispatch({
            type: CATEGORIES_REQUEST,
            payload: payload,
        })
    }
}
export function handleRequests(payload) {
    return function(dispatch) {
        dispatch({
            type: REQUESTS,
            payload: payload,
        })
    }
}
export function handleRequest(payload) {
    return function(dispatch) {
        dispatch({
            type: REQUEST,
            payload: payload,
        })
    }
}
export function handleResponse(payload) {
    return function(dispatch) {
        dispatch({
            type: RESPONSE,
            payload: payload,
        })
    }
}
export function handleAddRequests(payload) {
    return function(dispatch) {
        dispatch({
            type: ADD_REQUESTS,
            payload: payload,
        })
    }
}
export function handleAddCar(payload) {
    return function(dispatch) {
        dispatch({
            type: ADD_CAR,
            payload: payload,
        })
    }
}
export function handleCars(payload) {
    return function(dispatch) {
        dispatch({
            type: CARS,
            payload: payload,
        })
    }
}
export function handleCarBrands(payload) {
    return function(dispatch) {
        dispatch({
            type: CAR_BRANDS,
            payload: payload,
        })
    }
}
export function handleCarModels(payload) {
    return function(dispatch) {
        dispatch({
            type: CAR_MODELS,
            payload: payload,
        })
    }
}
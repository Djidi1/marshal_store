export const SHOPS_REQUEST = 'SHOPS_REQUEST';
export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const REQUESTS = 'REQUESTS';
export const REQUEST = 'REQUEST';
export const ADD_REQUESTS = 'ADD_REQUESTS';
export const ANSWERS = 'ANSWERS';

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
export function handleAddRequests(payload) {
    return function(dispatch) {
        dispatch({
            type: ADD_REQUESTS,
            payload: payload,
        })
    }
}
export function handleAnswers(payload) {
    return function(dispatch) {
        dispatch({
            type: ANSWERS,
            payload: payload,
        })
    }
}
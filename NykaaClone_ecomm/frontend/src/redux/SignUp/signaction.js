import {
    GET_SIGNUP_FAILURE, GET_SIGNUP_SUCCESS,GET_SIGNUP_REQUEST
} from "./signActionType"

export const getSignupRequest = () => {
    return {
        type: GET_SIGNUP_REQUEST
    }
}

export const getSignupSuccess = (payload) => {
    console.log(payload)
    return {
        type: GET_SIGNUP_SUCCESS,
        payload
    }
}

export const getSignupFailure = () => {
    return {
        type: GET_SIGNUP_FAILURE
    }
}
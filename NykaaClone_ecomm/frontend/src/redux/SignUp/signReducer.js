import {
    GET_SIGNUP_FAILURE, GET_SIGNUP_REQUEST, GET_SIGNUP_SUCCESS
} from "./signActionType"

const initState = {
    singUp: [],
    isLoading: false,
    isError: false,
    isAuthenticated: false
}

export const signUpReducer = (state= {singUp:{}}, action) => {
    // const {type,payload} = action
    switch (action.type) {
        case GET_SIGNUP_REQUEST: {
            return {
                isLoading: true,
                isAuthenticated:false
            }
        }
        case GET_SIGNUP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                singUp: action.payload
            }
        }
        case GET_SIGNUP_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isAuthenticated:false,
                singUp:null,
                isError:true
            }
        }
        default:
            return state
    }
}
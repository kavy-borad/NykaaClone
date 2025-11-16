import { GET_LOGIN_FAILURE, GET_LOGIN_SUCCESS, GET_LOGIN_REQUEST, GET_USER_DATA, LOGOUT_USER, GET_ORDER_DATA } from "./loginActionType";

export const LoginReducer = (state= { login: {}, order:[]}, action) => {
    switch (action.type) {
        case GET_LOGIN_REQUEST: {
            return {
                isLoading: true,
                isAuthenticated:false
            }
        }
        case GET_LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                login: action.payload
            }
        }
        case GET_LOGIN_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isAuthenticated:false,
                login:null,
                isError:true
            }
        }
        case GET_USER_DATA:{
            return {
                ...state,
                isLoading: false,
                isAuthenticated:true,
                login:action.payload
            }
        }
        case GET_ORDER_DATA:{
            return {
                ...state,
                isLoading: false,
                isAuthenticated:true,
                order:action.payload
            }
        }
        case LOGOUT_USER:{
            return {
                ...state,
                isLoading: false,
                isAuthenticated:false,
                login:null
            }
        }
        default:
            return state
    }
}
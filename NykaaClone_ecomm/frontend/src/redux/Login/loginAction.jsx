import { GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, GET_LOGIN_FAILURE, GET_USER_DATA, LOGOUT_USER, GET_ORDER_DATA } from "./loginActionType";
import axios from 'axios'

export const getLoginRequest = () =>{
    return {
        type: GET_LOGIN_REQUEST
    }
}

export const getLoginSuccess = (payload) =>{
    return {
        type: GET_LOGIN_SUCCESS,
        payload
    }
}

export const getLoginFailure = () =>{
    return {
        type: GET_LOGIN_FAILURE
    }
}


export const getUserData = (token) => async(dispatch) =>{


    const {data} = await axios.get(`/validuser`,{
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
        }
    })
    console.log(data)
    dispatch({
        type: GET_USER_DATA,
        payload: data.ValidUserOne
    })

}

export const getOrderData = (token,id) => async(dispatch) =>{

    const {data} = await axios.get(`/order/${id}`,{
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
        },
    })
    console.log(data)
    dispatch({
        type: GET_ORDER_DATA,
        payload: data
    })

}

export const getLogoutUser = () =>{
    return {
        type: LOGOUT_USER
    }
}
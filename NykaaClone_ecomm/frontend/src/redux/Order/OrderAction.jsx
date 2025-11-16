import axios from 'axios'
import { Get_Order_Failure, Get_Order_Request, Get_Order_Success } from './OrderActionType'

export const getOrderRequest = () =>{
    return {
        type: Get_Order_Request
    }
}

export const getOrderSuccess = (payload) =>{
    return {
        type: Get_Order_Success,
        payload
    }
}

export const getOrderFailure = () =>{
    return {
        type: Get_Order_Failure
    }
}
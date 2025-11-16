import axios from "axios"
import { Add_Product_Failure, Add_Product_Request, Add_Product_Success, Edit_Product_Success, Get_User_Success } from "./AdminActionType"

export const addProductRequest = () =>{
    return {
        type: Add_Product_Request
    }
}

export const addProductSuccess = (payload) =>{
    return {
        type: Add_Product_Success,
        payload
    }
}

export const addProductFailure = () =>{
    return {
        type: Add_Product_Failure
    }
}

export const editProductSuccess = (payload) =>{
    return {
        type: Edit_Product_Success,
        payload
    }
}


export const getUserSuccess = (payload)  =>{

    return {
        type: Get_User_Success,
        payload
    }
}
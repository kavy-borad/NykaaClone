import { Add_Product_Failure, Add_Product_Request, Add_Product_Success, Edit_Product_Success, Get_User_Success } from "./AdminActionType"


export const adminProductReducer = (state={adminProduct:{}, allUser:[]}, action) => {

    switch (action.type) {
        case Add_Product_Request: {
            return {
                isLoading: true,
                isError: false
            }
        }
        case Add_Product_Success: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                adminProduct: action.payload
            }
        }
        case Get_User_Success: {
            // console.log(action.payload)
            return {
                ...state,
                isLoading: false,
                isError: false,
                allUser: action.payload
            }
        }
        case Edit_Product_Success: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                isEdit:true,
                adminProduct: action.payload
            }
        }
        case Add_Product_Failure: {
            return {
                ...state,
                isLoading: true,
                isError: true,
                adminProduct:null,
            }
        }
        default:
            return state
    }
}
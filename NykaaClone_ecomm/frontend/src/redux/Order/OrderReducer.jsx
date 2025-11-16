import { Get_Order_Failure, Get_Order_Request, Get_Order_Success } from "./OrderActionType";


export const orderReducer = (state={order:{}}, action) => {
    switch (action.type) {
        case Get_Order_Request: {
            return {
                isLoading: true,
                isError: false
            }
        }
        case Get_Order_Success: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess:true,
                order: action.payload
            }
        }
        case Get_Order_Failure: {
            return {
                ...state,
                isLoading: true,
                isError: true,
                order:null,
            }
        }
        default:
            return state
    }
}
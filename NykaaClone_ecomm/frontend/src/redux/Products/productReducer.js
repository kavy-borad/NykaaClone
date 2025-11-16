import { GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE } from "./productType"

const initState = {
    products : [],
    isLoading: false,
    isError: false
}

export const productReducer = (state=initState, action) => {
    const {type,payload} = action 
    switch (type) {
        case GET_PRODUCT_REQUEST:{
            return {
                ...state,
                isLoading: true
            }
        }
        case GET_PRODUCT_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                products: payload,
            }
        }
        case GET_PRODUCT_FAILURE:{
            return {
                ...state,
                isLoading: false,
                products:[],
                isError:true
            }
        }
        default:
            return state
    }
}
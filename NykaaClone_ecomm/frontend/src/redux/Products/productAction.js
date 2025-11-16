import { GET_PRODUCT_FAILURE,
    GET_PRODUCT_SUCCESS, GET_PRODUCT_REQUEST
} from "./productType";

export const getProductsRequest = () => {
    return {
        type: GET_PRODUCT_REQUEST
    }
}

export const getProductsSuccess = (payload) => {
    return {
        type: GET_PRODUCT_SUCCESS,
        payload
    }
}

export const getProductsFailure = () => {
    return {
        type: GET_PRODUCT_FAILURE
    }
}
import {GET_SINGLEPRODUCT_SUCCESS, GET_SINGLEPRODUCT_FAILURE, GET_SINGLEPRODUCT_REQUEST} from './singleProductType'

export const singleProductRequest = () => {
    return {
        type: GET_SINGLEPRODUCT_REQUEST
    }
}


export const singleProductSuccess = (payload) => {
    return {
        type: GET_SINGLEPRODUCT_SUCCESS,
        payload
    }
}


export const singleProductFailure = () => {
    return {
        type: GET_SINGLEPRODUCT_FAILURE
    }
}


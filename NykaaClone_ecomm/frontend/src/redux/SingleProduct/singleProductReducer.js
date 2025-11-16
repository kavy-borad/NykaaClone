import {
  GET_SINGLEPRODUCT_FAILURE,
  GET_SINGLEPRODUCT_REQUEST,
  GET_SINGLEPRODUCT_SUCCESS,
} from "./singleProductType";

const initState = {
  singleProducts: [],
  isLoading: false,
  isError: false,
};

export const singleProductReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SINGLEPRODUCT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_SINGLEPRODUCT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        singleProductReducer: [],
        isError: true,
      };
    }
    case GET_SINGLEPRODUCT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        singleProducts: payload
      };
    }
    default:
      return state;
  }
};

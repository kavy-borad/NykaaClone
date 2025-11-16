import {ADD_TO_CART, REMOVE_FROM_CART, SHIPPING_INFO} from './CartActonType'

export const cartReducer = (state= {cartItems:[], shippingInfo:{}},action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isCart = state.cartItems.find((e)=>e._id === item._id)
            if(isCart){
                return {
                    ...state,
                    cartItems: state.cartItems.map((e)=> e._id === isCart._id ? item : e
                    )
                }
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
        }
        case REMOVE_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter((i) => i._id !== action.payload) 
            }
        case SHIPPING_INFO: 
        return{
            ...state,
            shippingInfo: action.payload
        }
        default:
            return state;
    }
}
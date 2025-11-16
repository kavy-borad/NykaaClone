import {legacy_createStore , applyMiddleware , combineReducers} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from '@redux-devtools/extension';
import { productReducer } from "./redux/Products/productReducer";
import { singleProductReducer } from "./redux/SingleProduct/singleProductReducer";
import { signUpReducer } from "./redux/SignUp/signReducer";
import { LoginReducer } from "./redux/Login/loginReducer";
import { cartReducer } from "./redux/Cart/CartReducer";
import { orderReducer } from "./redux/Order/OrderReducer";
import {adminProductReducer} from './Admin/Redux/AdminReducer'

const rootReducer = combineReducers({
    products: productReducer,
    singleProduct: singleProductReducer,
    signUp: signUpReducer,
    login: LoginReducer,
    cart: cartReducer,
    order: orderReducer,
    admin: adminProductReducer
})


const initState = {
    cart:{
        cartItems: localStorage.getItem('cart') ? 
        JSON.parse(localStorage.getItem('cart')) : [],
        shippingInfo:
            localStorage.getItem('shipping') ? 
            JSON.parse(localStorage.getItem('shipping')) : {}
    }
}

const store = legacy_createStore(
    rootReducer,
    initState,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store
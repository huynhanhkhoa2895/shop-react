
import {setCookie,getCookie} from '../Widget/Cookie/Cookie.js'
import * as types from './constants/ActionType';
const defaultState = getCookie('cart') === null ? {} :  getCookie('cart')
const carts = (state = defaultState, action) => {
	switch(action.type){
        case types.BUY_PRODUCT:
            let product = action.product.product;
            let qty = action.product.qty;
            if(state[product.id] == null){
                state[product.id] = {};
                state[product.id]['product'] = product;
                state[product.id]['qty'] = qty;
            }else{
                state[product.id]['qty'] += qty;
            }
            setCookie('cart',state)
            return state;
        break;
        case types.GET_CART:
            console.log(state);
            return state;
        default:
			return state;
	}
}
export default carts;
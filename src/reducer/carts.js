
import {getCookie} from '../Widget/Cookie/Cookie.js'
import * as types from './constants/ActionType';
const defaultState = getCookie('cart') === null ? {} :  getCookie('cart')
const carts = (state = defaultState, action) => {
	switch(action.type){
        case types.BUY_PRODUCT:
            console.log("BUY_PRODUCT");
        break;
        default:
            console.log("Cart",state);
			return state;
	}
}
export default carts;
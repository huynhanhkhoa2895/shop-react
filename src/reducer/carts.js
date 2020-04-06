
import {setCookie,getCookie,removeCookie} from '../Widget/Cookie/Cookie.js'
import {remove} from 'lodash'
const defaultState = getCookie('cart') === null ? [] :  getCookie('cart')
const carts = (state = defaultState, action) => {
	switch(action.type){
        case 'ADD_TO_CART':
            let product = action.product.product;
            let qty = action.product.qty;
            let option = action.product.option;
            let img = action.product.img == null || action.product.img.length == 0 ? ["no-image.png"] : action.product.img;            
            if(state.length == 0){
                state.push({id: product.id,product : product,qty : qty,img : img,option : option})
            }else{
                let checkHaveProduct = false;
                let arr = state;
                arr.forEach(function(element){
                    if(element.product.id == product.id){
                        checkHaveProduct=true;
                        element.qty += qty;
                        return;
                    }                    
                });
                if(!checkHaveProduct){
                    arr.push({id: product.id,product : product,qty : qty,img : img,option : option})
                }
                state = arr;
            }            
            setCookie('cart',state)
            return [...state]
            break;
        case "REMOVE_ITEM_IN_CART":
            remove(state,(item)=>{
                return item.id == action.id
            })
            if(state == null || state.length == 0) removeCookie("cart")
            else setCookie('cart',state);
            return [...state];
        case "UPDATE_ITEM_IN_CART":
            let arr = [...state];
            arr.forEach((e,k)=>{                
                if(e.id == action.id){
                    arr[k].qty = action.qty;
                    return;
                }
            })
            state = arr;
            setCookie('cart',state)
            return [...state];
        case "CLEAR_CART":
            state = [...[]];
            removeCookie("cart")
            return [...state];
        default:
			return [...state];
	}
}
export default carts;

import {setCookie,getCookie} from '../Widget/Cookie/Cookie.js'
import * as types from './constants/ActionType';
const defaultState = getCookie('cart') === null ? [] :  getCookie('cart')
const carts = (state = defaultState, action) => {
	switch(action.type){
        case 'ADD_TO_CART':
            let product = action.product.product;
            let qty = action.product.qty;
            let img = action.product.img == null || action.product.img.length == 0 ? ["no-image.png"] : action.product.img;            
            if(state.length == 0){
                state.push({id: product.id,product : product,qty : qty,img : img})
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
                    arr.push({id: product.id,product : product,qty : qty,img : img})
                }
                state = arr;
            }            
            setCookie('cart',state)
            return [...state]
            break;
        case "REMOVE_ITEM_IN_CART":
            // let arr = [];
            // arr.slice(0);
            // arr = state;
            // arr.forEach(function(element,key){                
            //     if(element.id == action.id){
            //         arr.splice(key, 1);
            //     }                    
            // });
            // state = arr;
            // setCookie('cart',state);
            // return [...state];
            return [...[{"id":6,"product":{"id":6,"name":"WPFQg","sku":"WPFQg_5","route":"WPFQg_5.html","category_id":2,"brand_id":1,"brand_name":"Nike","brand_route":"nike.html","category_route":"tshirt.html","category_name":"T-Shirt","price":"177625"},"qty":1,"img":["h6_1.png","h6_2.png","h6_3.png"]}]];
        default:
			return [...state];
	}
}
export default carts;
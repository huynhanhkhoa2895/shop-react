import * as types from './constants/ActionType';
// actions.js
export const openSidebar = () => ({
    type: 'OPEN_SIDEBAR',
  })
  
export const addToCart = id => ({
    type: 'ADD_TO_CART',
    payload: id,
})
export const actUpdateProduct = (product, quantity) => {
	return {
		type : types.UPDATE_PRODUCT,
		product, 
		quantity
	}
}

export const actRemoveProduct = (product) => {
	return {
		type : types.REMOVE_PRODUCT,
		product, 
	}
}

export const actChangeNotify = (content) => {
	return {
		type : types.CHANGE_NOTIFY,
		content
	}
}

export const actAddToCart = (product) => {
	return {
		type : 'ADD_TO_CART',
		product
	}
}
export const updateQtyInCart = (cart) => {
	return {
		type : 'UPDATE_QTY_IN_CART',
		cart
	}
}


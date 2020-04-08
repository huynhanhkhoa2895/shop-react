import {setCookie,getCookie,removeCookie} from '../Widget/Cookie/Cookie.js'
const defaultState = {isLogin : (getCookie("customer") != null && getCookie("token") != null) ? true : false};
const verify = (state = defaultState, action) => {
	switch(action.type){
        case "LOGIN":   
            state.isLogin = true;
            return {...state}
        case "LOGOUT":   
            removeCookie("customer");
            removeCookie("token");
            state.isLogin = false;
            return {...state}            
        default:
			return state;
	}
}
export default verify;
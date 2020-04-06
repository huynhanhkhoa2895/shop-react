const setCookie = function(name,value){
    localStorage.setItem(name,JSON.stringify(value))
} 
const getCookie = function(name){
    if(localStorage.getItem(name) == null){
        return null;
    }else
    return JSON.parse(localStorage.getItem(name))
}
const clearCookie = function(){
    return localStorage.clear();
}
const removeCookie = function (name){
    return localStorage.removeItem(name);
}
export {setCookie,getCookie,clearCookie,removeCookie};
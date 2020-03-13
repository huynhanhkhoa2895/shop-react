const setCookie = function(name,value){
    localStorage.setItem(name,JSON.stringify(value))
} 
const getCookie = function(name){
    return JSON.parse(localStorage.getItem(name))
}
const clearCookie = function(){
    return localStorage.clear();
}
export {setCookie,getCookie,clearCookie};
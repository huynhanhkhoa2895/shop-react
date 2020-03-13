const configs = {
    NOTI_READY_TO_BUY : "Ready to buy product",
    NOTI_GREATER_THAN_ONE  : "Quantity must equal or greater than 1",
    NOTI_ACT_ADD :"Added successfull !!",
}
let defaultState = configs.NOTI_READY_TO_BUY;
const notify2 = (state = defaultState, action) => {
	switch(action.type){
        default:
			return state;
	}
}
export default notify2;
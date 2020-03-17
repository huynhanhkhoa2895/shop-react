const defaultState = {openPopup : false};
const minicart = (state = defaultState, action) => {
	switch(action.type){
        case "OPEN_POPUP":   
            // this.getCart()
            state.openPopup = true;
            return {...state}
        default:
			return state;
	}
}
export default minicart;
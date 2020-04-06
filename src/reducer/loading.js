const defaultState = {openLoading : false};
const loading = (state = defaultState, action) => {
	switch(action.type){
        case "OPEN_LOADING":   
            // this.getCart()
            state.openLoading = true;
            return {...state}
        case "CLOSE_LOADING":   
            // this.getCart()
            state.openLoading = false;
            return {...state}
        default:
			return state;
	}
}
export default loading;
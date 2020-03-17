import { combineReducers } from 'redux';

import minicart from './minicart';
import carts from './carts';
const appReducers = combineReducers({
	minicart,carts,	
});

export default appReducers;
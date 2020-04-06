import { combineReducers } from 'redux';

import minicart from './minicart';
import carts from './carts';
import loading from './loading';
import verify from './verify';
const appReducers = combineReducers({
	minicart,carts,	loading,verify
});

export default appReducers;
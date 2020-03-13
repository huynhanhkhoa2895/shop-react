import { combineReducers } from 'redux';

import notify2 from './notify2';
import carts from './carts';
const appReducers = combineReducers({
	notify2,carts,	
});

export default appReducers;
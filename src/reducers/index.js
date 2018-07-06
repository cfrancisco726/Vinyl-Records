'use strict';

import { combineReducers } from 'redux';

import { recordsReducers } from './recordsReducers';
import { cartReducers } from './cartReducers';

export default combineReducers({
	records: recordsReducers,
	cart: cartReducers
});

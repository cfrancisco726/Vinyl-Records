'use strict';

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import {
	postRecords,
	deleteRecords,
	updateRecords
} from './actions/recordsActions';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

store.subscribe(function() {
	console.log('current state is: ', store.getState());
});

store.dispatch(
	postRecords([
		{
			id: 1,
			title: 'title',
			descirption: 'description',
			price: 11
		},
		{
			id: 2,
			title: 'title',
			descirption: 'description',
			price: 22
		}
	])
);

store.dispatch(deleteRecords({ id: 1 }));

store.dispatch(
	updateRecords({
		id: 2,
		title: 'new title'
	})
);

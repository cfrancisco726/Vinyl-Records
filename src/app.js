'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

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

import RecordsList from './components/pages/recordsList';

render(
	<Provider store={store}>
		<RecordsList />
	</Provider>,
	document.getElementById('app')
);

'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';

import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

import RecordsList from './components/pages/recordsList';
import Cart from './components/pages/cart';
import RecordsForm from './components/pages/recordsForm';
import Main from './main';

const Routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={RecordsList} />
				<Route path="/admin" component={RecordsForm} />
				<Route path="/cart" component={Cart} />
			</Route>
		</Router>
	</Provider>
);

render(Routes, document.getElementById('app'));

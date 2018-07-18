'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import {
	records,
	deleteRecords,
	updateRecords
} from './actions/recordsActions';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// step 1 create the store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

import RecordsList from './components/pages/recordsList';
import Cart from './components/pages/cart';
import RecordsForm from './components/pages/recordsForm';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Main from './main';

const Routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={RecordsList} />
				<Route path="/admin" component={RecordsForm} />
				<Route path="/cart" component={Cart} />
				<Route path="/about" component={About} />
				<Route path="/contact" component={Contact} />
			</Route>
		</Router>
	</Provider>
);

render(Routes, document.getElementById('app'));

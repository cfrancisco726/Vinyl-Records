'use strict';
import axios from 'axios';

export function getCart(cart) {
	return function(dispatch) {
		axios
			.get('/api/cart')
			.then(function(response) {
				dispatch({ type: 'GET_CART', payload: response.data });
			})
			.catch(function(err) {
				dispatch({
					type: 'GET_CART_REJECTED',
					msg: 'error when getting the cart from session'
				});
			});
	};
}

export function addToCart(cart) {
	return function(dispatch) {
		axios
			.post('/api/cart', cart)
			.then(function(response) {
				dispatch({ type: 'ADD_TO_CART', payload: response.data });
			})
			.catch(function(err) {
				dispatch({
					type: 'ADD_TO_CART_REJECTED',
					msg: 'error when adding to the cart'
				});
			});
	};
}

export function updateCart(_id, unit, cart) {
	const currentRecordToUpdate = cart;
	const indexToUpdate = currentRecordToUpdate.findIndex(record => {
		return record._id === _id;
	});
	const newRecordToUpdate = {
		...currentRecordToUpdate[indexToUpdate],
		quantity: currentRecordToUpdate[indexToUpdate].quantity + unit
	};
	let cartUpdate = [
		...currentRecordToUpdate.slice(0, indexToUpdate),
		newRecordToUpdate,
		...currentRecordToUpdate.slice(indexToUpdate + 1)
	];
	return function(dispatch) {
		axios
			.post('/api/cart', cartUpdate)
			.then(function(response) {
				dispatch({ type: 'UPDATE_CART', payload: response.data });
			})
			.catch(function(err) {
				dispatch({
					type: 'UPDATE_CART_REJECTED',
					msg: 'error when adding to the cart'
				});
			});
	};
}

export function deleteCartItem(cart) {
	return function(dispatch) {
		axios
			.post('/api/cart', cart)
			.then(function(response) {
				dispatch({ type: 'DELETE_CART_ITEM', payload: response.data });
			})
			.catch(function(err) {
				dispatch({
					type: 'DELETE_CART_ITEM_REJECTED',
					msg: 'error when deleting from the cart'
				});
			});
	};
}

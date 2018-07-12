'use strict';

export function addToCart(record) {
	return {
		type: 'ADD_TO_CART',
		payload: record
	};
}

export function updateCart(_id, unit) {
	return {
		type: 'UPDATE_CART',
		_id: _id,
		unit: unit
	};
}

export function deleteCartItem(record) {
	return {
		type: 'DELETE_CART_ITEM',
		payload: record
	};
}

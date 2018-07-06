'use strict';

export function addToCart(record) {
	return {
		type: 'ADD_TO_CART',
		payload: record
	};
}

'use strict';

export function postRecords(record) {
	return {
		type: 'POST_RECORD',
		payload: record
	};
}

export function deleteRecords(id) {
	return {
		type: 'DELETE_RECORD',
		payload: id
	};
}

export function updateRecords(record) {
	return {
		type: 'UPDATE_RECORD',
		payload: record
	};
}

'use strict';

export function getRecords(record) {
	return {
		type: 'GET_RECORDS'
	};
}

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

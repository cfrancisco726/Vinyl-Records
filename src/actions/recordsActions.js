'use strict';
import axios from 'axios';

export function getRecords() {
	return function(dispatch) {
		axios
			.get('/api/records')
			.then(function(response) {
				dispatch({ type: 'GET_RECORDS', payload: response.data });
			})
			.catch(function(err) {
				dispatch({ type: 'GET_RECORDS_REJECTED', payload: err });
			});
	};
}

export function postRecords(record) {
	return function(dispatch) {
		axios
			.post('/api/records', record)
			.then(function(response) {
				dispatch({ type: 'POST_RECORD', payload: response.data });
			})
			.catch(function(err) {
				dispatch({
					type: 'POST_RECORD_REJECTED',
					payload: 'there was an error while posting a new record'
				});
			});
	};
}

export function deleteRecords(id) {
	return function(dispatch) {
		axios
			.delete('/api/records/' + id)
			.then(function(response) {
				dispatch({ type: 'DELETE_RECORD', payload: id });
			})
			.catch(function(err) {
				dispatch({ type: 'DELETE_RECORD_REJECTED', payload: err });
			});
	};
}

export function updateRecords(record) {
	return {
		type: 'UPDATE_RECORD',
		payload: record
	};
}

export function resetButton(record) {
	return {
		type: 'RESET_BUTTON'
	};
}

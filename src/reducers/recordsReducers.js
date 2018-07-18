'use strict';

export function recordsReducers(
	state = {
		records: []
	},
	action
) {
	switch (action.type) {
		case 'GET_RECORDS':
			return { ...state, records: [...action.payload] };
			break;
		case 'POST_RECORD':
			return {
				...state,
				records: [...state.records, ...action.payload],
				msg: 'Saved! Click to continue',
				style: 'success',
				validation: 'success'
			};
			break;
		case 'POST_RECORD_REJECTED':
			return {
				...state,
				msg: 'Please try again',
				style: 'danger',
				validation: 'error'
			};
			break;
		case 'RESET_BUTTON':
			return { ...state, msg: null, style: 'primary', validation: null };
			break;
		case 'DELETE_RECORD':
			const currentRecordToDelete = [...state.records];

			const indexToDelete = currentRecordToDelete.findIndex(record => {
				return record._id == action.payload;
			});

			return {
				records: [
					...currentRecordToDelete.slice(0, indexToDelete),
					...currentRecordToDelete.slice(indexToDelete + 1)
				]
			};
			break;

		case 'UPDATE_RECORD':
			const currentRecordToUpdate = [...state.records];
			const indexToUpdate = currentRecordToUpdate.findIndex(record => {
				return record._id == action.payload._id;
			});

			const newRecordToUpdate = {
				...currentRecordToUpdate[indexToUpdate],
				title: action.payload.title
			};

			console.log('what is it newRecordToUpdate', newRecordToUpdate);

			return {
				records: [
					...currentRecordToUpdate.slice(0, indexToUpdate),
					newRecordToUpdate,
					...currentRecordToUpdate.slice(indexToUpdate + 1)
				]
			};
			break;
	}

	return state;
}

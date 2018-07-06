'use strict';

export function recordsReducers(state = { records: [] }, action) {
	switch (action.type) {
		case 'POST_RECORD':
			return { records: [...state.records, ...action.payload] };
			break;
		case 'DELETE_RECORD':
			const currentRecordToDelete = [...state.records];
			const indexToDelete = currentRecordToDelete.findIndex(record => {
				return record.id === action.payload.id;
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
				return record.id === action.payload.id;
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

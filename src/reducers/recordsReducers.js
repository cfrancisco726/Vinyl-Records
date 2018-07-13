'use strict';

export function recordsReducers(
	state = {
		records: [
			{
				_id: 1,
				title: 'title 1',
				description: 'description',
				price: 11
			},
			{
				_id: 2,
				title: 'title',
				description: 'description',
				price: 22
			},
			{
				_id: 3,
				title: 'title',
				description: 'description',
				price: 33
			}
		]
	},
	action
) {
	switch (action.type) {
		case 'GET_RECORD':
			return { ...state, records: [...state.records] };
			break;
		case 'POST_RECORD':
			return { records: [...state.records, ...action.payload] };
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
				return record._id === action.payload._id;
			});
			const newRecordToUpdate = {
				...currentRecordToUpdate[indexToUpdate],
				title: action.payload.title
			};

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

import { FETCH_TICKETS_REQUEST, FETCH_TICKETS_SUCCESS, FETCH_TICKETS_FAILURE,  SET_GROUP_BY, SORT_TASKS } from '../actions/kanbanActions';

const initialState = {
    tasks: [],
    groupBy: 'status', // Default grouping by status
    loading: false,
    error: null,
    sortOrder: { field: null, direction: 'asc' },
};

export const kanbanReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TICKETS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_TICKETS_SUCCESS:
            let ticket_data = action.payload.tickets
            let user_data = action.payload.users
            const priority_data = [
                {id: 4, ptitle: 'Urgent'}, 
                {id: 3, ptitle: 'High'}, 
                {id: 2, ptitle: 'Medium'},
                {id: 1, ptitle: 'Low'}, 
                {id: 0, ptitle: 'No priority'},
            ]
            let mergedArray = [...ticket_data];

            user_data.forEach(updatedItem => {
                const index = mergedArray.findIndex(item => item.userId === updatedItem.id);

                if (index !== -1) {
                    mergedArray[index] = { ...mergedArray[index], ...{name: updatedItem.name} };
                }
            });

            priority_data.forEach(updatedItem => {
                const index = mergedArray.findIndex(item => item.priority === updatedItem.id);

                if (index !== -1) {
                    mergedArray[index] = { ...mergedArray[index], ...{ptitle: updatedItem.ptitle} };
                }
            });

            return { 
                ...state, 
                loading: false, 
                tasks: mergedArray 
            };
        case FETCH_TICKETS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SORT_TASKS:
            const { field, direction } = action.payload;

            const sortedTasks = [...state.tasks].sort((a, b) => {
                if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
                if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
                return 0;
            });

            console.log('sortedTasks ', sortedTasks)

            return {
                ...state,
                tasks: sortedTasks,
                sortOrder: { field, direction },
            };
        case SET_GROUP_BY:
            return { ...state, groupBy: action.payload };
        default:
            return state;
    }
};

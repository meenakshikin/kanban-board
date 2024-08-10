import axios from 'axios';

export const FETCH_TICKETS_REQUEST = 'FETCH_TICKETS_REQUEST';
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';
export const SET_GROUP_BY = 'SET_GROUP_BY';
export const SORT_TASKS = 'SORT_TASKS';

export const setGroupBy = (groupBy) => {
    return { type: SET_GROUP_BY, payload: groupBy };
};

export const sortTasks = (field, direction) => ({
    type: SORT_TASKS,
    payload: { field, direction },
});

export const fetchDataRequest = () => ({
    type: FETCH_TICKETS_REQUEST,
});

export const fetchTickets = () => async (dispatch) => {
    try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        dispatch({ type: FETCH_TICKETS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_TICKETS_FAILURE, payload: error });
    }
};

export const fetchDataFailure = (error) => ({
    type: FETCH_TICKETS_FAILURE,
    payload: error,
});

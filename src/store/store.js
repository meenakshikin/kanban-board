import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'
import { kanbanReducer } from '../reducers/kanbanReducer';

const rootReducer = combineReducers({
    kanban: kanbanReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
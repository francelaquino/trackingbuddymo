import { combineReducers } from 'redux';
import  fetchReducer from './fetchReducer';
import groupReducer from './groupReducer';
import memberReducer from './memberReducer';
import userReducer from './userReducer';

export default combineReducers({
    fetchItem: fetchReducer,
    fetchGroup: groupReducer,
    fetchMember: memberReducer,
    fetchUser: userReducer
});
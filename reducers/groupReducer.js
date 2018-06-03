import {  CREATE_GROUP, DISPLAY_GROUP, DELETE_GROUP, UPDATE_GROUP } from '../actions/types';

const initialState = {
    items:[],
}


export default function(state=initialState,action){
    switch(action.type){
        case CREATE_GROUP:
            return {
                ...state,
                items: action.payload
            };
        case DISPLAY_GROUP:
            return{
                ...state,
                items:action.payload
            };
        case DELETE_GROUP:
            return{
                ...state,
                items:action.payload
            };
        case UPDATE_GROUP:
            return{
                ...state,
                items:action.payload
            };
        default:
            return state;
    }

}
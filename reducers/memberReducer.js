import {  DISPLAY_MEMBER,INVITE_MEMBER, GET_MEMBER, DELETE_MEMBER } from '../actions/types';

const initialState = {
    items:[],
    item:[],
    isready:false
}


export default function(state=initialState,action){
    switch(action.type){
        case DISPLAY_MEMBER:
            return {
                ...state,
                items: action.payload
                
            };
        case GET_MEMBER:
            return {
                ...state,
                item: action.payload,
                isready:true,
            };
        case DELETE_MEMBER:
            return {
                ...state,
                item: action.payload,
            };
        default:
            return state;
    }

}
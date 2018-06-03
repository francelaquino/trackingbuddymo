import {  POST_DATA, SIGNIN_USER, NO_CONNECTION } from '../actions/types';

const initialState = {
    items:[],
    item:[],
    isready:false
}


export default function(state=initialState,action){
    switch(action.type){
        case POST_DATA:
            return {
                ...state,
                items: action.payload
            };
        case SIGNIN_USER:
            return {
                ...state,
                item: action.payload,
                isready:true,
            };
        case NO_CONNECTION:
            return {
                ...state,
                item: action.payload,
            };
        default:
            return state;
    }

}
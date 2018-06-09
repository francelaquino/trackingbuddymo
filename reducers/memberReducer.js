import {  DISPLAY_MEMBER,INVITE_MEMBER, GET_MEMBER, DELETE_MEMBER, DISPLAY_HOME_MEMBER, DISPLAY_GROUP_MEMBER } from '../actions/types';

const initialState = {
    members:[],
    member:[],
    home_members:[],
    isLoading:true,
    success:true,
}


export default function(state=initialState,action){
    switch(action.type){
        case DISPLAY_MEMBER:
            return {
                ...state,
                members: action.payload,
                isLoading:false,
            };
        case DISPLAY_HOME_MEMBER:
            return {
                ...state,
                home_members: action.payload,
                isLoading:false,
            };
        case DISPLAY_GROUP_MEMBER:
            return {
                ...state,
                members: action.payload,
                isLoading:false,
            }
        case GET_MEMBER:
            return {
                ...state,
                members: action.payload,
                isready:true,
            };
        case DELETE_MEMBER:
            return {
                ...state,
                members: action.payload,
            };
        default:
            return state;
    }

}
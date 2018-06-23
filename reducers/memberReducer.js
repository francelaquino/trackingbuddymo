import {  GET_INVITATIONCODE, GENERATE_INVITATIONCODE, DISPLAY_MEMBER,INVITE_MEMBER, GET_MEMBER, DELETE_MEMBER, DISPLAY_HOME_MEMBER, DISPLAY_GROUP_MEMBER } from '../actions/types';

const initialState = {
    members:[],
    member:[],
    home_members:[],
    invitationcode:[],
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
        case GET_INVITATIONCODE:
            return {
                ...state,
                invitationcode: action.payload,
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
                member: action.payload,
                isLoading:false,
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
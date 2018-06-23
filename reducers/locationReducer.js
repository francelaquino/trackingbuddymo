import {  DISPLAY_LOCATION } from '../actions/types';

const initialState = {
    locations:[],
    location:[],
    isLoading:true,
    success:true,
}


export default function(state=initialState,action){
    switch(action.type){
        case DISPLAY_LOCATION:
            return {
                ...state,
                locations: action.payload,
                isLoading:false,
            };
        
        default:
            return state;
    }

}
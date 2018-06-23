import {  DISPLAY_LOCATION, SAVE_LOCATION_OFFLINE, SAVE_LOCATION_ONLINE } from '../actions/types';

const initialState = {
    coordinates:[],
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
        case SAVE_LOCATION_OFFLINE:
            return {
                ...state,
                coordinates: state.coordinates.concat(action.payload),
            };
        case SAVE_LOCATION_ONLINE:
            return {
                ...state,
                coordinates: [],
            };


        default:
            return state;
    }

}
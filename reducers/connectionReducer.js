import { CONNECTION_STATE } from '../actions/types';

const initialState = {
    isConnected:true,
}


export default function(state=initialState,action){
    switch(action.type){
        case CONNECTION_STATE:
            return{
                ...state,
                isConnected:action.payload,
            }
      
        default:
            return state;
    }

}
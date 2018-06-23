import { CONNECTION_STATE } from './types';
import { BASE_URL } from '../constants';
import axios from 'axios';

export const setConnection=(connection)=> dispatch=> {
    dispatch({ 
        type: CONNECTION_STATE,
        payload: connection
    });
};

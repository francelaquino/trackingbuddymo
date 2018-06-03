import { CREATE_GROUP, DISPLAY_GROUP, DELETE_GROUP } from './types';
import { BASE_URL } from '../constants'
import axios from 'axios';

export const createGroup=(data)=> dispatch=> {
    var user={
        userid:25
    }
    return new Promise((resolve) => {
        axios.post(BASE_URL+'group/creategroup',
        {
            data:data,
            user:user
        })
        .then(function (res) {
            resolve(res.data);
        })
        .catch(function (error) {
            dispatch({ type: NO_CONNECTION,payload: [] });
        });
    });
};

export const displayGroup=()=> dispatch=> {
    axios.get(BASE_URL+'group/displaygroup')
    .then(function (res) {
        dispatch({ 
            type: DISPLAY_GROUP,
            payload: res.data.result
        });
    });
};

export const deleteGroup=(data)=> dispatch=> {
    return new Promise((resolve) => {
        axios.delete(BASE_URL+'group/deletegroup',
        {
            data:data
        })
        .then(function (res) {
            resolve(res.data);

        })
    });
};

export const updateGroup=(data)=> dispatch=> {
    var user={
        userid:25
    }
    return new Promise((resolve) => {
        axios.put(BASE_URL+'group/updategroup',
        {
            data:data,
            user:user
        })
        .then(function (res) {
            resolve(res.data);
        })
    });
};


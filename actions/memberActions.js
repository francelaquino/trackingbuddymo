import { DISPLAY_MEMBER, INVITE_MEMBER, GET_MEMBER, DELETE_MEMBER } from './types';
import { BASE_URL } from '../constants'
import axios from 'axios';



export const displayMember=()=> dispatch=> {
    axios.get(BASE_URL+'member/displaymember')
    .then(function (res) {
        dispatch({ 
            type: DISPLAY_MEMBER,
            payload: res.data.result
        });
    });
};

export const getMember=(id)=> dispatch=> {
    axios.get(BASE_URL+'member/getmember/'+id)
    .then(function (res) {
        dispatch({ 
            type: GET_MEMBER,
            payload: res.data.result
        });
    });
};


export const deleteMember=(data)=> dispatch=> {
    return new Promise((resolve) => {
        axios.delete(BASE_URL+'member/deletemember',
        {
            data:data
        })
        .then(function (res) {
            resolve(res.data);

        })
    });
};

export const sendInvite=(data)=> dispatch=> {
    var user={
        userid:25
    }
    return new Promise((resolve) => {
        axios.post(BASE_URL+'member/sendinvite',
        {
            data:data,
            user:user
        })
        .then(function (res) {
            resolve(res.data);

        })
    });
};


import { SIGNIN_USER,REGISTRATION_USER, NO_CONNECTION } from './types';
import { BASE_URL } from '../constants'
import { reset } from 'redux-form';
import axios from 'axios';
import firebase from 'react-native-firebase';

export const submitSignUp=(user)=> dispatch=> {
  return new Promise((resolve) => {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(user.email,user.password).then((response)=>{
      //let uid=response.uid;
      console.log(response)
      //dispatch({type: SIGNIN_USER});
    }).catch(function(e){
      console.log(e.Error)
    })
  });
    
};




export const userSignIn=(username,password)=> dispatch=> {
  return new Promise((resolve) => {
    axios.get(BASE_URL+'user/signin/'+username+'/'+password)
    .then(function (res) {
        dispatch({ 
            type: SIGNIN_USER,
            payload: res.data.result
        });
        resolve(res.data);
    });
  });
};


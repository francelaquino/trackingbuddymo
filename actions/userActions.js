import { SIGNIN_USER,REGISTRATION_USER, NO_CONNECTION, GET_PROFILE } from './types';
import { BASE_URL } from '../constants'
import { reset } from 'redux-form';
import axios from 'axios';
import firebase from 'react-native-firebase';
import Moment from 'moment';
var userdetails = require('../components/shared/userDetails');

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




export const getProfile=()=>  dispatch=> {
  try{
    return new Promise((resolve) => {
      firebase.database().ref().child("users/"+userdetails.userid).once("value",function(snapshot){
        let profile={
            firstname:snapshot.val().firstname,
            lastname:snapshot.val().lastname,
            middlename:snapshot.val().middlename,
            email:snapshot.val().email,
            avatar:snapshot.val().avatar,
            mobileno:snapshot.val().mobileno,
        }
        dispatch({ 
          type: GET_PROFILE,
          payload: profile
        });
          resolve();
      });
    }).then(function(){
        
    });

    }catch (e) {
      dispatch({ 
          type: GET_PROFILE,
          payload: []
      });
  }
};


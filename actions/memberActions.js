import { DISPLAY_MEMBER, INVITE_MEMBER, GET_MEMBER, DELETE_MEMBER, DISPLAY_HOME_MEMBER, DISPLAY_GROUP_MEMBER } from './types';
import axios from 'axios';
import firebase from 'react-native-firebase';
var userdetails = require('../components/shared/userDetails');



export const displayHomeMember=()=> dispatch=> {
    let members=[];

    if(userdetails.group==""){
        return new Promise((resolve) => {

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    members.push({
                        id:userdetails.userid,
                        firstname:userdetails.firstname,
                        avatar: userdetails.avatar,
                        address : '',
                        coordinates:{
                            longitude: Number(position.coords.longitude),
                            latitude: Number(position.coords.latitude)
                        }
                    });
                  
                },
                (err) => {
                },
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
              );



            let memberRef = firebase.database().ref().child('users/'+userdetails.userid+"/members").on('value',function(snapshot){
                resolve(snapshot)
            })
            
            }).then(function(snapshot){
                if(snapshot.val()===null){
                    dispatch({ 
                        type: DISPLAY_HOME_MEMBER,
                        payload: members,
                    });
                }else{
                    snapshot.forEach(childSnapshot => {
                        let userid=childSnapshot.key;
                        return childPromise= new Promise((resolve,reject)=>{
                            let childRef= firebase.database().ref().child('users/'+userid).once("value",function(snapshot){
                                if(snapshot.val() !== null){
                                    members.push({
                                        id:snapshot.key,
                                        firstname:snapshot.val().firstname,
                                        avatar: snapshot.val().avatar,
                                        address : snapshot.val().address,
                                        coordinates:{
                                            longitude: Number(snapshot.val().longitude),
                                            latitude: Number(snapshot.val().latitude)
                                        }
                                    });
                                }
                                resolve();
                            })
                        }).then(function(){
                            dispatch({ 
                                type: DISPLAY_HOME_MEMBER,
                                payload: members,
                            });


                        })
                    })
                }
        })
    }else{

        return parentPromise= new Promise((resolve,reject)=>{
            let memberRef = firebase.database().ref().child("groupmembers/"+userdetails.group).on('value',function(snapshot){
                resolve(snapshot)
            })
            }).then(function(snapshot){
                if(snapshot.val()===null){
                    dispatch({ 
                        type: DISPLAY_HOME_MEMBER,
                        payload: members,
                    });
                }else{
                    snapshot.forEach(childSnapshot => {
                        let userid=childSnapshot.key;
                        return childPromise= new Promise((resolve,reject)=>{
                            let childRef= firebase.database().ref().child('users/'+userid).once("value",function(snapshot){
                                if(snapshot.val() !== null){
                                    members.push({
                                        id:snapshot.key,
                                        firstname:snapshot.val().firstname,
                                        avatar: snapshot.val().avatar,
                                        coordinates:{
                                            longitude: Number(snapshot.val().longitude),
                                            latitude: Number(snapshot.val().latitude)
                                        },
                                        address : snapshot.val().address,
                                    });
                                }


                                resolve();
                            })
                        }).then(function(snapshot){
                            dispatch({ 
                                type: DISPLAY_HOME_MEMBER,
                                payload: members,
                            });
                        })
                    })
                }
            
        })
    }

};


export const displayGroupMember=(groupid)=> dispatch=> {
   
    let members=[];
    let key="";
    let firstname="";
    let avatar="";
    let userid="";
    let count=0;
    let cnt=0;
        return new Promise((resolve,reject)=>{
            firebase.database().ref().child("users/"+userdetails.userid+'/members').once('value',function(snapshot){
                resolve(snapshot);
            });
        }).then(function(snapshot){
            if(snapshot.val()===null){
                dispatch({ 
                    type: DISPLAY_GROUP_MEMBER,
                    payload: members
                });
            }else{
                return new Promise((resolve,reject)=>{
                    count=snapshot.numChildren();
                    snapshot.forEach(snapshot1 => {
                        userid=snapshot1.key;
                        return new Promise((resolve,reject)=>{
                            firebase.database().ref().child('users/'+userid).once("value",function(snapshot2){
                                key=snapshot2.key;
                                firstname=snapshot2.val().firstname;
                                avatar= snapshot2.val().avatar;
                                resolve()
                            });
                        }).then(function(){
                            return new Promise((resolve,reject)=>{
                                firebase.database().ref().child('groupmembers/'+groupid).orderByChild("member").equalTo(key).once("value",function(snapshot3){
                                    if(snapshot3.val()===null){
                                        resolve(false);
                                    }else{
                                        resolve(true);
                                    }
                                })
                            }).then(function(selected){
                                members.push({
                                    id:key,
                                    firstname:firstname,
                                    avatar: avatar,
                                    selected : selected,
                                });
                                cnt++;
                                if(cnt>=count){
                                    resolve();
                                }
                            });
                        });
                    });
                    
                }).then(function(){
                    dispatch({ 
                        type: DISPLAY_GROUP_MEMBER,
                        payload: members
                    });
                });
            }
        });

};



export const displayMember=()=> dispatch=> {
   
    let members=[]

    return parentPromise= new Promise((resolve,reject)=>{
        let memberRef = firebase.database().ref().child('users/'+userdetails.userid+"/members").on('value',function(snapshot){
            resolve(snapshot)
        })
        }).then(function(snapshot){
            if(snapshot.val()===null){
                dispatch({ 
                    type: DISPLAY_MEMBER,
                    payload: members
                });
            }else{
                snapshot.forEach(childSnapshot => {
                let userid=childSnapshot.key;
                return childPromise= new Promise((resolve,reject)=>{
                    let childRef= firebase.database().ref().child('users/'+userid).once("value",function(snapshot){
                        if(snapshot.val() !== null){
                            members.push({
                            id:snapshot.key,
                            firstname:snapshot.val().firstname,
                            avatar: snapshot.val().avatar,
                            });
                        }
                        resolve(snapshot);
                    })
                    }).then(function(){
                        dispatch({ 
                            type: DISPLAY_MEMBER,
                            payload: members
                        });
                    }).catch(function(err) {
                    });
                })
            }
        }).catch(function(err) {
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


export const deleteMember=(memberid)=> dispatch=> {
    return new Promise((resolve) => {
        let memberRef=firebase.database().ref().child("users/"+userdetails.userid+"/members/"+memberid);
        memberRef.remove()
        .catch(function(err) {
            resolve(false)
        });
        resolve(true)
    });
};

export const sendInvite=(invitationcode)=> dispatch=> {
    return new Promise((resolve) => {
        firebase.database().ref().child("users").orderByChild("invitationcode").equalTo(invitationcode).once("value",snapshot => {
            let id="";
            let parent=this;
            snapshot.forEach(function(childSnapshot) {
                id = childSnapshot.key;
                let userRef = firebase.database().ref().child("users/"+userdetails.userid+"/members/"+id);
                userRef.set({ 
                    id : id,
                    dateadded: Date.now(),
                }).catch(function(err) {
                    resolve(false)
                });
                resolve(true)
            });
            resolve(false)
        }).catch(function(err) {
            resolve(false)
        });

    });
};


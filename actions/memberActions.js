import { DISPLAY_MEMBER, INVITE_MEMBER, GET_INVITATIONCODE, GENERATE_INVITATIONCODE, GET_MEMBER, DELETE_MEMBER, DISPLAY_HOME_MEMBER, DISPLAY_GROUP_MEMBER } from './types';
import firebase from 'react-native-firebase';
import Moment from 'moment';


var userdetails = require('../components/shared/userDetails');



export const displayHomeMember=()=> async dispatch=> {
    let members=[];
    let home_markers=[];
    let count=0;
    let cnt=0;

    if(userdetails.group==""){
        await firebase.database().ref().child('users/'+userdetails.userid).once("value",function(snapshot){
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
                /*const coord = {
                    coordinates:{
                        longitude: Number(snapshot.val().longitude),
                        latitude: Number(snapshot.val().latitude)
                    }
                };
                home_markers.push(coord);*/
            }
        })

        await firebase.database().ref().child('users/'+userdetails.userid+"/members").on('value',async function(snapshot){
            if(snapshot.val()===null){
                dispatch({ 
                    type: DISPLAY_HOME_MEMBER,
                    payload: members,
                });

               /* dispatch({ 
                    type: DISPLAY_HOME_MARKER,
                    payload: home_markers,
                });*/
            }else{
                count=snapshot.numChildren();
                await snapshot.forEach(async childSnapshot  => {
                    let userid=childSnapshot.key;
                        await firebase.database().ref().child('users/'+userid).once("value",function(dataSnapshot){
                            if(dataSnapshot.val() !== null){
                                members.push({
                                    id:dataSnapshot.key,
                                    firstname:dataSnapshot.val().firstname,
                                    avatar: dataSnapshot.val().avatar,
                                    address : dataSnapshot.val().address,
                                    coordinates:{
                                        longitude: Number(dataSnapshot.val().longitude),
                                        latitude: Number(dataSnapshot.val().latitude)
                                    }
                                });
                               /* const coord = {
                                    coordinates:{
                                        longitude: Number(dataSnapshot.val().longitude),
                                        latitude: Number(dataSnapshot.val().latitude)
                                    }
                                };
                                home_markers.push(coord);*/
                                
                            }
                            cnt++;
                            if(cnt>=count){
                                dispatch({ 
                                    type: DISPLAY_HOME_MEMBER,
                                    payload: members,
                                });
                               /* dispatch({ 
                                    type: DISPLAY_HOME_MARKER,
                                    payload: home_markers,
                                });*/
                            }
                        })
                })

            }
        })

       
        /*return new Promise((resolve) => {
            firebase.database().ref().child('users/'+userdetails.userid).once("value",function(snapshot){
                               
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
            })

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
                    count=snapshot.numChildren();
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
                                cnt++;
                                if(cnt>=count){
                                    resolve();
                                }
                            })

                        }).then(function(){
                            dispatch({ 
                                type: DISPLAY_HOME_MEMBER,
                                payload: members,
                            });


                        })
                    })
                }
        })*/
            
           
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
                    count=snapshot.numChildren();
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
                                cnt++;
                                if(cnt>=count){
                                    resolve();
                                }
                                
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
                                firebase.database().ref().child('groupmembers/'+groupid+"/"+key).once("value",function(snapshot3){
                                    let selected=false;
                                    if(snapshot3.val()===null){
                                        selected=false;
                                         members.push({
                                            id:snapshot2.key,
                                            firstname:snapshot2.val().firstname,
                                            avatar: snapshot2.val().avatar,
                                            selected:false,
                                            });
                                            resolve();
                                    }else{
                                        members.push({
                                            id:snapshot2.key,
                                            firstname:snapshot2.val().firstname,
                                            avatar: snapshot2.val().avatar,
                                            selected:true,
                                            });
                                            resolve();
                                    }


                            });
                        });
                        }).then(function(){
                           
                            cnt++;
                                if(cnt>=count){
                                    resolve();
                                }
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





export const displayMember=()=> async dispatch=> {
   try{
        let members=[]
        let count=0;
        let cnt=0;
        await firebase.database().ref().child('users/'+userdetails.userid+"/members").on('value',async function(snapshot){
        
            if(snapshot.val()===null){
                dispatch({ 
                    type: DISPLAY_MEMBER,
                    payload: members
                });
            }else{
                count=snapshot.numChildren();
                await snapshot.forEach(async childSnapshot => {
                        let userid=childSnapshot.key;
                        await firebase.database().ref().child('users/'+userid).once("value",async function(dataSnapshot){
                            if(dataSnapshot.val() !== null){
                                members.push({
                                    id:dataSnapshot.key,
                                    firstname:dataSnapshot.val().firstname,
                                    avatar: dataSnapshot.val().avatar,
                                });
                            }
                        })
                        cnt++;
                            if(cnt>=count){
                                dispatch({ 
                                    type: DISPLAY_MEMBER,
                                    payload: members
                                });
                            }
                    })
                }
            
        })
    }catch (e) {
        dispatch({ 
            type: DISPLAY_MEMBER,
            payload: members
        });
    }
   
    
};

export const getMember=(userid)=> async dispatch=> {
    try{
        await firebase.database().ref().child("users/"+userid).once("value",function(snapshot){
            let member={
                firstname:snapshot.val().firstname,
                lastname:snapshot.val().lastname,
                middlename:snapshot.val().middlename,
                email:snapshot.val().email,
                avatar:snapshot.val().avatar,
                mobileno:snapshot.val().mobileno,
                datecreated: Moment(new Date(parseInt(snapshot.val().datecreated))).format("DD-MMM-YYYY")
            }
            dispatch({ 
                type: GET_MEMBER,
                payload: member
            });
        });
    }catch (e) {
        dispatch({ 
            type: GET_MEMBER,
            payload: []
        });
    }
};


export const deleteMember=(memberid)=> async dispatch=> {
        
        await firebase.database().ref().child("users/"+userdetails.userid+"/members/"+memberid).remove()
        .catch(function(err) {
            resolve(false)
        });

        await firebase.database().ref().child("memberof/"+memberid+"/"+userdetails.userid).remove()
        .catch(function(err) {
            resolve(false)
        });

        await firebase.database().ref().child("groupmembers").orderByKey().equalTo(memberid).remove()
        .catch(function(err) {
            resolve(false)
        });


        
};



export const getInvitationCode=()=> dispatch=> {
    return new Promise((resolve) => {
        let invitationcode={
            code:'',
            expiration:'',
        }

        let userRef = firebase.database().ref().child('users/'+userdetails.userid);
        userRef.once('value', (snapshot) => {
            let expiration= Moment(new Date(parseInt(snapshot.val().invitationcodeexpiration))).format("DD-MMM-YYYY");
                invitationcode.code=snapshot.val().invitationcode;
                invitationcode.expiration=expiration;
            dispatch({ 
                type: GET_INVITATIONCODE,
                payload: invitationcode
            });
            resolve()
            
        })
        .catch(function(err) {
            dispatch({ 
                type: GET_INVITATIONCODE,
                payload: invitationcode
            });
            resolve()
          });
         
    });
       
};

export const generateInvitationCode=()=> dispatch=> {
    return new Promise((resolve) => {
        var code = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for(var i = 0; i < 5; i++) {
            code += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        let days=86400000*6;

        let groupRef = firebase.database().ref().child("users/"+userdetails.userid);
        groupRef.update({ 
                invitationcode : code,
                invitationcodeexpiration: Date.now()+days,
        })
        .catch(function(err) {
            resolve()
        });
        resolve()
        }).catch(function(err) {
            resolve()
    });
   
};


export const sendInvite=(invitationcode)=> async dispatch=> {
    return new Promise((resolve) => {
        firebase.database().ref().child("users").orderByChild("invitationcode").equalTo(invitationcode).once("value",async snapshot => {
            let id="";
            let parent=this;
            snapshot.forEach(async function(childSnapshot) {
                let expiration= childSnapshot.val().invitationcodeexpiration;
                
                let today = Date.now();
                if(Number(today)>Number(expiration)){
                    resolve(false);
                }else{
                    id = childSnapshot.key;
                    await firebase.database().ref().child("users/"+userdetails.userid+"/members/"+id).set({ 
                        userid : id,
                        dateadded: Date.now(),
                        lastmovement: Date.now(),
                    }).catch(function(err) {
                        resolve(false)
                    });

                    await firebase.database().ref().child("users/"+id+"/members/"+userdetails.userid).set({ 
                        userid : id,
                        dateadded: Date.now(),
                        lastmovement: Date.now(),
                    }).catch(function(err) {
                        resolve(false)
                    });

                    await firebase.database().ref().child("memberof/"+id+"/"+userdetails.userid).update({ 
                        userid : userdetails.userid,
                        dateadded: Date.now(),
                    }).catch(function(err) {
                        resolve(false)
                    });

                    await firebase.database().ref().child("memberof/"+userdetails.userid+"/"+id).update({ 
                        userid : userdetails.userid,
                        dateadded: Date.now(),
                    }).catch(function(err) {
                        resolve(false)
                    });
                    resolve(true)
                }

               
            });
        }).catch(function(err) {
            console.log(err)
            resolve(false)
        });

    });
};

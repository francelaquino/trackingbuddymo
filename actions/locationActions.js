import { DISPLAY_LOCATION, SAVE_LOCATION_OFFLINE, SAVE_LOCATION_ONLINE, DISPLAY_PLACES,GET_PLACE_ALERT } from './types';
import firebase from 'react-native-firebase';
import Moment from 'moment';
import Geocoder from 'react-native-geocoder';

var userdetails = require('../components/shared/userDetails');



export const displayLocations=(userid)=> dispatch=> {
    let locations=[];
    let count=0;
    let cnt=0;

        return new Promise((resolve) => {
            firebase.database().ref().child('locations/'+userid).orderByChild("dateadded").limitToFirst(100).on("value",function(snapshot){
                if(snapshot.val()===null){
                    resolve();
                }else{
                    snapshot.forEach(childSnapshot => {
                        
                        let dateadded= Moment(new Date(parseInt(childSnapshot.val().dateadded))).format("DD-MMM-YYYY ddd hh:mm A");
                        locations.push({
                            id:childSnapshot.key,
                            address:childSnapshot.val().address,
                            dateadded: dateadded,
                            coordinates:{
                                longitude: Number(childSnapshot.val().lon),
                                latitude: Number(childSnapshot.val().lat)
                            }
                            
                        });
                        cnt++;
                        if(cnt>=count){
                            resolve();
                        }

                    })
                    
                }
            })
            }).then(function(snapshot){
                    dispatch({ 
                        type: DISPLAY_LOCATION,
                        payload: locations,
                    });
                
            })
            
           
    
};


export const saveLocationOffline=(coordinate)=> dispatch=> {
        let coord = {
            lat: coordinate.lat,
            lng:  coordinate.lng,
        };

          dispatch({ 
            type: SAVE_LOCATION_OFFLINE,
            payload: coord,
        });
    
};

export const saveLocationOnline=(coordinate)=> dispatch=> {
    let coords = {
        lat: coordinate.lat,
        lng:  coordinate.lng,
    };

    let dateadded=Date.now();
    Geocoder.geocodePosition(coords).then(res => {
            fetch("https://us-central1-trackingbuddy-3bebd.cloudfunctions.net/saveLocation?lat="+ coords.lat +"&lon="+ coords.lng +"&userid="+userdetails.userid+"&address="+res[1].formattedAddress+"&dateadded="+dateadded)
            .then((response) => response)
            .then((response) => {
                dispatch({ 
                    type: SAVE_LOCATION_ONLINE,
                    payload: [],
                });
            })
            .catch((error) => {
                dispatch({ 
                    type: SAVE_LOCATION_ONLINE,
                    payload: [],
                });
            });
            
    }).catch(err => {
        dispatch({ 
            type: SAVE_LOCATION_ONLINE,
            payload: [],
        });
    })

      

};


export const createPlace=(place,coordinate)=> dispatch=> {
    let coords = {
        lat: coordinate.latitude,
        lng:  coordinate.longitude,
    };
    return new Promise((resolve) => {

        Geocoder.geocodePosition(coords).then(res => {
            let address=res[1].formattedAddress;
            firebase.database().ref().child("places/"+userdetails.userid).orderByChild("placename").equalTo(place).once("value",snapshot => {
                if(snapshot.val()==null){
                    firebase.database().ref().child("places/"+userdetails.userid).push({ 
                            placename : place,
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                            latitudeDelta: coordinate.latitudeDelta,
                            longitudeDelta: coordinate.longitudeDelta,
                            address: address,
                            dateadded: Date.now(),
                            dateupdated: Date.now(),
                    })
                    .catch(function(err) {
                        resolve("")
                    });
                    resolve("Place successfully created");
                }else{
                    resolve("Place already exist");
                }
            }).catch(function(err) {
                resolve("");
                
            });
        }).catch(err => {
            resolve("");
        })
    });
};


export const updatePlace=(id,placename,coordinate)=> dispatch=> {
    let coords = {
        lat: coordinate.latitude,
        lng:  coordinate.longitude,
    };
    return new Promise((resolve) => {
        Geocoder.geocodePosition(coords).then(res => {
            let address=res[1].formattedAddress;
            firebase.database().ref().child("places/"+userdetails.userid).orderByChild("placename").equalTo(placename).once("value",snapshot => {
                let key="";
                snapshot.forEach(function(childSnapshot) {
                    key =childSnapshot.key;
                });
                if(key==id || key==""){
                    firebase.database().ref().child("places/"+userdetails.userid+"/"+id).update({ 
                            placename : placename,
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                            address: address,
                            latitudeDelta: coordinate.latitudeDelta,
                            longitudeDelta: coordinate.longitudeDelta,
                            dateupdated: Date.now(),
                    })
                    .catch(function(err) {
                        resolve("")
                    });
                    resolve("Place successfully updated");
                }else{
                    resolve("Place already exist");
                }
            }).catch(function(err) {
                resolve("");
                
            });
        }).catch(err => {
            resolve("");
        })
    });
};



export const savePlaceAlert=(alert)=> dispatch=> {
    return new Promise((resolve) => {
        
            firebase.database().ref().child("placealert/"+alert.placeid+"/"+alert.userid).set({ 
                            placeid: alert.placeid,
                            latitude: alert.latitude,
                            longitude: alert.longitude,
                            userid:alert.userid,
                            placeowner:userdetails.userid,
                            arrives:alert.arrives,
                            leaves:alert.leaves,
                            dateupdated: Date.now(),
            });
            resolve("Place alert successfully saved");
        }).catch(err => {
            resolve("");
        })
};

export const getPlaceAlert=(placeid,userid)=> dispatch=> {
    let alert={
        arrives:false,
        leaves:false
    }
    return new Promise((resolve) => {
            let done=false;
            firebase.database().ref().child("placealert/"+placeid+"/"+userid).once("value",snapshot => {
                    if(snapshot.val()!==null){
                        alert={
                            arrives:snapshot.val().arrives,
                            leaves:snapshot.val().leaves
                        }
                    }
                        dispatch({ 
                            type: GET_PLACE_ALERT,
                            payload: alert,
                        });
                        resolve();
                });
        }).catch(err => {
            dispatch({ 
                type: GET_PLACE_ALERT,
                payload: alert,
            });
            resolve("");
        })
};



export const deletePlace=(id)=> dispatch=> {
    return new Promise((resolve) => {

        firebase.database().ref().child("placealert/"+id).remove()
        .catch(function(err) {
            resolve("")
        });

        firebase.database().ref().child("places/"+userdetails.userid+"/"+id).remove()
        .catch(function(err) {
            resolve("")
        });
        resolve("Place successfully deleted");
    });
};


export const displayPlaces=()=> dispatch=> {
    let places=[];
    let count=0;
    let cnt=0;
        return new Promise((resolve) => {
            firebase.database().ref().child('places/'+userdetails.userid).orderByKey().on("value",function(snapshot){
                snapshot.forEach(childSnapshot => {
                    let dateadded= Moment(new Date(parseInt(childSnapshot.val().dateadded))).format("ddd DD-MMM-YYYY hh:mm A");
                    places.push({
                        id:childSnapshot.key,
                        address:childSnapshot.val().address,
                        placename:childSnapshot.val().placename,
                        dateadded: dateadded,
                        longitude: Number(childSnapshot.val().longitude),
                        latitude: Number(childSnapshot.val().latitude)
                        
                    });
                    cnt++;
                    if(cnt>=count){
                        resolve();
                    }

                })
            });
        }).then(function(){
            dispatch({ 
                type: DISPLAY_PLACES,
                payload: places,
                });
        })
    
};


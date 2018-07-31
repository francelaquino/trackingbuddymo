import { DISPLAY_LOCATION, SAVE_LOCATION_OFFLINE, SAVE_LOCATION_ONLINE, DISPLAY_PLACES,GET_PLACE_ALERT } from './types';
import firebase from 'react-native-firebase';
import Moment from 'moment';
import Geocoder from 'react-native-geocoder';
import { ToastAndroid } from 'react-native';


var userdetails = require('../components/shared/userDetails');



export const displayLocations=(userid)=> dispatch=> {
    let locations=[];
    let count=0;
    let cnt=0;

    return new Promise((resolve) => {
        firebase.database().ref(".info/connected").on("value", function (snap) {
            if (snap.val() === true) {
                firebase.database().ref().child('locations/' + userid).orderByChild("dateadded").limitToFirst(100).once("value", function (snapshot) {
                    if (snapshot.val() === null) {
                        resolve("");
                    } else {
                        snapshot.forEach(childSnapshot => {

                            let dateadded = Moment(new Date(parseInt(childSnapshot.val().dateadded))).format("DD-MMM-YYYY ddd hh:mm A");
                            locations.push({
                                id: childSnapshot.key,
                                address: childSnapshot.val().address,
                                dateadded: dateadded,
                                coordinates: {
                                    longitude: Number(childSnapshot.val().lon),
                                    latitude: Number(childSnapshot.val().lat)
                                }

                            });
                            cnt++;
                            if (cnt >= count) {
                                dispatch({
                                    type: DISPLAY_LOCATION,
                                    payload: locations.reverse(),
                                });
                                resolve("");
                            }

                        })

                    }
                })
            } else {
                dispatch({
                    type: DISPLAY_LOCATION,
                    payload: [],
                });
                resolve("Network connection error");
            }
        })
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

export const saveLocationOnline=()=> async dispatch=> {
    if (userdetails.userid == "" || userdetails.userid==null) {
        dispatch({ 
            type: SAVE_LOCATION_ONLINE,
            payload: [],
        });
    } else {

        let dateadded=Date.now();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetch("https://us-central1-trackingbuddy-3bebd.cloudfunctions.net/api/appendLocation?lat="+ position.coords.latitude +"&lon="+ position.coords.longitude +"&userid="+userdetails.userid+"&dateadded="+dateadded+"&firstname="+userdetails.firstname)
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
            
            },
            (err) => {
            },
             { enableHighAccuracy: false, timeout: 10000, maximumAge: 3000 }
        );
    }
};

export const saveLocationOnLogin=()=> async dispatch=> {
    return new Promise((resolve) => {
       
        navigator.geolocation.getCurrentPosition(
            (position) => {

                console.log(userdetails);
                resolve(position)
            },
            (err) => {
            },
            { enableHighAccuracy: true, timeout: 20000 }
        );

    }).then(function(position){
        let dateadded=Date.now();
        fetch("https://us-central1-trackingbuddy-3bebd.cloudfunctions.net/api/appendLocation?lat="+ position.coords.latitude +"&lon="+ position.coords.longitude +"&userid="+userdetails.userid+"&dateadded="+dateadded+"&firstname="+userdetails.firstname)
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
        
    });
};







export const createPlace=(place,coordinate)=> dispatch=> {
    let coords = {
        lat: coordinate.latitude,
        lng:  coordinate.longitude,
    };
    return new Promise((resolve) => {
        firebase.database().ref(".info/connected").on("value", function (snap) {
            if (snap.val() === true) {

                Geocoder.geocodePosition(coords).then(res => {
                    let address = res[1].formattedAddress;
                    firebase.database().ref().child("places/" + userdetails.userid).orderByChild("placename").equalTo(place).once("value", snapshot => {
                        if (snapshot.val() == null) {
                            firebase.database().ref().child("places/" + userdetails.userid).push({
                                placename: place,
                                latitude: coordinate.latitude,
                                longitude: coordinate.longitude,
                                latitudeDelta: coordinate.latitudeDelta,
                                longitudeDelta: coordinate.longitudeDelta,
                                address: address,
                                dateadded: Date.now(),
                                dateupdated: Date.now(),
                            })
                                .catch(function (err) {
                                    resolve("")
                                });
                            resolve("Place successfully created");
                        } else {
                            resolve("Place already exist");
                        }
                    }).catch(function (err) {
                        resolve("");

                    });
                }).catch(err => {
                    resolve("");
                })
            } else {
                resolve("");
                ToastAndroid.showWithGravityAndOffset("Network connection error", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
        });
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



export const savePlaceAlert=(alert)=> async dispatch=> {
    try{
        await firebase.database().ref().child("placealert/"+alert.userid+"/"+alert.placeid).set({ 
            placeid: alert.placeid,
            latitude: alert.latitude,
            longitude: alert.longitude,
            userid:alert.userid,
            placeowner:userdetails.userid,
            arrives:alert.arrives,
            leaves:alert.leaves,
            dateupdated: Date.now(),
        });
        return "Alert successfully saved";
    }catch (e) {
        return "";
    }
    
        
         
};

export const getPlaceAlert=(placeid,userid)=> async dispatch=> {
    let alert={
        arrives:false,
        leaves:false
    }

    try{
        await firebase.database().ref().child("placealert/"+userid+"/"+placeid).once("value",snapshot => {
                if(snapshot.val()!==null){
                    alert={
                        arrives:snapshot.val().arrives,
                        leaves:snapshot.val().leaves
                    }
                }
                    
            });

            dispatch({ 
                type: GET_PLACE_ALERT,
                payload: alert,
            });

    }catch (e) {
        dispatch({ 
            type: GET_PLACE_ALERT,
            payload: alert,
        });
    }

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


export const displayPlaces=()=>async dispatch=> {
    let places=[];
    try {
        firebase.database().ref(".info/connected").on("value", function (snap) {
            if (snap.val() === true) {
                firebase.database().ref().child('places/' + userdetails.userid).orderByKey().once("value", async function (snapshot) {
                    await snapshot.forEach(childSnapshot => {
                        let dateadded = Moment(new Date(parseInt(childSnapshot.val().dateadded))).format("ddd DD-MMM-YYYY hh:mm A");
                        places.push({
                            id: childSnapshot.key,
                            address: childSnapshot.val().address,
                            placename: childSnapshot.val().placename,
                            dateadded: dateadded,
                            longitude: Number(childSnapshot.val().longitude),
                            latitude: Number(childSnapshot.val().latitude)

                        });
                    })
                    dispatch({
                        type: DISPLAY_PLACES,
                        payload: places,
                    });
                });
            } else {
                dispatch({
                    type: DISPLAY_PLACES,
                    payload: places,
                });

                ToastAndroid.showWithGravityAndOffset("Network connection error", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
        });
        
    }catch (e) {
        dispatch({ 
            type: DISPLAY_PLACES,
            payload: places,
        });
    }

  
    
};


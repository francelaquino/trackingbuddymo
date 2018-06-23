import { DISPLAY_LOCATION, SAVE_LOCATION_OFFLINE, SAVE_LOCATION_ONLINE } from './types';
import firebase from 'react-native-firebase';
import Moment from 'moment';
import Geocoder from 'react-native-geocoder';

var userdetails = require('../components/shared/userDetails');



export const displayLocations=(userid)=> dispatch=> {
    let locations=[];
    let count=0;
    let cnt=0;

        return new Promise((resolve) => {
            firebase.database().ref().child('locations/'+userid).orderByChild("dateadded").on("value",function(snapshot){
                if(snapshot.val()===null){
                    resolve();
                }else{
                    snapshot.forEach(childSnapshot => {
                        
                        let dateadded= Moment(new Date(parseInt(childSnapshot.val().dateadded))).format("DD-MMM-YYYY ddd HH:mm A");
                        locations.push({
                            id:childSnapshot.key,
                            address:childSnapshot.val().address,
                            dateadded: dateadded,
                            coordinates:{
                                longitude: Number(childSnapshot.val().lat),
                                latitude: Number(childSnapshot.val().lon)
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
    let coord = {
        lat: coordinate.lat,
        lng:  coordinate.lng,
    };

    let dateadded=Date.now();
    
    Geocoder.geocodePosition(coord).then(res => {
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





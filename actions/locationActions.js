import { DISPLAY_LOCATION } from './types';
import firebase from 'react-native-firebase';
import Moment from 'moment';

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
                console.log(childSnapshot)
                        
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




import  React  from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { DrawerNavigator } from 'react-navigation'
import BackgroundJob from 'react-native-background-job';
import Geocoder from 'react-native-geocoder';
import Navigation from './components/shared/Navigation';
var userdetails = require('./components/shared/userDetails');
BackgroundJob.cancelAll();



const trackPosition = {
    jobKey: "trackPositionJob",
    job: () =>this.trackLocation().done(),
};
    
BackgroundJob.register(trackPosition);


var trackPositionSchedule = {
    jobKey: "trackPositionJob",
    period: 90000,
    exact: true,
    allowExecutionInForeground: true
}

trackLocation = async() =>{
      navigator.geolocation.getCurrentPosition(
        (position) => {
            let coords = {
                lat: position.coords.latitude,
                lng:  position.coords.longitude
              };
        
            Geocoder.geocodePosition(coords).then(res => {
                fetch("https://us-central1-trackingbuddy-3bebd.cloudfunctions.net/saveLocation?lat="+ coords.lat +"&lon="+ coords.lng +"&userid="+userdetails.userid+"&address="+res[1].formattedAddress)
                .then((response) => response)
                .then((response) => {
                })
                .catch((error) => {
                console.error(error);
                });
            }).catch(err => console.log(err))
        },
        (err) => {
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      );
   



}


    
BackgroundJob.schedule(trackPositionSchedule);



const tracking =()=>(
    <Provider store={store}>
        <Navigation/>
    </Provider>
)

AppRegistry.registerComponent('tracking', () => tracking);

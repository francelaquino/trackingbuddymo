
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, Image, TouchableHighlight,ToastAndroid, NavigationActions  } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon } from 'native-base';
import firebase from 'react-native-firebase';
import Geocoder from 'react-native-geocoder';
import HomePlaces from './places/HomePlaces';
var userDetails = require('./shared/userDetails');
var registrationStyle = require('../assets/style/Registration');


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: 'francel_aquino@yahoo.com',
            password:'111111',
            
        };

       

      }
      
    trackLocation(){
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
          let coords = {
              lat: position.coords.latitude,
              lng:  position.coords.longitude
            };
      
          Geocoder.geocodePosition(coords).then(res => {
              fetch("https://us-central1-trackingbuddy-3bebd.cloudfunctions.net/saveLocation?lat="+ coords.lat +"&lon="+ coords.lng +"&userid="+userDetails.userid+"&address="+res[1].formattedAddress)
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
 

    onLogin (){
        let self=this;
        if(this.state.email=="" || this.state.password==""){
            ToastAndroid.showWithGravityAndOffset("Invalid username or wrong password",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50);
            return false;
        }

        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email,this.state.password).then((res)=>{
          let memberRef = firebase.database().ref().child('users/'+res.user.uid).on('value',function(snapshot){
            
              userDetails.userid=res.user.uid;
              userDetails.email=snapshot.val().email;
              userDetails.firstname=snapshot.val().firstname;
              userDetails.lastname=snapshot.val().lastname;
              self.trackLocation();
              
              



              setTimeout(() => {
                self.props.navigation.navigate('HomePlaces');
              }, 2000);
            });


         
         
        }).catch(function(e){
            self.setState({
                email:'',
                password:'',
              });
            ToastAndroid.showWithGravityAndOffset("Invalid username or bad password", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50 );
       
      })

      
    }
    render() {

        
        
    const { navigate } = this.props.navigation;
    return (
        <Root>
            <Container style={registrationStyle.containerWrapper}>
        	   
          	
            <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                    <View style={registrationStyle.container}>
                        <View style={registrationStyle.logoContainer}>
                        <Image  style={registrationStyle.logo} resizeMode='contain'  source={require('../images/logo.png')} />
                        </View>
                        <Item  stackedLabel style={registrationStyle.item}>
                            <Label style={registrationStyle.stackedlabel}>Email</Label>
                            <View style={registrationStyle.inputicon}>  
                            <TextInput style={registrationStyle.textinput} 
                            name="email" autoCorrect={false}
                            value={this.state.email}  maxLength = {50}
                            onChangeText={email=>this.setState({email})}/>
                            </View>
                        </Item>
                        <Item  stackedLabel style={registrationStyle.item}>
                            <Label style={registrationStyle.stackedlabel}>Password</Label>
                            <View style={registrationStyle.inputicon}>  
                            <TextInput style={registrationStyle.textinput} 
                            name="password" autoCorrect={false}
                            value={this.state.password}  maxLength = {50}
                            onChangeText={password=>this.setState({password})}/>
                            </View>
                        </Item>

                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                            <Button 
                                onPress={()=>this.onLogin()}
                                full rounded style={registrationStyle.registrationbutton}>
                                <Text style={{color:'white'}}>Login</Text>
                            </Button>
                            <TouchableHighlight underlayColor={'transparent'}>
                            <Text style={registrationStyle.haveaccount}>Forgot Password?</Text>
                            </TouchableHighlight>
                            <TouchableHighlight  underlayColor={'transparent'}  onPress={() =>navigate('Register')}>
                            <Text style={registrationStyle.haveaccount}>Not a member? <Text style={registrationStyle.loginButton}>Register</Text></Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </ScrollView>
            </Container>
      </Root>
    );
  }
}


  
  export default Login;
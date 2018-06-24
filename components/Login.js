
import React, { Component } from 'react';
import {  NetInfo, Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, Image,ToastAndroid, NavigationActions  } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon } from 'native-base';
import firebase from 'react-native-firebase';
import Geocoder from 'react-native-geocoder';
import { connect } from 'react-redux';
import { saveLocationOffline, saveLocationOnline  } from '../actions/locationActions' ;
import HomePlaces from './places/HomePlaces';
import Loader from './shared/Loader';
var userDetails = require('./shared/userDetails');
var registrationStyle = require('../assets/style/Registration');


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            email: 'francel_aquino@yahoo.com',
            password:'111111',
            
        };
       

      }
      
    trackLocation(){
    let self=this;
    navigator.geolocation.getCurrentPosition(
      (position) => {
      
            let coords = {
                lat: position.coords.latitude,
                lng:  position.coords.longitude,
                dateadded : Date.now()
              };
              self.props.saveLocationOnline(coords);
              this.props.navigation.navigate('HomePlaces');

         
      },
      (err) => {
        this.setState({loading:false})
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
        this.setState({loading:true});
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email,this.state.password).then((res)=>{
          let memberRef = firebase.database().ref().child('users/'+res.user.uid).on('value',function(snapshot){
            
              userDetails.userid=res.user.uid;
              userDetails.email=snapshot.val().email;
              userDetails.firstname=snapshot.val().firstname;
              userDetails.lastname=snapshot.val().lastname;
              self.trackLocation();

            });
         
        }).catch(function(e){
            
            self.setState({
                loading:false,
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
        	   
          	<Loader loading={this.state.loading} />
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
                            name="password" autoCorrect={false} secureTextEntry
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
                            <TouchableOpacity underlayColor={'transparent'}>
                            <Text style={registrationStyle.haveaccount}>Forgot Password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  underlayColor={'transparent'}  onPress={() =>navigate('Register')}>
                            <Text style={registrationStyle.haveaccount}>Not a member? <Text style={registrationStyle.loginButton}>Register</Text></Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </Container>
      </Root>
    );
  }
}


  
const mapStateToProps = state => ({
    
  })
  
  
  
  Login=connect(mapStateToProps,{saveLocationOffline,saveLocationOnline})(Login);
  
export default Login;

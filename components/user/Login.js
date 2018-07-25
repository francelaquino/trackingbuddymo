
import React, { Component } from 'react';
import {  NetInfo, Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, Image,ToastAndroid, NavigationActions  } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon } from 'native-base';
import firebase from 'react-native-firebase';
import Geocoder from 'react-native-geocoder';
import { connect } from 'react-redux';
import { saveLocationOffline, saveLocationOnline  } from '../../actions/locationActions' ;
import {  userLogin } from '../../actions/userActions' ;
import Loader from '../shared/Loader';
var registrationStyle = require('../../assets/style/Registration');


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            email: 'francel_aquino@yahoo.com',
            password:'111111',
            
        };
       

      }
      
  
 

    onLogin(){
        
        let self=this;
        if(this.state.email=="" || this.state.password==""){
            ToastAndroid.showWithGravityAndOffset("Invalid username or wrong password",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50);
            return false;
        }
        this.setState({loading:true});
        this.props.userLogin(this.state.email,this.state.password).then(async (res)=>{
            setTimeout(() => {
                 this.props.saveLocationOnline();
                setTimeout(() => {
                
                    if(res==""){
                        this.setState({loading:false})
                        this.props.navigation.navigate('Home');
                    }else{
                        this.setState({loading:false})
                        ToastAndroid.showWithGravityAndOffset("Invalid username or bad password", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50 );
                    }
                }, 1000);
            }, 1000);

           

        }).catch(function(err) {
            self.setState({
                loading:false,
                email:'',
                password:'',
              });
              ToastAndroid.showWithGravityAndOffset("Invalid username or bad password", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50 );
        });

        

      
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
                        <Image  style={registrationStyle.logo} resizeMode='contain'  source={require('../../images/logo.png')} />
                        <Text style={{fontSize:22,color:'#303131'}}>Tracking Buddy</Text>
                        
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
                            <TouchableOpacity underlayColor={'transparent'}  onPress={() =>navigate('ForgotPassword')}>
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
  
  
  
  Login=connect(mapStateToProps,{saveLocationOffline,saveLocationOnline,userLogin})(Login);
  
export default Login;

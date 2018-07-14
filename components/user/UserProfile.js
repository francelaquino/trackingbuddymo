
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Alert, Image } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left, Right, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import {  getProfile } from '../../actions/userActions' ;
import { NavigationActions } from 'react-navigation'
import Loading  from '../shared/Loading';
var globalStyle = require('../../assets/style/GlobalStyle');



class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
      }

      
    componentWillMount() {
        this.props.getProfile();
    }

    
    loading(){
        return (
            
          <Loading/>
        )
    }
   

    ready(){
        return (
            
            <View style={globalStyle.container}>
            <View style={{marginTop:20}}>
                <View style={globalStyle.avatarContainer}>
                    <Image style={globalStyle.avatarBig} source={{uri : this.props.profile.avatar}} />
                </View>
            </View>
            
                    <List>
                        <ListItem >
                        <Body>
                        <Text style={globalStyle.label}>First Name</Text>
                        <Text style={globalStyle.value} note>{this.props.profile.firstname}</Text>
                        </Body>
                        </ListItem>
                        <ListItem >
                        <Body>
                        <Text style={globalStyle.label}>Middle Name</Text>
                        <Text style={globalStyle.value} note>{this.props.profile.middlename}</Text>
                        </Body>
                        </ListItem>
                        <ListItem >
                        <Body>
                        <Text style={globalStyle.label}>Last Name</Text>
                        <Text style={globalStyle.value} note>{this.props.profile.lastname}</Text>
                        </Body>
                        </ListItem>
                        <ListItem >
                        <Body>
                        <Text style={globalStyle.label}>Mobile No.</Text>
                        <Text style={globalStyle.value} note>{this.props.profile.mobileno}</Text>
                        </Body>
                        </ListItem>
                        <ListItem >
                        <Body>
                        <Text style={globalStyle.label}>Email</Text>
                        <Text style={globalStyle.value} note>{this.props.profile.email}</Text>
                        </Body>
                        </ListItem>
                            
                        <ListItem last>
                        <Button 
                        bordered light full rounded style={globalStyle.secondaryButton}>
                        <Text style={{color:'white'}}>Update Profile</Text>
                        </Button>
                        </ListItem>
                        </List>
                </View>
        )
    }
    render() {
        if(this.props.isLoading){
            return this.loading();
        }else{
            return this.ready();
        }
    }

}


const mapStateToProps = state => ({
    profile: state.fetchUser.profile,
    isLoading:state.fetchUser.isLoading,
  })
  
  
  UserProfile=connect(mapStateToProps,{getProfile})(UserProfile);
  
export default UserProfile;
  


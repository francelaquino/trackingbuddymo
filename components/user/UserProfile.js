
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

   


    confirmDelete(){
        Alert.alert(
            'Comfirm Delete',
            'Are you sure you want to delete the member?',
            [
              
              {text: 'Yes', onPress: () => this.onDelete()},
              {text: 'No', style: 'cancel'},
            ],
            { cancelable: true }
          )
    }

    loading(){
        return (
          <Root>
          <Container style={globalStyle.containerWrapper}>
          <Loading/>
          </Container>
          </Root>
        )
    }
   

    ready(){
        return (
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header} >
                        <Left style={globalStyle.headerLeft} >
                        <Button transparent onPress={()=> {this.props.navigation.dispatch(NavigationActions.back())}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
                        <Body>
                            <Title>Profile</Title>
                        </Body>
                        
                    </Header>
                    
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={globalStyle.container}>
                        <View style={{marginTop:20}}>
                        <View style={globalStyle.avatarContainer}>
                            <Image style={globalStyle.avatarBig} source={{uri : this.props.profile.avatar}} />
                        </View>
                        </View>

                        <List >
                        <View >
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
                            </View>
                        </List>
                        </View>
                    </ScrollView>
                            
                    
                </Container>
        </Root>
        );
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
  




import React, { Component } from 'react';
import { TouchableOpacity, Platform,  StyleSheet,  Text,  View,Image } from 'react-native';
import { Root,Content,Drawer,Container ,List , ListItem, Right, Body,Left,Icon, Thumbnail} from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import firebase from 'react-native-firebase';
var globalStyle = require('../../assets/style/GlobalStyle');
var userdetails = require('../shared/userDetails');

type Props = {};

export default class LeftDrawer extends Component<Props> {

    constructor(props) {
        super(props)
        this.state={
            emptyPhoto:'https://firebasestorage.googleapis.com/v0/b/trackingbuddy-3bebd.appspot.com/o/member_photos%2Ficons8-person-80.png?alt=media&token=59864ce7-cf1c-4c5e-a07d-76c286a2171d',
        }
      }
  displayMember(){
    this.props.navigation.navigate('DisplayMember',{closeDrawer:this.props.closeDrawer()});
    this.props.closeDrawer();
  }
  displayGroup(){
    this.props.navigation.navigate('DisplayGroup');
    this.props.closeDrawer();
  }
  displayHome(){
    this.props.navigation.navigate('HomePlaces');
    this.props.closeDrawer();
  }
  displayPlaces(){
    this.props.navigation.navigate('PlaceList');
    this.props.closeDrawer();
  }
  displayProfile(){
    this.props.navigation.navigate('ProfileHome',{id:userdetails.userid});
    this.props.closeDrawer();
  }
  displaySettings(){
    this.props.navigation.navigate('HomeSettings');
    this.props.closeDrawer();
  }
  displayLogout(){
    firebase.auth().signOut();
    this.props.navigation.navigate('Login');
    this.props.closeDrawer();
  }
  render() {
    const navigation = this.props.navigation;    
    return (
                <Container > 
                    <Content style={{backgroundColor:'rgba(50, 50, 50, 0.9)',height:'100%'}}>
                        <View style={{height:55,borderBottomWidth:1,borderBottomColor:'#b7b8b8',alignItems:'center',flex:1}} >
                        <Text style={{width:'100%',fontSize:17,color:'white', textAlign:'center',marginTop:15}}>TRACKING BUDDY</Text>
                        </View>
                    
                        <List>
                        
                            <ListItem icon style={{marginBottom:5}}>
                            <Left>
                                <SimpleLineIcons style={{fontSize:30,width:30,color:'#c8c8c8'}} name="home" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                                
                                <TouchableOpacity  onPress={() =>this.displayHome()}>
                                <Text style={{fontSize:16,color:'white'}}>HOME</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            <ListItem icon style={{marginBottom:5}}>
                            <Left>
                                <SimpleLineIcons style={{fontSize:30,width:30,color:'#c8c8c8'}} name="user" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                            <TouchableOpacity  onPress={() =>this.displayProfile()}>
                                <Text style={{fontSize:16,color:'white'}}>PROFILE</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                           
                            <ListItem icon style={{marginBottom:5}}>
                            <Left>
                                <SimpleLineIcons style={{fontSize:30,width:30,color:'#c8c8c8'}} name="people" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                                <TouchableOpacity  onPress={() =>this.displayMember()}>
                                <Text style={{fontSize:16,color:'white'}}>MEMBER</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            <ListItem icon style={{marginBottom:5}}>
                            <Left>
                                <SimpleLineIcons style={{fontSize:30,width:30,color:'#c8c8c8'}} name="organization" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                            <TouchableOpacity  onPress={() =>this.displayGroup()}>
                                <Text style={{fontSize:16,color:'white'}}>GROUP</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            <ListItem icon style={{borderBottomWidth:1,borderBottomColor:'rgba(200, 200, 200, 0.5)'}}>
                            <Left>
                            <SimpleLineIcons  style={{fontSize:30,width:30,color:'#c8c8c8'}} name="location-pin"/>
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                            <TouchableOpacity  onPress={() =>this.displayPlaces()}>
                                <Text style={{fontSize:16,color:'white'}}>PLACES</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            
                            <ListItem icon style={{borderBottomWidth:1,borderBottomColor:'rgba(200, 200, 200, 0.5)'}}>
                            <Left>
                                <SimpleLineIcons style={{fontSize:30,width:30,color:'#c8c8c8'}} name="settings" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                                <TouchableOpacity  onPress={() =>this.displaySettings()}>
                                    <Text style={{fontSize:16,color:'white'}}>SETTINGS</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            <ListItem icon style={{borderBottomWidth:1,borderBottomColor:'rgba(200, 200, 200, 0.5)'}}>
                            <Left>
                                <SimpleLineIcons style={{fontSize:30,width:30,color:'#c8c8c8'}} name="info" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                                
                                <TouchableOpacity  onPress={() =>this.displayHome()}>
                                <Text style={{fontSize:16,color:'white'}}>ABOUT</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            <ListItem icon style={{marginBottom:5}}>
                            <Left>
                                <SimpleLineIcons style={{fontSize:30,width:25,color:'#c8c8c8'}} name="logout" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                            <TouchableOpacity  onPress={() =>this.displayLogout()}>
                                    <Text style={{fontSize:16,color:'white'}}>LOGOUT</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                        </List>
                    </Content>      
                </Container>
    );
  }
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
  
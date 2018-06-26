

import React, { Component } from 'react';
import { TouchableOpacity, Platform,  StyleSheet,  Text,  View,Image } from 'react-native';
import { Root,Content,Drawer,Container ,List , ListItem, Right, Body,Left,Icon} from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
  displayProfile(){
    this.props.navigation.navigate('UserProfile');
    this.props.closeDrawer();
  }
  displaySettings(){
    this.props.navigation.navigate('HomeSettings');
    this.props.closeDrawer();
  }
  displayLogout(){
    this.props.navigation.navigate('Login');
    this.props.closeDrawer();
  }
  render() {
    const navigation = this.props.navigation;    
    return (
                <Container > 
                    <Content style={{backgroundColor:'white',height:'100%'}}>
                    <View style={{height:140,padding:15}} >
                                <View style={globalStyle.avatarContainer}>
                                <Image style={globalStyle.avatarBig} source={{uri : this.state.emptyPhoto}} />
                                </View>
                                <Text style={{width:'100%',fontSize:17,height:30,color:'white', textAlign: 'center',marginBottom:20 }}>{userdetails.firstname}</Text>
                            </View>
                    
                        <List>
                            <ListItem icon>
                            <Left>
                                <FontAwesome style={{fontSize:20,width:25}} name="home" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                                
                                <TouchableOpacity  onPress={() =>this.displayHome()}>
                                <Text style={{fontSize:16}}>Home</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            <ListItem icon>
                            <Left>
                                <FontAwesome style={{fontSize:20,width:25}} name="user" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                            <TouchableOpacity  onPress={() =>this.displayProfile()}>
                                <Text style={{fontSize:16}}>Profile</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                           
                            <ListItem icon>
                            <Left>
                                <MaterialIcons style={{fontSize:25,width:25}} name="group" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                                <TouchableOpacity  onPress={() =>this.displayMember()}>
                                <Text style={{fontSize:16}}>Member</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            <ListItem icon>
                            <Left>
                                <FontAwesome style={{fontSize:19,width:25}} name="group" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                            <TouchableOpacity  onPress={() =>this.displayGroup()}>
                                <Text style={{fontSize:16}}>Group</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            <ListItem icon>
                            <Left>
                            <Entypo  style={{fontSize:19,width:25}} name="location"/>
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                            <TouchableOpacity  onPress={() =>this.displayGroup()}>
                                <Text style={{fontSize:16}}>Locations</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            <ListItem icon>
                            <Left>
                                
                                <MaterialIcons style={{fontSize:20,width:25}} name="location-on" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                                <Text style={{fontSize:16}}>Places</Text>
                            </Body>
                            </ListItem>
                            <ListItem icon>
                            <Left>
                                <MaterialIcons style={{fontSize:20,width:25}} name="settings" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                                <TouchableOpacity  onPress={() =>this.displaySettings()}>
                                    <Text style={{fontSize:16}}>Settings</Text>
                                </TouchableOpacity>
                            </Body>
                            </ListItem>
                            <ListItem icon>
                            <Left>
                                <FontAwesome style={{fontSize:20,width:25}} name="sign-out" />
                            </Left>
                            <Body style={{width:'100%',borderBottomWidth:0}} >
                            <TouchableOpacity  onPress={() =>this.displayLogout()}>
                                    <Text style={{fontSize:16}}>Logout</Text>
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
  
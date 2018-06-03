
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left, Right } from 'native-base';
import firebase from 'react-native-firebase';
import moment from 'moment';
var globalStyle = require('../../assets/style/GlobalStyle');
var userdetails = require('../shared/userDetails');


class GenerateInviteCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            invitationcode:'',
            expiration:'',
        };
      }

    componentWillMount() {
        this.initialize();
    }
            
    initialize(){
        let userRef = firebase.database().ref().child('users/'+userdetails.userid);
        userRef.once('value', (snapshot) => {
            let expiration= moment(new Date(parseInt(snapshot.val().invitationcodeexpiration))).format("DD-MMM-YYYY");
           this.setState({ invitationcode: snapshot.val().invitationcode,expiration : expiration,isLoading:false})
        })
        .catch(function(err) {
            console.log('error', err);
          });

       

        
    }
    onGenerate(){
        this.setState({
            isLoading:true,
        })
        var code = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for(var i = 0; i < 7; i++) {
            code += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        

        let groupRef = firebase.database().ref().child("users/"+userdetails.userid);
        groupRef.update({ 
                invitationcode : code,
                avatar: this.state.avatar,
                invitationcodeexpiration: Date.now()+5,
        })
        .catch(function(err) {
            console.log('error', err);
        });

        this.initialize();
       

    }

    loading(){
        return (
          <Root>
          <Container style={globalStyle.containerWrapper}>
          <View>
              <Text>Loading</Text>
          </View>
          </Container>
          </Root>
        )
    }
    ready(){
        return (
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header}>
                        <Left style={globalStyle.headerLeft} >
                            <Button transparent onPress={()=> {this.props.navigation.goBack()}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
                        <Body>
                            <Title>Invitation Code</Title>
                        </Body>
                    </Header>
                
                    <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyle.container}>
                        { this.state.invitationcode !='' &&
                                    <View>
                                    <Text style={{justifyContent: 'center',alignItems: 'center', alignSelf: "center", flexDirection:'column',fontSize:40,marginBottom:2,color:'green'}}>{this.state.invitationcode}</Text>
                                    <Text style={{justifyContent: 'center',alignItems: 'center', alignSelf: "center", flexDirection:'column',fontSize:12,marginBottom:10,color:'gray'}}>Expires on {this.state.expiration}</Text>
                                    </View>
                        }
                            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                <Button 
                                    onPress={()=>this.onGenerate()}
                                    bordered light full rounded style={globalStyle.secondaryButton}>
                                    <Text style={{color:'white'}}>Generate Code</Text>
                                </Button>
                            </View>

                        </View>
                    </ScrollView>
                </Container>
        </Root>
        )
    }
    

    render() {
        if(this.state.isLoading){
            return this.loading();
        }else{
            return this.ready();
        }
    }
}


export default GenerateInviteCode;

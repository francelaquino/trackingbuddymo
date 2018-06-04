
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left, Right } from 'native-base';
import firebase from 'react-native-firebase';
var globalStyle = require('../../assets/style/GlobalStyle');
var userdetails = require('../shared/userDetails');


class NewInvite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:true,
            parentReload:false,
            invitationcode:'3DG73I3',
        };
      }
    
    componentWillMount() {
        this.initialize();
    }
            
    initialize(){
        this.setState({
            isLoading:false,
        })
    }
    
    goBack(){
        if(this.state.parentReload==true){
            this.props.navigation.state.params.onReload();
            this.setState({parentReload:false})
        }
        this.props.navigation.goBack();
    }  
    onSubmit(){
        if(this.state.invitationcode==""){
            return false;
        }
        firebase.database().ref().child("users").orderByChild("invitationcode").equalTo(this.state.invitationcode).once("value",snapshot => {
            let id="";
            let parent=this;
            snapshot.forEach(function(childSnapshot) {
                id = childSnapshot.key;
                let userRef = firebase.database().ref().child("members/"+userdetails.userid+"/"+id);
                userRef.set({ 
                    id : id,
                    dateadded: Date.now(),
                }).catch(function(err) {
                    console.log('error', err);
                });
                parent.setState({parentReload:true});
                ToastAndroid.showWithGravityAndOffset("Member successfully added",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
                parent.setState({invitationcode:""});
              
                
            });
            if(id==""){
                ToastAndroid.showWithGravityAndOffset("Invalid invidation code",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
            }

        }).catch(function(err) {
            console.log('error', err);
        });

       
  

       
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
                            <Button transparent onPress={()=> {this.goBack()}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
                        <Body>
                            <Title>Invitation</Title>
                        </Body>
                    </Header>
                
                    <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyle.container}>
                            <Item  stackedLabel style={globalStyle.item}>
                                <View style={globalStyle.inputicon}>  
                                <TextInput style={globalStyle.textinputCenter} 
                                name="invitationcode" autoCorrect={false}
                                value={this.state.invitationcode}  maxLength = {20}
                                onChangeText={invitationcode=>this.setState({invitationcode})}/>
                                </View>
                            </Item>
                            

                            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                <Button disabled={!this.state.invitationcode}
                                    onPress={()=>this.onSubmit()}
                                    bordered light full rounded style={this.state.invitationcode ? globalStyle.secondaryButton : globalStyle.secondaryButtonDisabled}>
                                    <Text style={{color:'white'}}>Send Invitation</Text>
                                </Button>
                            </View>

                        </View>
                    </ScrollView>
                </Container>
        </Root>
        );
    }
    render() {
        if(this.state.isLoading){
            return this.loading();
        }else{
            return this.ready();
        }
    }
}


  
export default NewInvite;

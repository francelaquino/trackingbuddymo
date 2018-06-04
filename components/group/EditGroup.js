
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Alert, Image } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
var globalStyle = require('../../assets/style/GlobalStyle');
var registrationStyle = require('../../assets/style/Registration');
var userdetails = require('../shared/userDetails');

class EditGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            emptyPhoto:'https://firebasestorage.googleapis.com/v0/b/trackingbuddy-3bebd.appspot.com/o/group_photos%2Fgroup.png?alt=media&token=d1bade4b-6fee-43f7-829a-0b6f76005b40',
            groupNameOld:'',
            groupname:'',
            avatarsource:'',
            isPhotoChange:false,
            avatar:'',
            groupid:''
        };
      }

    componentWillMount() {
        this.initialize();
    }
            
    initialize(){
        this.setState({
            avatarsource:{uri :this.props.navigation.state.params.avatar},
            groupNameOld:this.props.navigation.state.params.groupname,
            groupname:this.props.navigation.state.params.groupname,
            groupid:this.props.navigation.state.params.id,
            isLoading:false,
        })
    }
    removePhoto(){
		this.setState({
            avatarsource:{uri:''},
            isPhotoChange:false,
        });
    }
    

    selectPhoto() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
          }
          else if (response.error) {
          }
          else if (response.customButton) {
          }
          else {
            let source = { uri: response.uri };
            
            this.setState({
              avatarsource: source,
              isPhotoChange : true
            });
          }
        });
      }
          
    confirmDelete(){
        Alert.alert(
            'Comfirm Delete',
            'Are you sure you want to delete the group?',
            [
              
              {text: 'Yes', onPress: () => this.onDelete()},
              {text: 'No', style: 'cancel'},
            ],
            { cancelable: true }
          )
    }
    onDelete(){

        let groupRef=firebase.database().ref().child("groups/"+userdetails.userid+"/"+this.state.groupid);

        groupRef.remove()
        .catch(function(err) {
            console.log('error', err);
          });
        
        let avatarlink=this.state.groupid+".jpg";

        let ref = firebase.storage().ref("/group_photos/"+avatarlink);
        ref.delete().then(res => {
        })
        .catch(function(err) {
              console.log('error', err);
        });

        this.props.navigation.goBack()
        ToastAndroid.showWithGravityAndOffset("Group successfully deleted",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);

        
    }
    removePhoto(){
        this.setState({avatarsource:''})
    }
    onUpdate(){
        
        if(this.state.groupname==""){
            return false;
        }

        firebase.database().ref().child("groups/"+userdetails.userid).orderByChild("groupname").equalTo(this.state.groupname).once("value",snapshot => {
            let key="";
            snapshot.forEach(function(childSnapshot) {
                key =childSnapshot.key;
            });
            if(key==this.state.groupid || key==""){
                if(this.state.isPhotoChange==true){
                    let avatarlink=this.state.groupid+".jpg";
                    const ref = firebase.storage().ref("/group_photos/"+avatarlink);
                    ref.putFile(this.state.avatarsource.uri.replace("file:/", "")).then(res => {
                        this.setState({avatar:res.downloadURL })
                        setTimeout(() => {
                            this.sendSubmit(this.state.groupid);
                        }, 0);
                    })
                    .catch(function(err) {
                        console.log('error', err);
                      });
                }else{
                    if(this.state.avatarsource.uri=="" || this.state.avatarsource.uri==undefined){
                        this.setState({avatar:this.state.emptyPhoto });
                    }else{
                        this.setState({avatar:this.state.avatarsource.uri });
                    }
                    
                    setTimeout(() => {
                        this.sendSubmit(this.state.groupid);
                    }, 0);
                }
             }else{
                ToastAndroid.showWithGravityAndOffset("Group already exist",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
             }
           
        }).catch(function(err) {
            console.log('error', err);
            
        });

        
            


        
    }

    sendSubmit(groupid){
        let groupRef = firebase.database().ref().child("groups/"+userdetails.userid+"/"+groupid);
        groupRef.update({ 
                groupname : this.state.groupname,
                avatar: this.state.avatar,
                dateupdated: Date.now(),
        })
        .catch(function(err) {
            console.log('error', err);
          });
          this.props.navigation.goBack();
        ToastAndroid.showWithGravityAndOffset("Group successfully updated",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
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

        return(
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header}>
                        <Left style={globalStyle.headerLeft} >
                            <Button transparent onPress={()=> {this.props.navigation.goBack()}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
                        <Body>
                            <Title>{this.state.groupNameOld}</Title>
                        </Body>
                    </Header>
                
                    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyle.container}>
                        <TouchableOpacity style={{marginTop:20}} onPress={this.selectPhoto.bind(this)}>
                            <View style={globalStyle.avatarContainer}>
                            { this.state.avatarsource === '' ? <Image style={globalStyle.avatarBig} source={{uri : this.state.emptyPhoto}} />  :
                                <Image style={globalStyle.avatarBig} source={this.state.avatarsource} />
                                }
                            </View>
                            </TouchableOpacity>
                            { (this.state.avatarsource != '' && this.state.avatarsource.uri!=this.state.emptyPhoto) &&
														<TouchableOpacity   onPress={this.removePhoto.bind(this)}>
														<Text style={globalStyle.deleteButtonSmall} >Remove Photo</Text>
														</TouchableOpacity>
														}
                            <Item  stackedLabel style={globalStyle.item}>
                                <View style={globalStyle.inputicon}>  
                                <TextInput style={globalStyle.textinputCenter} 
                                name="groupname" autoCorrect={false}
                                value={this.state.groupname}  maxLength = {20}
                                onChangeText={groupname=>this.setState({groupname})}/>
                                </View>
                            </Item>
                            

                            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                                <Button disabled={!this.state.groupname} style={this.state.groupname ? globalStyle.secondaryButton : globalStyle.secondaryButtonDisabled}
                                    onPress={()=>this.onUpdate()}
                                    bordered light full rounded >
                                    <Text style={{color:'white'}}>Update Group</Text>
                                </Button>


                                
                                <Button 
                                    onPress={()=>this.confirmDelete()}
                                    bordered light full rounded style={globalStyle.deleteButton}>
                                    <Text style={{color:'white'}}>Delete Group</Text>
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


  
  
export default EditGroup;

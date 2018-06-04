
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
var userdetails = require('../shared/userDetails');
var globalStyle = require('../../assets/style/GlobalStyle');
var registrationStyle = require('../../assets/style/Registration');



class CreateGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
						isLoading:true,
						emptyPhoto:'https://firebasestorage.googleapis.com/v0/b/trackingbuddy-3bebd.appspot.com/o/group_photos%2Fgroup.png?alt=media&token=d1bade4b-6fee-43f7-829a-0b6f76005b40',
            groupname:'',
						avatarsource:'',
						avatar:'',
        };
      }

	
	
	componentWillMount() {
    this.initialize();
	}
	
	initialize(){
		this.setState({isLoading:false});
	}
	
	removePhoto(){
		this.setState({avatarsource:''});
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
			console.log(response)
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else if (response.customButton) {
      }
      else {
        let source = { uri: response.uri };
                
        this.setState({
          avatarsource: source
        });
      }
    });
  }
	randomString(length) {  
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
	}

    onSubmit(){
			
		
		
        if(this.state.groupname==""){
            return false;
				}
				
				firebase.database().ref().child("groups/"+userdetails.userid).orderByChild("groupname").equalTo(this.state.groupname).once("value",snapshot => {
					if (snapshot.val()){
						ToastAndroid.showWithGravityAndOffset("Group already exist",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
					}else{
						let groupid=userdetails.userid+this.randomString(4);
						if(this.state.avatarsource!=""){
							let avatarlink=groupid+".jpg";
							let ref = firebase.storage().ref("/group_photos/"+avatarlink);
							ref.putFile(this.state.avatarsource.uri.replace("file:/", "")).then(res => {
								this.setState({avatar:res.downloadURL })
								setTimeout(() => {
										this.sendSubmit(groupid);
								}, 0);
							})
							.catch(function(err) {
								console.log('error', err);
								
							});
						}else{
							this.setState({avatar: this.state.emptyPhoto});
							setTimeout(() => {
								this.sendSubmit(groupid);
							}, 0);
						}
					}
				}).catch(function(err) {
					console.log('error', err);
					
				});
			
				
          
      
    }

    sendSubmit(groupid){
			let groupRef = firebase.database().ref().child("groups/"+userdetails.userid+"/"+groupid);

			groupRef.set({ 
							id:groupid,
							groupname : this.state.groupname,
							avatar: this.state.avatar,
							datecreated: Date.now(),
							dateupdated: Date.now(),
			})
			.catch(function(err) {
					console.log('error', err);
				});
				this.props.navigation.goBack();
			ToastAndroid.showWithGravityAndOffset("Group successfully created",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
    }

	loading(){
	  return (
		<Root>
		<Container style={registrationStyle.containerWrapper}>
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
                            <Title>Create Group</Title>
                        </Body>
                    </Header>
                
                    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                        <View style={globalStyle.container}>
                            <TouchableOpacity style={{marginTop:20}} onPress={this.selectPhoto.bind(this)}>
                                <View style={globalStyle.avatarContainer}>
                                { this.state.avatarsource === '' ? <Image style={globalStyle.avatarBig} source={{uri :this.state.emptyPhoto}} />  :
                                <Image style={globalStyle.avatarBig} source={this.state.avatarsource} />
                                }
                                
                                </View>
                            </TouchableOpacity>
														{ this.state.avatarsource != '' &&
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
                                    onPress={()=>this.onSubmit()}
                                    bordered light full rounded >
                                    <Text style={{color:'white'}}>Create Group</Text>
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


  
  
export default CreateGroup;

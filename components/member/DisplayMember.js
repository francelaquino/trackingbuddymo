
import React, { Component } from 'react';
import { Modal,TouchableHighlight, Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image, Alert,RefreshControl } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch, Thumbnail, CardItem, Card } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import firebase from 'react-native-firebase';
import { LeftHome } from '../shared/LeftHome';
import Loading  from '../shared/Loading';
var userdetails = require('../shared/userDetails');
var globalStyle = require('../../assets/style/GlobalStyle');



class DisplayMember extends Component {
    constructor(props) {
        super(props)
        this.state={
            isLoading:true,
            modalVisible: false,
            memberid:'',
            emptyPhoto:'https://firebasestorage.googleapis.com/v0/b/trackingbuddy-3bebd.appspot.com/o/member_photos%2Ficons8-person-80.png?alt=media&token=59864ce7-cf1c-4c5e-a07d-76c286a2171d',
            members:{
                id:'',
                firstname:'',
                avatar:'',
            }
        }
      }

    openMemberOption(memberid){
        this.setState({memberid:memberid})
        this.setModalVisible(true)
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    componentWillMount() {
         this.setState({isLoading:false})
        this.initialize();
    }
    onReload = () => {
        this.setState({isLoading:true})
        this.initialize();
      }
   
    initialize(){
        let members=[]

        this.setState({members: members});


        let parent=this;

        return parentPromise= new Promise((resolve,reject)=>{
            let memberRef = firebase.database().ref().child('users/'+userdetails.userid+"/members").on('value',function(snapshot){
                resolve(snapshot)
            })
            }).then(function(snapshot){
                if(snapshot.val()===null){
                }else{
                    snapshot.forEach(childSnapshot => {
                        let userid=childSnapshot.key;
                        return childPromise= new Promise((resolve,reject)=>{
                            let childRef= firebase.database().ref().child('users/'+userid).once("value",function(snapshot){
                                if(snapshot.val() !== null){
                                    members.push({
                                        id:snapshot.key,
                                        firstname:snapshot.val().firstname,
                                        avatar: snapshot.val().avatar,
                                    });
                                }
                                resolve(snapshot);
                            })
                        }).then(function(){
                            parent.setState({members: members,isLoading:false});
                        })
                    })
                }
            
        })


        
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
    onDelete(){
        let memberRef=firebase.database().ref().child("users/"+userdetails.userid+"/members/"+this.state.memberid);

        memberRef.remove()
        .catch(function(err) {
            console.log('error', err);
          });
        this.initialize()
        this.setModalVisible(false)
        ToastAndroid.showWithGravityAndOffset("Member successfully deleted",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
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
        const members =this.state.members.map(member=>(
                            <ListItem key={member.id}  avatar style={globalStyle.listItem}>
                            <Left style={globalStyle.listLeft}>
                               
                                <View style={globalStyle.listAvatarContainer} >
                                { member.avatar==='' ?  <Thumbnail  style={globalStyle.listAvatar} source={{uri: this.state.emptyPhoto}} /> :
                                <Thumbnail  style={globalStyle.listAvatar} source={{uri: member.avatar}} />
                                }
                                </View>
                            </Left>
                            <Body style={globalStyle.listBody} >
                                <Text style={globalStyle.listHeading}>{member.firstname}</Text>
                            </Body>
                            <Right style={globalStyle.listRight} >
                                <TouchableHighlight  style={globalStyle.listRightTouchable}  
                                    onPress={() => {
                                    this.openMemberOption(member.id);
                                    }}>
                                <MaterialCommunityIcons  style={globalStyle.listRightOptionIcon}   name='dots-vertical' />
                                </TouchableHighlight>
                            </Right>
                            </ListItem>
          ));

        return (
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header}>
                        <Left style={globalStyle.headerLeft} >
                            <Button transparent onPress={()=> {this.props.navigation.goBack()}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
                        <Body >
                            <Title>Members</Title>
                        </Body>
                        <Right  >
                            <Button transparent onPress={() => this.props.navigation.navigate("NewInvite",{onReload : this.onReload})}>
                                <Ionicons style={{color:'white',fontSize:25}}  name='md-person-add' />
                            </Button> 
                            
                            
                        </Right>
                    </Header>
                    <Content padder>
                        <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}
                          >
                            <View style={globalStyle.container}>
                            <List   >
                                {members}
                                </List  >
                            </View>
                        </ScrollView>
                    </Content>
                    <Modal 
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={globalStyle.modalWrapper} >
                            <View style={[globalStyle.modalContainer,{height:220}]} >
                                <List>
                                    <ListItem avatar onPress={()=>this.openMembers()} 
                                    style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                        <MaterialIcons style={[globalStyle.avatarIcon],{fontSize:35}} name="message"/>
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Message</Text>
                                    </Body>
                                    </ListItem>
                                    <ListItem avatar onPress={()=>this.openMembers()} 
                                    style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                        <MaterialIcons style={[globalStyle.avatarIcon],{fontSize:35}} name="location-on"/>
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Places</Text>
                                    </Body>
                                    </ListItem>
                                    <ListItem avatar onPress={()=>this.confirmDelete()}  
                                     style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                        <MaterialIcons style={[globalStyle.avatarIcon],{fontSize:40}} name="delete"/>
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Delete Member</Text>
                                    </Body>
                                    </ListItem>
                                </List>

                                <TouchableHighlight 
                                    onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <View style={{alignItems:'center',flexDirection:'row'}}>
                                    <Right><Text style={globalStyle.modalCancel} >CANCEL</Text></Right>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        </Modal>
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



  
export default DisplayMember;
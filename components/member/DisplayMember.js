
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image, Alert,RefreshControl } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch, Thumbnail, CardItem, Card } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
            emptyPhoto:'https://firebasestorage.googleapis.com/v0/b/trackingbuddy-3bebd.appspot.com/o/member_photos%2Ficons8-person-80.png?alt=media&token=59864ce7-cf1c-4c5e-a07d-76c286a2171d',
            members:{
                id:'',
                firstname:'',
                avatar:'',
            }
        }
      }

    
    componentWillMount() {
        this.initialize();
    }
   
   
    initialize(){
        let members=[]
        let parent=this;
        return mypromise= new Promise((resolve,reject)=>{
            let memberarr=[]
            let memberRef = firebase.database().ref().child('members/'+userdetails.userid).on('value',function(snapshot){
                if(snapshot.val()===null){
                    resolve(memberarr)
                }else{
                    snapshot.forEach(childSnapshot => {
                        let userid=childSnapshot.val().id;
                        memberarr.push({
                        userid:userid
                        })
                        
                        });
                        resolve(memberarr)
                    }
                        
            
               
            });
            
        }).then(function(response){
            if(response.length<=0){
                parent.setState({members: [],isLoading:false});
            }else{
                response.forEach(data => {
                    return mypromise1= new Promise((resolve,reject)=>{
                        let memberarr=[]
                        let childRef= firebase.database().ref().child('users/'+data.userid).once("value",function(snapshot){
                            if(snapshot.val() !== null){
                                members.push({
                                    id:snapshot.key,
                                    firstname:snapshot.val().firstname,
                                    avatar: snapshot.val().avatar,
                                });
                            }
                            resolve()
                        })
                    }).then(function(){
                        parent.setState({members: members,isLoading:false});
                    
                    })
                });
            }
           
        })
        
    }
   
    confirmDelete(memberid){
        Alert.alert(
            'Comfirm Delete',
            'Are you sure you want to delete the member?',
            [
              
              {text: 'Yes', onPress: () => this.onDelete(memberid)},
              {text: 'No', style: 'cancel'},
            ],
            { cancelable: true }
          )
    }
    onDelete(memberid){
        console.log(memberid)
        let memberRef=firebase.database().ref().child("members/"+userdetails.userid+"/"+memberid);

        memberRef.remove()
        .catch(function(err) {
            console.log('error', err);
          });
        this.initialize()
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
            
            <Card key={member.id}>
            <CardItem>
            <Left>
                <View style={globalStyle.avatarcontainer}> 
                    { member.avatar==='' ?  <Thumbnail  style={globalStyle.avatar} source={{uri: this.state.emptyPhoto}} /> :
                    <Thumbnail  style={globalStyle.avatar} source={{uri: member.avatar}} />
                    }
                    </View>
                    <Body style={{marginLeft:10}}>
                    <Text style={globalStyle.heading1}>{member.firstname}</Text>
                    <Text  style={globalStyle.font12}>Doing what you like will always keep you happy . .</Text>
                </Body>
            </Left>
            </CardItem>
            <CardItem style={globalStyle.cardNavFooter}>
            <Left>
            <Button transparent>
                <MaterialIcons style={globalStyle.navBarIcon} name="message"/>
                <Text style={globalStyle.font12}>Message</Text>
                </Button>
                <Button transparent>
                <MaterialIcons style={globalStyle.navBarIcon} name="place"/>
                <Text style={globalStyle.font12}>Places</Text>
                </Button>
                <Button transparent onPress={()=>this.confirmDelete(member.id)}>
                <MaterialIcons style={globalStyle.navBarIcon} name="delete"/>
                <Text style={globalStyle.font12}>Delete Member</Text>
                </Button>
            </Left>
            </CardItem>
            </Card>

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
                        <Body>
                            <Title>Members</Title>
                        </Body>
                        <Right  >
                            <Button transparent onPress={() =>this.props.navigation.navigate('NewInvite',{onReload : this.onReload})}>
                                <Icon  style={{color:'white',fontSize:30}} name='md-person-add' />
                            </Button> 
                            
                        </Right>
                    </Header>
                    <Content padder>
                        <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}
                          >
                            <View style={globalStyle.container}>
                                {members}
                            </View>
                        </ScrollView>
                    </Content>
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
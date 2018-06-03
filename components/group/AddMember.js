
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image, Alert,RefreshControl } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,CheckBox, Thumbnail, CardItem, Card } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
import { LeftHome } from '../shared/LeftHome';
import Loading  from '../shared/Loading';
var userdetails = require('../shared/userDetails');
var globalStyle = require('../../assets/style/GlobalStyle');



class AddMember extends Component {
    constructor(props) {
        super(props)
        this.state={
            isLoading:true,
            emptyPhoto:'https://firebasestorage.googleapis.com/v0/b/trackingbuddy-3bebd.appspot.com/o/member_photos%2Ficons8-person-80.png?alt=media&token=59864ce7-cf1c-4c5e-a07d-76c286a2171d',
            members:{
                id:'',
                firstname:'',
                avatar:'',
                selected:false,
            },
            groupname:'',
            groupid:'',
        }
      }

    
    componentWillMount() {
        
        this.initialize();
    }
   
    addSelectedMember(index){
        let mem = [...this.state.members];
        mem[index].selected = !mem[index].selected;
        this.setState({mem});
        if(mem[index].selected){
            let groupRef = firebase.database().ref().child("groupmembers/"+this.state.groupid+"/"+mem[index].id);
			groupRef.set({ 
							member : mem[index].id,
							dateadded: Date.now(),
			})
			.catch(function(err) {
					console.log('error', err);
                });
            }else{
                let groupRef = firebase.database().ref().child("groupmembers/"+this.state.groupid+"/"+mem[index].id);
                groupRef.remove({ 
                                member : mem[index].id,
                                dateadded: Date.now(),
                })
                .catch(function(err) {
                        console.log('error', err);
                    });
            }

    }
    
    initialize(){
       
        this.setState({
            groupname:this.props.navigation.state.params.groupname,
            groupid:this.props.navigation.state.params.id,
        })
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
                        let selected=false;

                        
                        let childRef= firebase.database().ref().child('users/'+data.userid).once("value",function(snapshot){
                            if(snapshot.val() !== null){
                                
                                return mypromise2= new Promise((resolve,reject)=>{
                                    firebase.database().ref().child('groupmembers/'+parent.state.groupid).orderByChild("member").equalTo(snapshot.key) .once("value",function(snapshot){
                                        if(snapshot.val()!==null){
                                            selected=true;
                                        }
                                        resolve();
                                    });
                                }).then(function(){
                                    
                                    members.push({
                                        id:snapshot.key,
                                        firstname:snapshot.val().firstname,
                                        avatar: snapshot.val().avatar,
                                        selected : selected,
                                    });
                                    resolve()
                                })



                                
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
        const members =this.state.members.map((member,index)=>
            
            <View  key={member.id} style={{marginBottom:10}}>
            <ListItem avatar button onPress={()=>this.addSelectedMember(index)} >
            <Left >
                <View style={globalStyle.avatarcontainersmall}> 
                    { member.avatar==='' ?  <Thumbnail  style={globalStyle.avatar} source={{uri: this.state.emptyPhoto}} /> :
                    <Thumbnail  style={globalStyle.avatarsmall} source={{uri: member.avatar}} />
                    }
                    </View>
            </Left>
            <Body style={{marginLeft:10}}>
                    <Text style={globalStyle.heading1}>{member.firstname}</Text>
                </Body>
            <Right >
                { member.selected ===true &&
                <Icon  style={{color:'#009da3'}} size={30} name="md-checkmark-circle" />
                }
            </Right>
          </ListItem>
          </View>
          );

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
                            <Title>{this.state.groupname}</Title>
                        </Body>
                        
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



  
export default AddMember;
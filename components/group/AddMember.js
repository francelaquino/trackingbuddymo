
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image, Alert,RefreshControl } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,CheckBox, Thumbnail, CardItem, Card } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { displayGroupMember  } from '../../actions/memberActions' ;
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
            membercount:''
        }
      }

    
    componentWillMount() {
        
        this.initialize();
    }
   
    addSelectedMember(index){
        let mem = [...this.props.members];
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

            this.countMembers();


    }

    countMembers(){
        let self=this;
        firebase.database().ref().child('groupmembers/'+this.state.groupid) .once("value",function(snapshot){
            if(snapshot.numChildren()<=1){
                self.setState({membercount : snapshot.numChildren()+' member'})
            }else{
                self.setState({membercount : snapshot.numChildren()+' members'})
            }
        });
    }
    
    initialize(){
       
        this.setState({
            groupname:this.props.navigation.state.params.groupname,
            groupid:this.props.navigation.state.params.groupid,
        })
            setTimeout(() => {
                this.props.displayGroupMember(this.state.groupid);    
                this.countMembers();
            }, 1);
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
        const members =this.props.members.map((member,index)=>
            
            <ListItem  key={member.id} avatar button onPress={()=>this.addSelectedMember(index)} style={globalStyle.listItem}>
            <Left >
                <View style={globalStyle.listAvatarContainer}> 
                    { member.avatar==='' ?  <Thumbnail  style={globalStyle.avatar} source={{uri: this.state.emptyPhoto}} /> :
                    <Thumbnail  style={globalStyle.listAvatar} source={{uri: member.avatar}} />
                    }
                    </View>
            </Left>
            <Body style={globalStyle.listBody} >
                    <Text style={globalStyle.heading1}>{member.firstname}</Text>
                </Body>
            <Right style={globalStyle.listRight}>
                { member.selected ===true &&
                <Icon  style={{color:'#009da3'}} size={30} name="md-checkmark-circle" />
                }
            </Right>
          </ListItem>
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
                        <Right>
                            <Text style={{color:'white'}}>{this.state.membercount}</Text>
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
        if(this.props.isLoading){
            return this.loading();
        }else{
            return this.ready();
        }
    }
    
}





const mapStateToProps = state => ({
    members: state.fetchMember.members,
    isLoading:state.fetchMember.isLoading,
  })
  
  
  AddMember=connect(mapStateToProps,{displayGroupMember})(AddMember);
  
  
  
export default AddMember;
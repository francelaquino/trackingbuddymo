
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Alert, Image } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left, Right, List, ListItem,Tab,Badge, Tabs, TabHeading,FooterTab, Footer } from 'native-base';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import {  getMember, displayMember, deleteMember,displayHomeMember } from '../../actions/memberActions' ;
import Loading  from '../shared/Loading';
var globalStyle = require('../../assets/style/GlobalStyle');



class InfoMember extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:this.props.navigation.state.params.id,
            firstname:this.props.navigation.state.params.firstname,
        };
      }

      
    componentWillMount() {
        this.props.getMember(this.state.id);
    }

    onDelete(){

        this.props.deleteMember(this.state.id).then(res=>{
        	if(res==true){
                ToastAndroid.showWithGravityAndOffset("Member successfully deleted",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
                this.props.isLoading=true;
                this.props.displayMember();
                this.props.displayHomeMember();
                this.props.navigation.goBack();
            }
        }).catch(function(err) {
        });
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
        return (
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header} >
                        <Left style={globalStyle.headerLeft} >
                        <Button transparent onPress={()=> {this.props.navigation.dispatch(NavigationActions.back())}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
                        <Body>
                            <Title>{this.state.firstname}</Title>
                        </Body>
                        
                    </Header>
                    
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={globalStyle.container}>
                        <View style={{marginTop:20}}>
                        <View style={globalStyle.avatarContainer}>
                            <Image style={globalStyle.avatarBig} source={{uri : this.props.member.avatar}} />
                        </View>
                        </View>
                        
                            <View><List >
                            <ListItem >
                                <Body>
                                    <Text style={globalStyle.label}>First Name</Text>
                                    <Text style={globalStyle.value} note>{this.props.member.firstname}</Text>
                                </Body>
                            </ListItem>
                            <ListItem >
                                <Body>
                                    <Text style={globalStyle.label}>Middle Name</Text>
                                    <Text style={globalStyle.value} note>{this.props.member.middlename}</Text>
                                </Body>
                            </ListItem>
                            <ListItem >
                            <Body>
                                <Text style={globalStyle.label}>Last Name</Text>
                                <Text style={globalStyle.value} note>{this.props.member.lastname}</Text>
                            </Body>
                            </ListItem>
                            <ListItem >
                            <Body>
                                <Text style={globalStyle.label}>Mobile No.</Text>
                                <Text style={globalStyle.value} note>{this.props.member.mobileno}</Text>
                            </Body>
                            </ListItem>
                            <ListItem >
                            <Body>
                                <Text style={globalStyle.label}>Email</Text>
                                <Text style={globalStyle.value} note>{this.props.member.email}</Text>
                            </Body>
                            </ListItem>
                            
                           
                            <ListItem last>
                                <Button 
                                onPress={()=>this.confirmDelete()}
                                bordered light full rounded style={globalStyle.deleteButton}>
                                <Text style={{color:'white'}}>Delete Member</Text>
                                </Button>
                            </ListItem>
                        </List></View>
                        
                        
                        </View>
                    </ScrollView>

                    
                            
                    
                </Container>
        </Root>
        );
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
    member: state.fetchMember.member,
    isLoading:state.fetchMember.isLoading,
  })
  
  
InfoMember=connect(mapStateToProps,{getMember,displayMember,deleteMember,displayHomeMember})(InfoMember);
  
export default InfoMember;
  



import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left, Right } from 'native-base';
import Loading  from '../shared/Loading';
import { connect } from 'react-redux';
import Loader from '../shared/Loader';
import { generateInvitationCode, getInvitationCode  } from '../../actions/memberActions' ;
var globalStyle = require('../../assets/style/GlobalStyle');
var userdetails = require('../shared/userDetails');


class GenerateInviteCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            invitationcode:'',
            expiration:'',
        };
      }

    componentWillMount() {
        this.onGenerate();
    }
            
    
    onGenerate(){
        this.setState({loading:true})
        this.props.generateInvitationCode().then(res=>{
            this.props.getInvitationCode();
            this.setState({loading:false})
            
        }).catch(function(err) {
            this.setState({loading:false})
        });
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
                <Loader loading={this.state.loading} />
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
                        { this.props.invitationcode.code !='' &&
                                    <View >
                                    <Text style={{justifyContent: 'center',alignItems: 'center', alignSelf: "center", flexDirection:'column',fontSize:40,marginBottom:2,color:'green'}}>{this.props.invitationcode.code}</Text>
                                    <Text style={{justifyContent: 'center',alignItems: 'center', alignSelf: "center", flexDirection:'column',fontSize:12,marginBottom:10,color:'gray'}}>Expires on {this.props.invitationcode.expiration}</Text>
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
        if(this.props.isLoading){
            return this.loading();
        }else{
            return this.ready();
        }
    }
}


const mapStateToProps = state => ({
    invitationcode: state.fetchMember.invitationcode,
    isLoading:state.fetchMember.isLoading,
  })
  
  
  GenerateInviteCode=connect(mapStateToProps,{getInvitationCode,generateInvitationCode})(GenerateInviteCode);
  
  
  
export default GenerateInviteCode;
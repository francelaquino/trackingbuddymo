
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Alert, Image } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left, Right, List, ListItem,Tab,Badge, Tabs, TabHeading,FooterTab, Footer } from 'native-base';
import { connect } from 'react-redux';
import {  getMember, displayMember, deleteMember,displayHomeMember } from '../../actions/memberActions' ;
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
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
                            <Button transparent onPress={()=> {this.props.navigation.goBack()}} >
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
                        <Tabs>
                        <Tab heading={ <TabHeading><Text>Profile</Text></TabHeading>}>
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
                        </Tab>
                        <Tab heading={ <TabHeading><Text>Message</Text></TabHeading>}>
                        <View><Text>2</Text></View>
                        </Tab>
                        <Tab heading={ <TabHeading><Text>Location</Text></TabHeading>}>
                        <View><Text>3</Text></View>
                        </Tab>
                        </Tabs>
                        
                        </View>
                    </ScrollView>

                    <Footer>
                    <FooterTab>
                        <Button vertical>
                        <MaterialIcons style={{fontSize:25}} name="group" />
                        <Text>Profile</Text>
                        </Button>
                        <Button vertical>
                        <Icon name="camera" />
                        <Text>Camera</Text>
                        </Button>
                        <Button vertical active>
                        <Icon active name="navigate" />
                        <Text>Navigate</Text>
                        </Button>
                        <Button vertical>
                        <Icon name="person" />
                        <Text>Contact</Text>
                        </Button>
                    </FooterTab>
                    </Footer>
                            
                    
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
  

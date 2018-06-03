
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left, Right, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import {  getMember, displayMember, deleteMember } from '../../actions/memberActions' ;

var globalStyle = require('../../assets/style/GlobalStyle');



class InfoMember extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:this.props.navigation.state.params.id,
            firstname:this.props.navigation.state.params.firstname,
        };
      }

      
      async  componentWillMount() {
          console.log(this.state.id)
        this.props.getMember(this.state.id);
    }
    onDelete(){
        var postData={
            memberid:this.state.id,
            ownerid:25
          }
  

        this.props.deleteMember(postData).then(res=>{
        	if(res.status==200){
                this.props.displayMember();
                ToastAndroid.showWithGravityAndOffset(res.result,ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
                this.props.navigation.goBack();
            }
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
    render() {
       

        const members =this.props.member.map(member=>(
            <View key={member.id}>
            <ListItem >
                <Body>
                    <Text style={globalStyle.label}>First Name</Text>
                    <Text style={globalStyle.value} note>{member.firstname}</Text>
                </Body>
            </ListItem>
            <ListItem >
            <Body>
                <Text style={globalStyle.label}>Last Name</Text>
                <Text style={globalStyle.value} note>{member.lastname}</Text>
            </Body>
            </ListItem>
            <ListItem >
            <Body>
                <Text style={globalStyle.label}>Mobile No.</Text>
                <Text style={globalStyle.value} note>{member.mobileno}</Text>
            </Body>
            </ListItem>
            <ListItem >
            <Body>
                <Text style={globalStyle.label}>Email</Text>
                <Text style={globalStyle.value} note>{member.email}</Text>
            </Body>
            </ListItem>
            <ListItem >
            <Body>
                <Text style={globalStyle.label}>Gender</Text>
                <Text style={globalStyle.value} note>{member.gender}</Text>
            </Body>
            </ListItem>
            <ListItem >
            <Body>
                <Text style={globalStyle.label}>Date Added</Text>
                <Text style={globalStyle.value} note>{member.datecreated}</Text>
            </Body>
            </ListItem>
            <ListItem last>
                <Button 
                onPress={()=>this.confirmDelete()}
                bordered light full rounded style={globalStyle.deleteButton}>
                <Text style={{color:'white'}}>Delete Member</Text>
                </Button>
            </ListItem>
            </View>
          ));
        
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
                        <List >
                            {members}
                        </List>
                    </ScrollView>
                            
                    
                </Container>
        </Root>
        );
  }
}


const mapStateToProps = state => ({
    member: state.fetchMember.item
  })
  
  
InfoMember=connect(mapStateToProps,{getMember,displayMember,deleteMember})(InfoMember);
  
export default InfoMember;
  



import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image  } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch,Thumbnail, Card,CardItem } from 'native-base';
import { LeftHome } from '../shared/LeftHome';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading  from '../shared/Loading';
var userdetails = require('../shared/userDetails');
var globalStyle = require('../../assets/style/GlobalStyle');



class DisplayGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:true,
            emptyPhoto:'https://firebasestorage.googleapis.com/v0/b/trackingbuddy-3bebd.appspot.com/o/group_photos%2Fgroup.png?alt=media&token=d1bade4b-6fee-43f7-829a-0b6f76005b40',
            groupname:'',
			avatarsource:'',
            avatar:'',
            groups:{
                id:'',
                avatar:'',
                groupname:'',
            }
        };
        


    
    }

    componentWillMount() {
        this.initialize();
    }
        
    initialize(){
        let groupRef = firebase.database().ref().child('groups/'+userdetails.userid).orderByChild("groupname");
        groupRef.on('value', (dataSnapshot) => {
           
        let groups=[];
        if(dataSnapshot.exists){
            var users = [];
            dataSnapshot.forEach(function(child) {
                groups.push({
                  id: child.key,
                  groupname: child.val().groupname,
                  avatar: child.val().avatar
                })
                
            });
            this.setState({groups: groups,isLoading:false});

        }
    
        })

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
        const { navigate } = this.props.navigation;
        const groups =this.state.groups.map(group=>(
                <Card key={group.id} noShadow={true} style={{borderColor:'gray',borderWidth:1}}>
                <CardItem button onPress={() =>navigate('EditGroup',{id:group.id,groupname:group.groupname,avatar:group.avatar})}>
                <Left >
                    <View style={globalStyle.avatarcontainer}> 
                        { group.avatar==='' ?  <Thumbnail  style={globalStyle.avatar} source={{uri: this.state.emptyPhoto}} /> :
                        <Thumbnail  style={globalStyle.avatar} source={{uri: group.avatar}} />
                        }
                        </View>
                        <Body style={{marginLeft:10}}>
                        <Text style={globalStyle.heading1}>{group.groupname}</Text>
                        <Text  style={globalStyle.font12}>0 Member</Text>
                    </Body>
                </Left>
                </CardItem>
                <CardItem style={globalStyle.cardNavFooter}>
                <Left >
                <Button transparent  onPress={() =>navigate('AddMemberGroup',{id:group.id,groupname:group.groupname})}>
                    <MaterialIcons style={globalStyle.navBarIcon} name="person-add"/>
                    <Text style={globalStyle.font12}> Add Member</Text>
                    </Button>
                </Left>
                </CardItem>
                </Card>

           
          ));
        return(
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header}>
                        <LeftHome/>
                        <Body>
                            <Title>Group</Title>
                        </Body>
                        <Right  >
                            <Button transparent onPress={() =>navigate('CreateGroup')}>
                                <MaterialIcons style={{color:'white',fontSize:30}}  name='group-add' />
                            </Button> 
                            
                        </Right>
                    </Header>
                    <Content padder>
                    <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                    <View style={globalStyle.container}>
                        <List>
                            {groups}
                        </List>
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
  
  
export default DisplayGroup;

import React, { Component } from 'react';
import { Modal, TouchableHighlight,Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { Drawer,Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch, Thumbnail,Card,CardItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Entypo from 'react-native-vector-icons/Entypo';

import MapView from 'react-native-maps';
import  LeftHome  from '../shared/LeftHome';
import { LeftDrawer } from '../shared/LeftDrawer';
import firebase from 'react-native-firebase';
import Loading  from '../shared/Loading';
var userdetails = require('../shared/userDetails');
var globalStyle = require('../../assets/style/GlobalStyle');



class HomePlaces extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:true,
            modalVisible: false,
            active: false,
            emptyPhoto:'https://firebasestorage.googleapis.com/v0/b/trackingbuddy-3bebd.appspot.com/o/member_photos%2Ficons8-person-80.png?alt=media&token=59864ce7-cf1c-4c5e-a07d-76c286a2171d',
            members:{
                id:'',
                firstname:'',
                avatar:'',
            }
        };
      }
    
      

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
      
    componentWillMount() {
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
                    parent.setState({isLoading:false});
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
    loading(){
        return (
          <Root>
          <Container style={globalStyle.containerWrapper}>
          <Loading/>
          </Container>
          </Root>
        )
    }
    openMembers(){
        this.setModalVisible(!this.state.modalVisible)
        this.props.navigation.navigate("DisplayMember");
    }
    openGroups(){
        this.setModalVisible(!this.state.modalVisible)
        this.props.navigation.navigate("DisplayGroup");
    }
    ready(){

        closeDrawer = () => {
            this.drawer._root.close()
          };
          openDrawer = () => {
            this.drawer._root.open()
          };

        const members =this.state.members.map(member=>(
            <ListItem key={member.id}  avatar style={globalStyle.listItemSmall}>
            <Left style={globalStyle.listLeft}>
               
                <View style={globalStyle.listAvatarContainerSmall} >
                { member.avatar==='' ?  <Thumbnail  style={globalStyle.listAvatar} source={{uri: this.state.emptyPhoto}} /> :
                <Thumbnail  style={globalStyle.listAvatarSmall} source={{uri: member.avatar}} />
                }
                </View>
            </Left>
            <Body style={globalStyle.listBody} >
                <Text style={globalStyle.listHeading}>{member.firstname}</Text>
                <Text note style={{fontSize:10}}>Jubail Industrial</Text>
            </Body>
            
            </ListItem>
        ));


        return (
            <Root>
                
                <Container style={globalStyle.containerWrapper}>
                
          
                    <Header style={globalStyle.header}>
                        <LeftHome navigation={this.props.navigation}/>
                        <Body>
                            <Title>Home</Title>
                        </Body>
                        
                        <Right  >
                            <Button transparent onPress={() => this.setModalVisible(true)}>
                                <SimpleLineIcons style={{color:'white',fontSize:20}}  name='options-vertical' />
                            </Button> 
                            
                        </Right>


                           
                            
                        
                    </Header>
                    <View style={styles.mainContainer}>
                    
                        <View style={styles.mapContainer}>
                            <MapView style={styles.map}>
                            </MapView>
                        </View>
                        
                        
                        <View style={styles.navBar} >
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>openDrawer()}>
                                <Ionicons style={globalStyle.navBarIcon} name="md-swap"/>
                                <Text style={globalStyle.navBarLabel}>Switch Group</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>closeDrawer()}>
                                <Entypo style={globalStyle.navBarIcon} name="location"/>
                                <Text style={globalStyle.navBarLabel}>Center Map</Text>
                            </TouchableOpacity>
                            <View style={globalStyle.navBarButton}>
                                <MaterialIcons style={globalStyle.navBarIcon} name="my-location"/>
                                <Text style={globalStyle.navBarLabel}>Checkin</Text>
                            </View>
                            
                        </View>
                        <View style={styles.memberContainer} >
                        <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                            
                            {members}
                            {members}
                            {members}
                            {members}
                            {members}
                            
                        </ScrollView>
                        </View>
                    </View>
          

                    <Modal 
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={globalStyle.modalWrapper} >
                            <View style={[globalStyle.modalContainer,{height:165}]} >
                                <List>
                                    <ListItem avatar onPress={()=>this.openMembers()} 
                                    style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                        <MaterialIcons style={[globalStyle.avatarIcon],{fontSize:35}} name="group"/>
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Member</Text>
                                    </Body>
                                    </ListItem>
                                    <ListItem avatar onPress={()=>this.openGroups()}  
                                     style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                        <FontAwesome style={[globalStyle.avatarIcon],{fontSize:30}} name="group"/>
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Group</Text>
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



const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
    navBar: {
        flexDirection: 'row',
        height: 50,
        padding:2,
        backgroundColor: '#35bcc1',
        alignItems:'center',
        borderTopWidth:0,
        borderTopColor:'#009da3',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 },
    },
    
    mapContainer: {
      flex: 1,
      display: 'flex',
      
    },
    memberContainer: {
        height: 160,
        display: 'flex',
        borderTopColor:'#848482',
        borderTopWidth:.5,
        
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
  });

export default HomePlaces;
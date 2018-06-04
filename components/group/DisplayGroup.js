
import React, { Component } from 'react';
import { TouchableHighlight,Modal, Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image  } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch,Thumbnail, Card,CardItem } from 'native-base';
import { LeftHome } from '../shared/LeftHome';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading  from '../shared/Loading';
var userdetails = require('../shared/userDetails');
var globalStyle = require('../../assets/style/GlobalStyle');



class DisplayGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:true,
            modalVisible: false,
            groupid:'',
            groupavatar:'',
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
    openGroupOption(groupid,groupname,groupavatar){
        this.setState({groupid:groupid,groupname:groupname,groupavatar:groupavatar});
        this.setModalVisible(true)
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    onReload = () => {
        this.setState({isLoading:true})
        this.initialize();
    }

    editGroup(){
        this.setModalVisible(false)
        this.props.navigation.navigate('EditGroup',{id:this.state.groupid,groupname:this.state.groupname,avatar:this.state.groupavatar})
    }

    addMember(){
        this.setModalVisible(false)
        this.props.navigation.navigate('AddMemberGroup',{id:this.state.groupid,groupname:this.state.groupname})
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
            <ListItem key={group.id}  avatar style={globalStyle.listItem}>
                            
                            <Left style={globalStyle.listLeft}>
                                <View style={globalStyle.listAvatarContainer} >
                                { group.avatar==='' ?  <Thumbnail  style={globalStyle.listAvatar} source={{uri: this.state.emptyPhoto}} /> :
                                <Thumbnail  style={globalStyle.listAvatar} source={{uri: group.avatar}} />
                                }
                                </View>
                            </Left>
                            <Body style={globalStyle.listBody} >
                                <Text style={globalStyle.listHeading}>{group.groupname}</Text>
                            </Body>
                            <Right style={globalStyle.listRight} >
                                <TouchableHighlight  style={globalStyle.listRightTouchable}  
                                    onPress={() => 
                                    this.openGroupOption(group.id,group.groupname,group.avatar)}>
                                <MaterialCommunityIcons  style={globalStyle.listRightOptionIcon}   name='dots-vertical' />
                                </TouchableHighlight>
                            </Right>
                            </ListItem>

           
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
                                    <ListItem avatar onPress={()=>this.addMember()} 
                                    style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                        <Ionicons style={[globalStyle.avatarIcon],{fontSize:35}} name='md-person-add' />
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Add Member</Text>
                                    </Body>
                                    </ListItem>
                                    <ListItem avatar onPress={()=>this.confirmDelete()}  
                                     style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                    <MaterialIcons style={[globalStyle.avatarIcon],{fontSize:35}} name="location-on"/>
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Places</Text>
                                    </Body>
                                    </ListItem>
                                    <ListItem avatar onPress={()=>this.editGroup()} 
                                     style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                        <MaterialIcons style={[globalStyle.avatarIcon],{fontSize:40}} name="mode-edit"/>
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Edit Group</Text>
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
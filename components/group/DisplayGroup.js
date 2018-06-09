
import React, { Component } from 'react';
import { TouchableHighlight,Modal, Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image  } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch,Thumbnail, Card,CardItem } from 'native-base';
import { connect } from 'react-redux';
import { displayGroup  } from '../../actions/groupActions' ;
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading  from '../shared/Loading';
var userdetails = require('../shared/userDetails');
var globalStyle = require('../../assets/style/GlobalStyle');



class DisplayGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            groupid:'',
            groupavatar:'',
            emptyPhoto:'https://firebasestorage.googleapis.com/v0/b/trackingbuddy-3bebd.appspot.com/o/group_photos%2Fgroup.png?alt=media&token=d1bade4b-6fee-43f7-829a-0b6f76005b40',
            groupname:'',
			avatarsource:'',
            avatar:'',
            members:{
                id:'',
                firstname:'',
                avatar:'',
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
        this.props.navigation.navigate('AddMemberGroup',{groupid:this.state.groupid,groupname:this.state.groupname})
    }
   
    componentWillMount() {
        this.initialize();
    }
        
    initialize(){
            this.props.displayGroup();
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
        const groups =this.props.groups.map(group=>(
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
                                <SimpleLineIcons  style={globalStyle.listRightOptionIcon}   name='options-vertical' />
                                </TouchableHighlight>
                            </Right>
                            </ListItem>

           
          ));

         
        return(
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header}>
                        <Left style={globalStyle.headerLeft} >
                            <Button transparent onPress={()=> {this.props.navigation.goBack()}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
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
                            <View style={[globalStyle.modalContainer,{height:168}]} >
                                <List>
                                    <ListItem avatar onPress={()=>this.addMember()} 
                                    style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                    <MaterialIcons style={[globalStyle.avatarIcon],{fontSize:40}} name="group"/>
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Members</Text>
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
        if(this.props.isLoading){
            return this.loading();
        }else{
            return this.ready();
        }
    }
   
}
  



const mapStateToProps = state => ({
    groups: state.fetchGroup.groups,
    isLoading: state.fetchGroup.isLoadingGroup,
  })
  
DisplayGroup=connect(mapStateToProps,{displayGroup})(DisplayGroup);
  
export default DisplayGroup;


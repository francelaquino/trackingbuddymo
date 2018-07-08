
import React, { Component } from 'react';
import { Modal,TouchableOpacity, Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, ToastAndroid, Image, Alert,RefreshControl } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch, Thumbnail, CardItem, Card } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { displayMember  } from '../../actions/memberActions' ;
import Loading  from '../shared/Loading';
var globalStyle = require('../../assets/style/GlobalStyle');



class DisplayMember extends Component {
    constructor(props) {
        super(props)
        this.state={
            modalVisible: false,
            memberid:'',
            emptyPhoto:'https://firebasestorage.googleapis.com/v0/b/trackingbuddy-3bebd.appspot.com/o/member_photos%2Ficons8-person-80.png?alt=media&token=59864ce7-cf1c-4c5e-a07d-76c286a2171d',
        }
      }

    openMemberOption(memberid){
        this.setState({memberid:memberid})
        this.setModalVisible(true)
    }
    openLocations(){
        this.props.navigation.navigate("LocationPlaces",{id:this.state.memberid})
        this.setModalVisible(false);
    }
   
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    componentWillMount() {
        this.initialize();
    }
    onReload = () => {
        this.initialize();
      }
   
    initialize(){
        this.props.displayMember();
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
    onDelete(){

        this.props.deleteMember(this.state.memberid).then(res=>{
        	if(res==true){
                ToastAndroid.showWithGravityAndOffset("Member successfully deleted",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
                this.props.isLoading=true;
                this.props.displayMember();
                this.props.displayHomeMember();
                this.setModalVisible(false);
            }
        }).catch(function(err) {
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
        const members =this.props.members.map(member=>(
                            <ListItem key={member.id}  avatar style={globalStyle.listItem}>
                            <Left style={globalStyle.listLeft}>
                               
                                <View style={globalStyle.listAvatarContainer} >
                                { member.avatar==='' ?  <Thumbnail  style={globalStyle.listAvatar} source={{uri: this.state.emptyPhoto}} /> :
                                <Thumbnail  style={globalStyle.listAvatar} source={{uri: member.avatar}} />
                                }
                                </View>
                            </Left>
                            <Body style={globalStyle.listBody} >
                                <Text  style={globalStyle.listHeading}>{member.firstname}</Text>
                            </Body>
                            <Right style={globalStyle.listRight} >
                                <TouchableOpacity  style={globalStyle.listRightTouchable}  
                                    onPress={() => {this.props.navigation.navigate("MemberHome",{id:member.id,firstname:member.firstname})}}>
                                <SimpleLineIcons  style={globalStyle.listRightOptionIcon}   name='arrow-right' />
                                </TouchableOpacity>
                            </Right>
                            </ListItem>
          ));

        return (
            
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header}>
                        <Left style={globalStyle.headerLeft} >
                            <Button transparent onPress={()=> {this.props.navigation.navigate('HomePlaces')}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
                        <Body >
                            <Title>Members</Title>
                        </Body>
                        <Right  >
                            <Button transparent onPress={() => this.props.navigation.navigate("NewInvite",{onReload : this.onReload})}>
                                <Text style={globalStyle.headerRightText}>Invite</Text>
                            </Button> 
                            
                        </Right>
                    </Header>
                    <Content padder>
                        <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}
                          >
                            <View style={globalStyle.container}>
                            <List   >
                                {members}
                                </List  >
                            </View>
                        </ScrollView>
                    </Content>
                    <Modal 
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={globalStyle.modalWrapper} >
                            <View style={[globalStyle.modalContainer,{height:170}]} >
                                <List>
                                    <ListItem avatar onPress={()=>this.openMembers()} 
                                    style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                        <MaterialIcons style={[globalStyle.avatarIcon],{fontSize:35}} name="message"/>
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Message</Text>
                                    </Body>
                                    </ListItem>
                                    <ListItem avatar onPress={()=>this.openLocations()} 
                                    style={globalStyle.modalAvatar}>
                                    <Left style={globalStyle.modalLeft}>
                                        <Entypo  style={[globalStyle.avatarIcon],{fontSize:35}} name="location"/>
                                    </Left>
                                    <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                        <Text style={{color:'#2b2a2a',fontSize:16}}>Locations</Text>
                                    </Body>
                                    </ListItem>
                                    
                                </List>

                                <TouchableOpacity 
                                    onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <View style={{alignItems:'center',flexDirection:'row'}}>
                                    <Right><Text style={globalStyle.modalCancel} >CANCEL</Text></Right>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </Modal>
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
  
  
DisplayMember=connect(mapStateToProps,{displayMember})(DisplayMember);
  
  
export default DisplayMember;
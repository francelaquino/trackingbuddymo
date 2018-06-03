
import React, { Component } from 'react';
import { Modal, TouchableHighlight,Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch, Thumbnail,Card,CardItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MapView from 'react-native-maps';
import { LeftHome } from '../shared/LeftHome';
import Loading  from '../shared/Loading';
var userDetails = require('../shared/userDetails');
var globalStyle = require('../../assets/style/GlobalStyle');



class HomePlaces extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:true,
            isModalVisible: true,
            modalVisible: false,
        };
      }
      

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
      
    componentWillMount() {
        this.initialize();
    }
        
    initialize(){
        this.setState({isLoading:false})
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
        return (
            <Root>
                
                <Container style={globalStyle.containerWrapper}>
                   
          
                    <Header style={globalStyle.header}>
                        <LeftHome/>
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
                        
                        <View style={styles.memberContainer} >
                        
                        </View>
                        <View style={styles.navBar} >
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>navigate('DisplayGroup')}>
                                <Ionicons style={globalStyle.navBarIcon} name="md-swap"/>
                                <Text style={globalStyle.navBarLabel}>Switch Group</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>navigate('DisplayMember')}>
                                <Ionicons style={globalStyle.navBarIcon} name="ios-people"/>
                                <Text style={globalStyle.navBarLabel}>Members</Text>
                            </TouchableOpacity>
                            <View style={globalStyle.navBarButton}>
                                <MaterialIcons style={globalStyle.navBarIcon} name="place"/>
                                <Text style={globalStyle.navBarLabel}>Places</Text>
                            </View>
                            
                        </View>
                    </View>

                    <Modal 
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View style={{backgroundColor: 'rgba(0,0,0,0.5)',height:'100%',zIndex: 1000}}>
                        <View style={{borderRadius:6, marginTop: 50,backgroundColor:'white',height:165,width:300,alignSelf: "center",         flexDirection:'column'}}>
                            <List>
                                <ListItem avatar onPress={()=>this.openMembers()}  
                                style={{marginLeft:0,borderBottomColor:'#e5e5e5',borderBottomWidth:.5,padding:5}}>
                                <Left style={{width:55,justifyContent: 'center',alignItems: 'center'}} >
                                    <Ionicons style={{color:'#818181',fontSize:35}} name="md-person"/>
                                </Left>
                                <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                    <Text style={{color:'#2b2a2a',fontSize:16}}>Members</Text>
                                </Body>
                                </ListItem>
                                <ListItem avatar onPress={()=>this.openGroups()}  style={{marginLeft:0,borderBottomColor:'#009da3',borderBottomWidth:1,padding:5}}>
                                <Left style={{width:55,justifyContent: 'center',alignItems: 'center'}} >
                                    <Ionicons style={{color:'#818181',fontSize:40}} name="md-people"/>
                                </Left>
                                <Body style={{borderBottomWidth:0,marginLeft:0}}>
                                    <Text style={{color:'#2b2a2a',fontSize:16}}>Groups</Text>
                                </Body>
                                </ListItem>
                            </List>

                            <TouchableHighlight 
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                                 <View style={{alignItems:'center',flexDirection:'row'}}>
                                <Right><Text style={{width:100,color:'#009da3',padding:15,fontSize:17}}>CANCEL</Text></Right>
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
        /*const { navigate } = this.props.navigation;
        const members =this.props.members.map(member=>(
            <ListItem key={member.id} avatar style={{borderTopWidth:.5,marginLeft:0,paddingLeft:5}} >
            <Left>
                <View style={globalStyle.avatarcontainerbottom}> 
                <Thumbnail  style={globalStyle.avatarbottom} source={{uri: member.avatar}} />
                </View>
              </Left>
              <Body style={{borderBottomWidth:0}}>
                <Text style={globalStyle.heading2}>{member.firstname}</Text>
                <Text  style={globalStyle.font11}>Doing what you like will always keep you happy . .</Text>
              </Body>
          </ListItem>
          ));*/

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
        backgroundColor: 'transparent',
        padding:2,
        alignItems:'center',
        borderTopWidth:.5,
        borderTopColor:'silver',
        
       
    },
    
    mapContainer: {
      flex: 1,
      display: 'flex',
    
      
    },
    memberContainer: {
        height: 150,
        display: 'flex',
        borderTopColor:'#848482',
        borderTopWidth:.5,
        
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
  });

export default HomePlaces;
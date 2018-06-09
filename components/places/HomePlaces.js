
import React, { Component } from 'react';
import { TouchableHighlight,Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { Drawer,Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch, Thumbnail,Card,CardItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView from 'react-native-maps';
import Loading  from '../shared/Loading';
import LeftDrawer from '../shared/LeftDrawer'
import { connect } from 'react-redux';
import { displayHomeMember  } from '../../actions/memberActions' ;
var globalStyle = require('../../assets/style/GlobalStyle');



class HomePlaces extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupname:''
        };
      }
    
    

    componentWillMount() {
        this.initialize();
    }
    
    getAllMembers(){
        let members=[]

        this.setState({members:members ,groupname:''});


        let self=this;

        return parentPromise= new Promise((resolve,reject)=>{
            let memberRef = firebase.database().ref().child('users/'+userdetails.userid+"/members").on('value',function(snapshot){
                resolve(snapshot)
            })
            }).then(function(snapshot){
                if(snapshot.val()===null){
                    self.setState({isLoading:false});
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
                                resolve();
                            })
                        }).then(function(){
                            self.setState({members: members,isLoading:false});
                        })
                    })
                }
            
        })
    }
    changeGroup = (groupname) => {
        this.setState({groupname:groupname});
    }
    initialize(){

        this.props.displayHomeMember();

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

    closeDrawer = () => {
        this.drawer._root.close()
    };
      openDrawer = () => {
        this.drawer._root.open()
    };
    ready(){

        

        const members =this.props.members.map(member=>(
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
            <Drawer
            tapToClose={true} 
                ref={(ref) => { this.drawer = ref; }}
                content={<LeftDrawer closeDrawer = {this.closeDrawer} navigation={this.props.navigation}/>}
                onClose={() => this.closeDrawer()} >
                <Root>
                
                <Container style={globalStyle.containerWrapper}>
                
          
                    <Header style={globalStyle.header}>
                        <Left style={globalStyle.headerMenu} >
                            <Button transparent onPress={()=>this.openDrawer()} >
                                <Icon size={30} name='menu' />
                            </Button> 
                        </Left>
                        <Body>
                            <Title>Home</Title>
                        </Body>
                        
                        <Right  >
                            <Button transparent >
                                <SimpleLineIcons style={{color:'white',fontSize:20}}  name='options-vertical' />
                            </Button> 
                            
                        </Right>


                           
                            
                        
                    </Header>
                    <View style={styles.mainContainer}>
                    
                        <View style={styles.mapContainer}>
                            
                            <MapView style={styles.map}>
                            </MapView>
                            { this.state.groupname!=='' &&
                            <View style={{flexDirection: 'column',marginVertical: 5,width:'100%', alignItems:'center',position:'absolute',bottom:0}}>
                            <Text style={{paddingTop:5,opacity:.5,borderRadius:15,backgroundColor:'black',width:200,height:30,color:'white',textAlign:'center', alignSelf: "center", flexDirection:'column'}}>{this.state.groupname} Group</Text>
                            </View>
                            }
                        </View>
                        
                        
                        <View style={styles.navBar} >
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>this.props.navigation.navigate('SelectGroup',{changeGroup : this.changeGroup})}>
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
                            
                        </ScrollView>
                        </View>
                    </View>
          

                    
                </Container>
            </Root>
            </Drawer>
            
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


const mapStateToProps = state => ({
    members: state.fetchMember.home_members,
    isLoading:state.fetchMember.isLoading,
  })
  
  
HomePlaces=connect(mapStateToProps,{displayHomeMember})(HomePlaces);
  
export default HomePlaces;
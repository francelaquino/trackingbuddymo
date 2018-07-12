
import React, { Component } from 'react';
import { NetInfo , TouchableOpacity,Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, ToastAndroid, Image,Dimensions } from 'react-native';
import { Drawer,Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch, Thumbnail,Card,CardItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView, { ProviderPropType, Marker, AnimatedRegion,Animated,Polyline } from 'react-native-maps';
import Loading  from '../shared/Loading';
import Loader  from '../shared/Loader';
import LeftDrawer from '../shared/LeftDrawer'
import { connect } from 'react-redux';
import { displayHomeMember  } from '../../actions/memberActions' ;
import { setConnection  } from '../../actions/connectionActions' ;
import { saveLocationOffline, saveLocationOnline  } from '../../actions/locationActions' ;
import firebase from 'react-native-firebase';
var screenHeight = Dimensions.get('window').height; 

import BackgroundJob from 'react-native-background-job';

var globalStyle = require('../../assets/style/GlobalStyle');
var userdetails = require('../../components/shared/userDetails');
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = .05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

BackgroundJob.cancelAll();

const trackPosition = {
    jobKey: "trackPositionJob",
    job: () =>trackLocation(),
};
    
BackgroundJob.register(trackPosition);

var trackPositionSchedule = {
    jobKey: "trackPositionJob",
    period: 10000,
    //period: 60000,
    exact: true,
    allowExecutionInForeground: true
}

  
let trackLocation;


class HomePlaces extends Component {
    constructor(props) {
        super(props)
        this.map = null;

        this.state = {
            groupname:'',
            isLoading:true,
            region:{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA ,
                longitudeDelta: LONGITUDE_DELTA,
            },
            centerMarker: [],
            markers: [],
        };

      }
    

    

    
   
    componentDidMount(){
        let self=this;
        trackLocation =function() {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let coords = {
                        lat: position.coords.latitude,
                        lng:  position.coords.longitude,
                        dateadded : Date.now()
                      };
                    NetInfo.isConnected.fetch().done((isConnected) => {
                        if(isConnected){

                            //self.props.saveLocationOnline(coords);

                        }else{
                            //self.props.saveLocationOffline(coords);
                        }
                    });
                },
                (err) => {
                    console.log(err)
                },
                { enableHighAccuracy: true, timeout: 20000 }
              );
            }

    
        BackgroundJob.schedule(trackPositionSchedule);
        
    }
  

    async plotMarker(){
            this.setState({markers:[],centerMarker:[]})
            for (let i = 0; i < this.props.members.length; i++) {
                    const coord = {
                        id:i,
                        firstname:this.props.members[i].firstname,
                        address:this.props.members[i].address,
                        avatar:this.props.members[i].avatar,
                        coordinates:{
                        latitude: this.props.members[i].coordinates.latitude,
                        longitude: this.props.members[i].coordinates.longitude,
                        latitudeDelta: LATITUDE_DELTA ,
                        longitudeDelta: LONGITUDE_DELTA,
                        }
                    };
                    
                    if(!isNaN(this.props.members[i].coordinates.longitude) && !isNaN(this.props.members[i].coordinates.latitude)){
                        this.setState({ markers: this.state.markers.concat(coord),centerMarker: this.state.centerMarker.concat(coord.coordinates) })
                        
                    }

                }
            this.setState({isLoading:false})
            
            
    }
    async fitToMap(){
        if(this.props.members.length==1){
            this.map.animateToRegion({
                latitude: this.props.members[0].coordinates.latitude,
                longitude: this.props.members[0].coordinates.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              })
        }else{
            this.map.fitToCoordinates(this.state.centerMarker, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })  
        }

    }
    
    componentWillMount() {
         this.initialize();
    }

    async centerToMarker(latitude,longitude){
       
        let center=[{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.00522,
            longitudeDelta: 0.00522 * ASPECT_RATIO
        }
        ];
        this.map.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          })

    }
    
    
    async changeGroup (groupname) {
        await this.reload();
        this.setState({groupname:groupname});
        
    }
    async reload(){
        let self=this;
        self.props.displayHomeMember().then(res=>{
            setTimeout( () => {
                self.plotMarker();
           }, 1000);
        });
    }
    async initialize(){
        let self=this;
        firebase.database().ref().child('users/'+userdetails.userid+"/members").on('value',function(snapshot){
            self.reload();
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

  
    

    closeDrawer = () => {
        this.drawer._root.close()
    };
      openDrawer = () => {
        this.drawer._root.open()
    };
    ready(){


        const members =this.props.members.map(member=>(
            <ListItem key={member.id}  avatar style={globalStyle.listItemSmall} >
            <Left style={globalStyle.listLeft}>
               
                <View style={globalStyle.listAvatarContainerSmall} >
                { member.avatar==='' ?  <Thumbnail  onPress={()=>this.centerToMarker(member.coordinates.latitude,member.coordinates.longitude)} style={globalStyle.listAvatar} source={{uri: this.state.emptyPhoto}} /> :
                <Thumbnail onPress={()=>this.centerToMarker(member.coordinates.latitude,member.coordinates.longitude)}  style={globalStyle.listAvatarSmall} source={{uri: member.avatar}} />
                }
                </View>
            </Left>
            <Body style={globalStyle.listBody} >
                <Text numberOfLines={1} style={globalStyle.listHeadingHome} onPress={()=>this.centerToMarker(member.coordinates.latitude,member.coordinates.longitude)}>{member.firstname}</Text>
                <Text numberOfLines={1} note style={{fontSize:10}}>{member.address}</Text>
            </Body>
            <Right button style={globalStyle.listRight} >
                <TouchableOpacity  onPress={() =>this.props.navigation.navigate('LocationPlaces',{id:member.id})} >
                <View style={{width:50,height:50,justifyContent: 'center',alignItems: 'center'}}>
                <Entypo  style={{marginTop:28,fontSize:20,color:'#fbbc05'}} name="location"/>
                </View>
                </TouchableOpacity>
              </Right>
            </ListItem>
        ));

        const markers =this.state.markers.map(marker=>(
                <MapView.Marker key={marker.id}
                onLayout = {() => this.fitToMap()}
                coordinate={marker.coordinates}
                title={marker.firstname}>
                <Image style={styles.marker} 
                    source={require('../../images/marker.png')} />
                        <Text   style={styles.markerText}>{marker.firstname}</Text>
                   
                <MapView.Callout >
               
                    <View style={styles.callOut}>
                    <View style={globalStyle.listAvatarContainerSmall} >
                    { marker.avatar==='' ?  <Thumbnail  style={globalStyle.listAvatar} source={{uri: this.state.emptyPhoto}} /> :
                    <Thumbnail  style={globalStyle.listAvatarSmall} source={{uri: marker.avatar}} />
                    }
                    </View>
                    <Text  style={styles.callOutText}>{marker.address}</Text></View>
                </MapView.Callout>
                </MapView.Marker>
               
        ));
        
        

        return (
            <Drawer leftDrawerWidth={40}
            tapToClose={true} 
                ref={(ref) => { this.drawer = ref; }}
                content={<LeftDrawer closeDrawer = {this.closeDrawer} navigation={this.props.navigation}/>}
                onClose={() => this.closeDrawer()} >
                <Root>
                <Loader loading={this.state.isLoading} />
                <Container style={globalStyle.containerWrapper}>
                
          
                    <Header style={globalStyle.header}>
                        <Left style={globalStyle.headerMenu} >
                            <Button transparent onPress={()=>this.openDrawer()} >
                                <Icon size={30} name='menu' style={globalStyle.headerLeftMenuIcon} />
                            </Button> 
                        </Left>
                        <Body>
                            <Title style={globalStyle.headerTitle}>Home</Title>
                        </Body>
                        
                       


                           
                            
                        
                    </Header>
                    
                    <View style={styles.mainContainer}>
                   
                        <View style={styles.mapContainer}>
                        
                        <MapView ref={map => {this.map = map}}
                        loadingEnabled={true}
                            zoomEnabled = {true}
                            style={styles.map}
                            loadingEnabled={false}
                            >
                            {markers}


                            </MapView>
                            { this.state.groupname!=='' &&
                            <View style={{flexDirection: 'column',marginVertical: 5,width:'100%', alignItems:'center',position:'absolute',bottom:0}}>
                            <Text style={{paddingTop:5,opacity:.5,borderRadius:15,backgroundColor:'black',width:200,height:30,color:'white',textAlign:'center', alignSelf: "center", flexDirection:'column'}}>{this.state.groupname} Group</Text>
                            </View>
                            }
                        </View>
                        
                        
                        
                        <ScrollView  contentContainerStyle={{flexGrow: 1}} contentContainerStyle={{flex: 0}} keyboardShouldPersistTaps={"always"}>
                        <View style={styles.memberContainer} >
                       
                            {members}
                            
                        
                        </View>
                        </ScrollView>
                        
                        <View style={styles.navBar} >
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>this.props.navigation.navigate('SelectGroup',{changeGroup : this.changeGroup})}>
                                <Ionicons style={globalStyle.navBarIcon} name="md-swap"/>
                                <Text style={globalStyle.navBarLabel}>Switch Group</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>this.fitToMap()}>
                            <MaterialIcons style={globalStyle.navBarIcon} name="my-location"/>
                                <Text style={globalStyle.navBarLabel}>Center Map</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>

                   
          

                    
                </Container>
            </Root>
            </Drawer>
            
        )
    }



    render() {
                return this.ready();
        

  }
}



const styles = StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
    navBar: {
        flexDirection: 'row',
        height: 50,
        padding:2,
        backgroundColor: '#1eaec5',
        alignItems:'center',
        borderTopWidth:0,
    },
    
    mapContainer: {
      flex: 3,
      display: 'flex',
      borderBottomColor:'silver',
      borderBottomWidth:.5,
      
    },
    memberContainer: {
        flex: 1,
        height: 195,
        display: 'flex',
       
        
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      marker: {
        alignSelf: 'center',
        width:50,
        height:60,
        margin:0,padding:0 
    },
    markerText: {
        textAlign: 'center',
        flex: 1,
        color: 'black',
        fontSize: 9,
        width:40,
        marginLeft:5,
        marginTop:16,
        position:'absolute',


    },
    callOut: {
        width: 100,
        alignItems:'center',
    },
    callOutText:{
        fontSize: 10,
        textAlign: 'center',
    }
  });


const mapStateToProps = state => ({
    members: state.fetchMember.home_members,
    //isLoading:state.fetchMember.isLoading,
    isConnected:state.fetchConnection.isConnected,
    coordinates:state.fetchLocation.coordinates,
    
  })
  
  
  
HomePlaces=connect(mapStateToProps,{displayHomeMember,setConnection,saveLocationOffline,saveLocationOnline})(HomePlaces);
  
export default HomePlaces;
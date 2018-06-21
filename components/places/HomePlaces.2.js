
import React, { Component } from 'react';
import { TouchableHighlight,Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image,Dimensions } from 'react-native';
import { Drawer,Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch, Thumbnail,Card,CardItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView, { ProviderPropType, Marker, AnimatedRegion,Animated,Polyline } from 'react-native-maps';
import Loading  from '../shared/Loading';
import LeftDrawer from '../shared/LeftDrawer'
import { connect } from 'react-redux';
import { displayHomeMember  } from '../../actions/memberActions' ;
import firebase from 'react-native-firebase';
import BackgroundJob from 'react-native-background-job';
import Geocoder from 'react-native-geocoder';
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
    job: () =>this.trackLocation().done(),
};
    
BackgroundJob.register(trackPosition);


var trackPositionSchedule = {
    jobKey: "trackPositionJob",
    period: 9000000,
    exact: true,
    allowExecutionInForeground: true
}

trackLocation = async() =>{
    
      navigator.geolocation.getCurrentPosition(
        (position) => {
            let coords = {
                lat: position.coords.latitude,
                lng:  position.coords.longitude
              };
        
            Geocoder.geocodePosition(coords).then(res => {
                fetch("https://us-central1-trackingbuddy-3bebd.cloudfunctions.net/saveLocation?lat="+ coords.lat +"&lon="+ coords.lng +"&userid="+userdetails.userid+"&address="+res[1].formattedAddress)
                .then((response) => response)
                .then((response) => {
                })
                .catch((error) => {
                console.error(error);
                });
            }).catch(err => console.log(err))
        },
        (err) => {
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      );
    }
   



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
        this.setState({ isLoading:false});
        BackgroundJob.schedule(trackPositionSchedule);
        
    }

    plotMarker(){
        
        //setTimeout(() => {

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

                  if(i==0){
                      this.setState({
                        region:{
                            latitude:this.props.members[i].coordinates.latitude,
                            longitude:this.props.members[i].coordinates.longitude,
                            latitudeDelta: LATITUDE_DELTA ,
                            longitudeDelta: LONGITUDE_DELTA,
                        }
                    })
                }
                if(!isNaN(this.props.members[i].coordinates.longitude) && !isNaN(this.props.members[i].coordinates.latitude)){
                    this.setState({ isLoading:false,markers: this.state.markers.concat(coord),centerMarker: this.state.centerMarker.concat(coord.coordinates) })
                    
                }
            }

        //}, 5000);
    }
    fitToMap(){
        setTimeout(() => {
            this.map.fitToCoordinates(this.state.centerMarker, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: true })  
            }, 5000);

    }
    
    componentWillMount() {
       
        this.initialize();
    }
    
    
    changeGroup = (groupname) => {
        this.setState({groupname:groupname});
    }
    initialize(){
        let self=this;
        let memberRef = firebase.database().ref().child('users/'+userdetails.userid+"/members").on('value',function(snapshot){
            self.props.displayHomeMember();
            self.plotMarker();
        })
       


    }
    reload(){
        this.props.displayHomeMember();
        this.plotMarker();
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
                <Text note style={{fontSize:10}}>{member.address}</Text>
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
                        
                       


                           
                            
                        
                    </Header>
                    <View style={styles.mainContainer}>
                    
                        <View style={styles.mapContainer}>
                        
                        <MapView ref={map => {this.map = map}}
                            showsUserLocation = {false}
                            zoomEnabled = {true}
                            style={styles.map}
                            loadingEnabled={true}
                            region={this.state.region}
                            >
                             {this.state.markers.map(marker => (
                                    <MapView.Marker key={marker.id}
                                    coordinate={marker.coordinates}
                                    title={marker.firstname}>
                                    <View style={styles.markerContainer}>
                                        <View style={styles.marker}>
                                            <Text style={styles.pinText}>{marker.firstname}</Text>
                                        </View>
                                        <Image style={{alignSelf: 'center',width:20,height:20,margin:0,padding:0,marginTop:-8}} 
                                        source={require('../../images/markerdown.png')} />
                                    </View>
                                    <MapView.Callout>
                                    
                                        <View style={styles.callOut}>
                                        <View style={globalStyle.listAvatarContainerSmall} >
                                        { marker.avatar==='' ?  <Thumbnail  style={globalStyle.listAvatar} source={{uri: this.state.emptyPhoto}} /> :
                                        <Thumbnail  style={globalStyle.listAvatarSmall} source={{uri: marker.avatar}} />
                                        }
                                        </View>
                                        <Text style={styles.callOutText}>{marker.address}</Text></View>
                                    </MapView.Callout>
                                    </MapView.Marker>
                                   
                                ))}

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
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>this.reload()}>
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
      marker: {
        width: 50,
        height: 20,
        borderRadius: 5,
        backgroundColor:'#096d71',
    },
    markerArrow:{
        width: 20,
        height: 20,
        transform: [{ rotateY: '180deg'}],
        backgroundColor:'red',
    },
    pinText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 10,
        marginTop:3,
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
    isLoading:state.fetchMember.isLoading,
  })
  
  
HomePlaces=connect(mapStateToProps,{displayHomeMember})(HomePlaces);
  
export default HomePlaces;
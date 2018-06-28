
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
import LeftDrawer from '../shared/LeftDrawer'


var globalStyle = require('../../assets/style/GlobalStyle');
var userdetails = require('../../components/shared/userDetails');


class CreatePlace extends Component {
    constructor(props) {
        super(props)
        this.map = null;

        this.state = {
           
        };

      }
    

    

    
   
    componentDidMount(){
        
        
    }
  

    
   
    componentWillMount() {
    }

    
    initialize(){
       


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


        return (
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header}>
                        <Left style={globalStyle.headerLeft} >
                            <Button transparent onPress={()=> {this.props.navigation.goBack()}} >
                                <Icon size={30} name='arrow-back' />
                            </Button> 
                        </Left>
                        <Body>
                            <Title>Create Group</Title>
                        </Body>
                    </Header>
                    <View style={globalStyle.container}>
                    <MapView ref={map => {this.map = map}}
                                loadingEnabled={true}
                                zoomEnabled = {true}
                                style={styles.map}
                                loadingEnabled={true}>
                                </MapView>
                    </View>

                            <View style={globalStyle.mapContainer} >
                                
                            </View>

                            <View style={{justifyContent: 'center',alignItems: 'center', flex: 1,}}>
                            <Item  stackedLabel style={globalStyle.item}>
                                <View style={globalStyle.inputicon}>  
                                <TextInput style={globalStyle.textinputCenter} 
                                name="groupname" autoCorrect={false}
                                value={this.state.groupname}  maxLength = {20}
                                onChangeText={groupname=>this.setState({groupname})}/>
                                </View>
                            </Item>
                                <Button disabled={!this.state.groupname} style={this.state.groupname ? globalStyle.secondaryButton : globalStyle.secondaryButtonDisabled}
                                    onPress={()=>this.onSubmit()}
                                    bordered light full rounded >
                                    <Text style={{color:'white'}}>Create Group</Text>
                                </Button>
                            </View>

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
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
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


  
  
  

  
export default CreatePlace;
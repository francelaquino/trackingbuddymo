
import React, { Component } from 'react';
import { TouchableOpacity,Modal, Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, ToastAndroid, Image  } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch,Thumbnail, Card,CardItem } from 'native-base';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { displayLocations  } from '../../actions/locationActions' ;
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading  from '../shared/Loading';
var userdetails = require('../shared/userDetails');
var globalStyle = require('../../assets/style/GlobalStyle');



class LocationPlaces extends Component {
    constructor(props) {
        super(props)
        


    
    }
   
    componentWillMount() {
        this.initialize();
    }
        
    initialize(){
        let id=this.props.navigation.state.params.id;
        this.props.displayLocations(id);
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
        const locations =this.props.locations.reverse().map(location=>(
            <ListItem key={location.id}  avatar style={globalStyle.listItem} >
                <Body style={globalStyle.listBody} >
                    <Text numberOfLines={1} style={globalStyle.listHeading}>{location.address}</Text>
                    <Text note style={{fontSize:12}}>{location.dateadded}</Text>
                </Body>
               
                <Right style={globalStyle.listRight}>
                <TouchableOpacity  style={globalStyle.listRightTouchable}  
                                    onPress={() => {this.props.navigation.navigate("MemberHome",{id:member.id,firstname:member.firstname})}}>
                                <SimpleLineIcons  style={globalStyle.listRightOptionIcon}   name='arrow-right' />
                                </TouchableOpacity>
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
                            <Title>Locations</Title>
                        </Body>
                    </Header>
                    <Content padder>
                    <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                    <View style={globalStyle.container}>
                    
                        <List>
                            {locations}
                        </List>

                         
                    </View>
                    </ScrollView>
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
    locations: state.fetchLocation.locations,
    isLoading: state.fetchLocation.isLoading,
  })
  
  LocationPlaces=connect(mapStateToProps,{displayLocations})(LocationPlaces);
  
export default LocationPlaces;


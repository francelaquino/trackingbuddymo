
import React, { Component } from 'react';
import { TouchableOpacity,Modal, Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, ToastAndroid, Image  } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch,Thumbnail, Card,CardItem } from 'native-base';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { displayPlaces  } from '../../actions/locationActions' ;
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Loading  from '../shared/Loading';
var globalStyle = require('../../assets/style/GlobalStyle');



class PlaceList extends Component {
    constructor(props) {
        super(props)
    
    }
   
    componentWillMount() {
        this.initialize();
    }
        
    initialize(){
        this.props.displayPlaces();
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
        const places =this.props.places.map(place=>(
            <ListItem icon key={place.id}  avatar style={globalStyle.listItem} >
            <Left >
               
            <Entypo  style={{fontSize:30,color:'#d1122e'}} name="location"/>
           </Left>
                <Body style={globalStyle.listBody} >
                    <Text numberOfLines={1} style={globalStyle.listHeading}>{place.placename}</Text>
                    <Text  numberOfLines={1} note style={{fontSize:12}}>{place.address}</Text>
                </Body>
               
                <Right style={globalStyle.listRight}>
                <TouchableOpacity  style={globalStyle.listRightTouchable}  
                    onPress={() => {this.props.navigation.navigate("PlaceView",{place:place})}}>
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
                            <Title>Places</Title>
                        </Body>
                        <Right  >
                            <Button transparent onPress={() =>navigate('CreatePlace')}>
                                <Text style={globalStyle.headerRightText}>Add</Text>
                            </Button> 
                            
                        </Right>
                    </Header>
                    <Content padder>
                    <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
                    <View style={globalStyle.container}>
                    
                        <List>
                            {places}
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
    places: state.fetchLocation.places,
    isLoading: state.fetchLocation.isLoading,
  })
  
PlaceList=connect(mapStateToProps,{displayPlaces})(PlaceList);
  
export default PlaceList;


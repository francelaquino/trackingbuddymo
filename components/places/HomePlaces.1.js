
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Content, List, ListItem,Left, Right,Switch, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { LeftHome } from '../shared/LeftHome';
import { displayMember  } from '../../actions/memberActions' ;

var globalStyle = require('../../assets/style/GlobalStyle');



class HomePlaces extends Component {
    constructor(props) {
        super(props)
      }

      
    componentWillMount() {
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <Root>
                <Container style={globalStyle.containerWrapper}>
                    <Header style={globalStyle.header}>
                        <LeftHome/>
                        <Body>
                            <Title>Home</Title>
                        </Body>
                        
                    </Header>
                    <View style={styles.mainContainer}>
                        <View style={styles.body} />
                        <View style={styles.navBar} >
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>navigate('DisplayGroup')}>
                                <View style={globalStyle.navBarWrapperYellow}>
                                <Ionicons style={globalStyle.navBarIcon} name="md-swap"/>
                                </View>
                                <Text style={globalStyle.navBarLabel}>Switch Group</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>navigate('DisplayMember')}>
                                <View style={globalStyle.navBarWrapperBlue}>
                                <Ionicons style={globalStyle.navBarIcon} name="ios-people"/>
                                </View>
                                <Text style={globalStyle.navBarLabel}>Members</Text>
                            </TouchableOpacity>
                            <View style={globalStyle.navBarButton}>
                                <View style={globalStyle.navBarWrapperDark}>
                                <MaterialIcons style={globalStyle.navBarIcon} name="place"/>
                                </View>
                                <Text style={globalStyle.navBarLabel}>Places</Text>
                            </View>
                            
                        </View>
                    </View>
                </Container>
            </Root>
        );
  }
}

/*<View style={styles.navBar} >
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>this.props.navigation.navigate('SelectGroup',{changeGroup : this.changeGroup})}>
                                <Ionicons style={globalStyle.navBarIcon} name="md-swap"/>
                                <Text style={globalStyle.navBarLabel}>Switch Group</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={globalStyle.navBarButton} onPress={() =>this.fitToMap()}>
                            <MaterialIcons style={globalStyle.navBarIcon} name="my-location"/>
                                <Text style={globalStyle.navBarLabel}>Center Map</Text>
                            </TouchableOpacity>
                            
                        </View>*/

const styles = StyleSheet.create({
    mainContainer: {
      height: '100%',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
    navBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: 'transparent',
        padding:4,
        alignItems:'center',
        borderTopWidth:.5,
        borderTopColor:'silver',
    },
    
    body: {
      flex: 1,
      display: 'flex',
      
    },
  });

const mapStateToProps = state => ({
  })
  
  
//DisplayMember=connect(mapStateToProps,{displayMember})(DisplayMember);
  
export default HomePlaces;
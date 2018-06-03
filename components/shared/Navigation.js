import React, { Component } from 'react';
import Register from '../Registration';
import Login from '../Login';
import CreateGroup from '../group/CreateGroup';
import DisplayGroup from '../group/DisplayGroup';
import DisplayHomeGroup from '../group/DisplayHomeGroup';
import EditGroup from '../group/EditGroup';
import AddMember from '../group/AddMember';
import MembersGroup from '../group/MembersGroup';
import DisplayMember from '../member/DisplayMember';
import GenerateInviteCode from '../member/GenerateInviteCode';
import InfoMember from '../member/InfoMember';
import NewInvite from '../member/NewInvite';
import HomePlaces from '../places/HomePlaces';
import GroupPlaces from '../places/GroupPlaces';
//import { StackNavigator } from 'react-navigation';
import  { createStackNavigator }  from 'react-navigation';

export  default Navigation = createStackNavigator({
    HomePlaces: { 
        screen: HomePlaces,
        headerMode: 'none',
        navigationOptions: {
            header: null
        }
    },
    DisplayGroup: { 
        screen: DisplayGroup,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
    DisplayMember: { 
        screen: DisplayMember,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
    AddMemberGroup: { 
        screen: AddMember,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
   
   
    NewInvite: { 
        screen: NewInvite,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
   
  
    GenerateInviteCode: { 
        screen: GenerateInviteCode,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
    
    Register: { 
        screen: Register,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
   
    
    
    CreateGroup: { 
        screen: CreateGroup,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
   
    
    
    
   
   
   
   
    
    
    Login: { 
        screen: Login,
        headerMode: 'none',
        navigationOptions: {
            header: null
        },
        
    },
   
    
  
    DisplayHomeGroup: { 
        screen: DisplayHomeGroup,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
   
    
    
    
    InfoMember: { 
        screen: InfoMember,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
   
    
    
    
    EditGroup: { 
        screen: EditGroup,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
    MembersGroup: { 
        screen: MembersGroup,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },initialRouteName: 'HomePlaces'

  });


  

import React, { Component } from 'react';
import Register from '../Registration';
import Login from '../Login';
import CreateGroup from '../group/CreateGroup';
import DisplayGroup from '../group/DisplayGroup';
import SelectGroup from '../group/SelectGroup';
import DisplayHomeGroup from '../group/DisplayHomeGroup';
import MembersGroup from '../group/MembersGroup';
import DisplayMember from '../member/DisplayMember';
import GenerateInviteCode from '../member/GenerateInviteCode';
import MemberHome from '../member/MemberHome';
import GroupHome from '../group/GroupHome';
import ProfileHome from '../user/ProfileHome';
import NewInvite from '../member/NewInvite';
import Home from '../places/Home';
import CreatePlace from '../places/CreatePlace';
import GroupPlaces from '../places/GroupPlaces';
import HomeSettings from '../settings/HomeSettings';

import  { createStackNavigator }  from 'react-navigation';


export const Stack = createStackNavigator({
    CreatePlace: { 
        screen: CreatePlace,
        headerMode: 'none',
        navigationOptions: {
            header: null
        }
    },
    Home: { 
        screen: Home,
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
    
    ProfileHome: { 
        screen: ProfileHome,
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
    GroupHome: { 
        screen: GroupHome,
        headerMode: 'none',
        navigationOptions: {
            header: null
        }
    },
   
    MemberHome: { 
        screen: MemberHome,
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
  

    
   
   
    
   
  
    
   
    
    
    GenerateInviteCode: { 
        screen: GenerateInviteCode,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
    

    HomeSettings: { 
        screen: HomeSettings,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
   

   
    

    /*LocationPlaces: { 
        screen: LocationPlaces,
        headerMode: 'none',
        navigationOptions: {
            header: null
        }
    },*/

   
    Register: { 
        screen: Register,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
    
    
    SelectGroup: { 
        screen: SelectGroup,
        headerMode: 'none',
        navigationOptions: {
            header: null
        },
        
    },
   /*
    
    AddMemberGroup: { 
        screen: AddMember,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },*/
   
   
    NewInvite: { 
        screen: NewInvite,
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
   
    
    
  
    DisplayHomeGroup: { 
        screen: DisplayHomeGroup,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },
   
    
    /*
    
    InfoMember: { 
        screen: InfoMember,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },*/
   
    
    
    /*
    EditGroup: { 
        screen: EditGroup,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },*/
    MembersGroup: { 
        screen: MembersGroup,
        headerMode: 'none',
        navigationOptions: {
            header: null
        } 
    },initialRouteName: 'Home'

  });



/*
  
let routeConfig={
    InfoMember: { 
        screen: InfoMember,
    },
    LocationPlaces: { 
        screen: LocationPlaces,
    },
}

let tabNavConfig={
    tabBarPosition:'top',
    animationEnabled: true,
}

export const MemberTab = TabNavigator(routeConfig,tabNavConfig);*/
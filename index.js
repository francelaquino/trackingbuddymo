import  React  from 'react';
import { AppRegistry } from 'react-native';
import DisplayGroup from './components/group/DisplayGroup';
import DisplayHomeGroup from './components/group/DisplayHomeGroup';
import EditGroup from './components/group/EditGroup';
import AddMember from './components/group/AddMember';
import MembersGroup from './components/group/MembersGroup';
import DisplayMember from './components/member/DisplayMember';
import GenerateInviteCode from './components/member/GenerateInviteCode';
import InfoMember from './components/member/InfoMember';
import NewInvite from './components/member/NewInvite';
import HomePlaces from './components/places/HomePlaces';
import App from './App';

//import Navigation from './components/shared/Navigation';
import { DrawerNavigator } from 'react-navigation'

const drawerNavigator= DrawerNavigator({
  HomePlaces:{
    screen: HomePlaces,
  },
  DisplayMember: { 
    screen: DisplayMember,
  },
  DisplayGroup: { 
    screen: DisplayGroup,
  },
})
const TrackingApp =()=>(
        <drawerNavigator/>
)

  
AppRegistry.registerComponent('tracking', () => App);
  


/*
const tracking =()=>(
    <Provider store={store}>
        <Navigation/>
    </Provider>
)

AppRegistry.registerComponent('tracking', () => tracking);*/

import  React  from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { DrawerNavigator } from 'react-navigation'
/*import DisplayGroup from './components/group/DisplayGroup';
import DisplayHomeGroup from './components/group/DisplayHomeGroup';
import EditGroup from './components/group/EditGroup';
import AddMember from './components/group/AddMember';
import MembersGroup from './components/group/MembersGroup';
import DisplayMember from './components/member/DisplayMember';
import GenerateInviteCode from './components/member/GenerateInviteCode';
import InfoMember from './components/member/InfoMember';
import NewInvite from './components/member/NewInvite';
import HomePlaces from './components/places/HomePlaces';
import App from './App';*/
import Navigation from './components/shared/Navigation';


/*const TrackingApp =()=>(
        <Navigation/>
)

  
AppRegistry.registerComponent('tracking', () => TrackingApp);
  


*/
const tracking =()=>(
    <Provider store={store}>
        <Navigation/>
    </Provider>
)

AppRegistry.registerComponent('tracking', () => tracking);

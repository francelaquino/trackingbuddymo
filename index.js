import  React  from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { DrawerNavigator } from 'react-navigation'

import Navigation from './components/shared/Navigation';
var userdetails = require('./components/shared/userDetails');






const tracking =()=>(
    <Provider store={store}>
        <Navigation/>
    </Provider>
)

AppRegistry.registerComponent('tracking', () => tracking);

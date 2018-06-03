import  React  from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './components/shared/Navigation';
import store from './store';

const TrackingApp =()=>(
        <Navigation/>
)
/*export default TrackingApp extends React.Component {
  
    render() {
      return (
        <Provider store={store}>
          <Navigation />
        </Provider>
      );
    }
}*/
  
  AppRegistry.registerComponent('tracking', () => TrackingApp);
  


/*
const tracking =()=>(
    <Provider store={store}>
        <Navigation/>
    </Provider>
)

AppRegistry.registerComponent('tracking', () => tracking);*/

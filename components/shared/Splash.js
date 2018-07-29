import React, { Component } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { setConnection } from '../../actions/connectionActions';
const { width, height } = Dimensions.get('window');



class Splash extends Component {


    render() {
        if (this.props.hide) {
            return (
                <View style={{  zIndex: 99999, height: height+30, backgroundColor:'#16a085' }} >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image style={{ height: 200, marginTop: -150 }} resizeMode='contain' source={require('../../images/logo_splash.png')} />
                    <Text style={{ fontSize: 15, color: 'white',position:'absolute',bottom:30 }}>Tracking Buddy</Text>

                </View>
               
                    
                </View >
            )
        } else {
            return null;
        }
    }
}




const mapStateToProps = state => ({

})

Splash = connect(mapStateToProps, { })(Splash);

export default Splash;


     /*async componentDidMount() {
         let userid = await AsyncStorage.getItem("userid");
         let email =  await AsyncStorage.getItem("email");
         let firstname = await AsyncStorage.getItem("firstname");
         let lastname = await AsyncStorage.getItem("lastname");
        
         setTimeout(() => {
             if (userid === "" || userid === null) {
                


                
                 this.props.navigation.navigate('Login');
            } else {
                userdetails.userid = userid;
                userdetails.email = email;
                userdetails.firstname = firstname;
                userdetails.lastname = lastname;
                this.props.saveLocationOnline();
                setTimeout(() => {
                    this.props.displayHomeMember();
                    this.props.navigation.navigate('Home');
                }, 1000);
               

            }
           
        }, 1000);
    }*/



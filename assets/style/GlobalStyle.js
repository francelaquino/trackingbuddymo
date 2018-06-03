'use strict';
import { theme } from '../style/Theme'
var React = require('react-native');

var { StyleSheet} = React;
module.exports = StyleSheet.create({
    containerWrapper: {
        backgroundColor:'white',
    },
    header: {
        backgroundColor: theme.primaryColor,
    },
    headerMenu: {
        width:40,
        flex:0,
    },
    headerLeft: {
        width:40,
        flex:0,
    },
    headerRightIcon: {
        width:40,
        color:'white',
        flex:0,
    },
    container: {
        backgroundColor:'white',
        flex: 1,
        alignSelf: "center",
        flexDirection:'column',
        width:'100%',
    },
   
    item: {
        borderColor:'transparent',
        backgroundColor:'transparent',
    },
    inputicon:{
        backgroundColor:'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButton:{
        backgroundColor:theme.primaryColor,
        marginBottom:10,
        width:'90%',
        alignSelf: "center",
    },
    secondaryButtonDisabled:{
        backgroundColor:theme.primaryColorDisabled,
        marginBottom:10,
        width:'90%',
        alignSelf: "center",
    },
    deleteButton:{
        backgroundColor:theme.deleteColor,
        marginBottom:10,
        width:'90%',
        alignSelf: "center",
    },
    textinput:{
        flex: 1,
        paddingTop:0,
    },
    textinputCenter:{
        flex: 1,
        paddingTop:0,
        fontSize:25,
        textAlign:'center',
        backgroundColor:'transparent',
        color:'green'
    },
    primaryBKColor:{
        backgroundColor:theme.primaryColor,
    },
    icon:{
        color:'white',
    },
    thumbnail:{
        width:20,
    },
    heading1:{
        color:'#141414',
        fontSize: 17,
    },
    heading2:{
        color:'#313030',
        fontSize: 13,
        fontWeight: 'bold',
    },
    font11:{
        fontSize:11,
    },
    font12:{
        fontSize:12,
    },
    font13:{
        fontSize:13,
    },
    font14:{
        fontSize:14,
    },
    avatarcontainersmall:{
        borderRadius: 50,
        backgroundColor:theme.primaryColor,
        padding:2,
        width:44,
        height:44,
    },
    avatarcontainer:{
        borderRadius: 50,
        backgroundColor:theme.primaryColor,
        padding:2,
        width:50,
        height:50,
    },
    avatarcontainerbottom:{
        borderRadius: 50,
        backgroundColor:'#e2e0e0',
        padding:2,
        width:40,
        height:40,
    },
    avatar:{
        width:46,
        height:46,
    },
    avatarsmall:{
        width:40,
        height:40,
    },
    avatarbottom:{
        width:36,
        height:36,
    },
    label:{
        fontSize:14,
    },
    value:{
        color:'#313030',
        fontSize: 17,
    },
    cardNavBar: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: 'red',
        width:'100%',
        alignItems:'center',
       
    },
    cardNavFooter:{
        borderTopWidth:.5,
        borderTopColor:'#e4e5e5',
        width:'98%',
        alignSelf: "center",
        height:35
    },
    navBarWrapperYellow:{
        height:28,
        width:28,
        borderRadius: 15,
        backgroundColor:'#edc901',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navBarWrapperPrimary:{
        height:28,
        width:28,
        borderRadius: 15,
        backgroundColor:theme.primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navBarWrapperTransparent:{
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navBarButton:{
        flex: 1,
        alignItems: 'center',
        padding:2,
    },
    navBarIcon:{
        fontSize:25,
        color:theme.primaryColor,
        alignItems:'center'
    },
    navBarLabel:{
        fontSize:10,
        height:15,
        color:'#3f3e3e',
    },
    deleteButtonSmall:{
        color:'white',
        textAlign:'center',
        marginBottom:20,
        fontSize:10,
        backgroundColor:'red',
        borderRadius:60,
        paddingTop:3,
        height:20,
        width:80,
        alignSelf: "center", 
        flexDirection:'column'
    }
  

});



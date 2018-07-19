
import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, ScrollView,TextInput, TouchableOpacity, ToastAndroid, Alert, Image, Picker } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button, Icon, Left, Right, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import {  getProfile } from '../../actions/userActions' ;
import {  getCountrries } from '../../actions/memberActions' ;
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation'
import Loading  from '../shared/Loading';
import ImagePicker from 'react-native-image-picker';
var globalStyle = require('../../assets/style/GlobalStyle');
var registrationStyle = require('../../assets/style/Registration');


class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname:'',
            email:'',
            mobileno:'',
            middlename:'',
            lastname:'',
            mobilecountrycode:'',
            mobilecountry:'Country Code',
            emailError:false,
            passwordError:false,
            retypepasswordError:false,
            mobilenoError:false,
            firstnameError:false,
            middlenameError:false,
            lastnameError:false,
            countries:{
                id: '',
                countrycode: '',
                country: ''
              }
    
        };
      }

      
    async componentWillMount() {
        this.props.getCountrries();
        this.props.getProfile().then(()=>{
            this.setState({
                firstname:this.props.profile.firstname,
                email:this.props.profile.email,
                mobileno:this.props.profile.mobileno,
                middlename:this.props.profile.middlename,
                lastname:this.props.profile.lastname,
                mobilecountrycode:this.props.profile.mobilecountrycode,
            })
        }).catch(function(err) {
        });


    }

     
  

    
    loading(){
        return (
          <Loading/>
        )
    }
    setCountry(index){
        this.setState({
          mobilecountrycode:this.state.countries[index].id,
          mobilecountry:this.state.countries[index].country
        })
        
      }
  selectPhoto() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else if (response.customButton) {
      }
      else {
        let source = { uri: response.uri };
                
        this.setState({
          avatarsource: source
        });
      }
    });
  }


    ready(){
        const countries =this.props.countries.map(country=>(
            <Picker.Item key={country.id} label={country.country} value={country.id} />
              ));
        return (
            
            <View style={globalStyle.container}>
           
            <ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
				

					<View style={registrationStyle.container}>
                        <View  style={{marginBottom:20}}>
						<TouchableOpacity onPress={this.selectPhoto.bind(this)}>
							<View style={registrationStyle.avatarContainer}>
							{ this.state.avatarsource === '' ? <Text style={{fontSize:10,marginTop:32,color:'white'}}>Select a Photo</Text> :
							<Image style={registrationStyle.avatar} source={this.state.avatarsource} />
							}
							</View>
						</TouchableOpacity>
					</View>
					
						<Item  stackedLabel  style={registrationStyle.item}  >
							<Label style={registrationStyle.stackedlabel}>Email</Label>
							<View style={registrationStyle.inputicon}>  
								<TextInput  style={registrationStyle.textinput} 
								name="email" autoCorrect={false}
								value={this.state.email}
								onChangeText={email=>this.setState({email})}/>
								<MaterialIcons onPress={()=>this.required()}  name='error-outline' color="red"  size={22} style={[registrationStyle.iconError,(this.state.emailError && this.state.email=='' ) && registrationStyle.show]} />
							</View>
						</Item>
					
					

						<Item  stackedLabel style={registrationStyle.item}>
							<Label style={registrationStyle.stackedlabel}>First Name</Label>
							<View style={registrationStyle.inputicon}>  
								<TextInput  style={registrationStyle.textinput} 
								name="firstname" autoCorrect={false}
								value={this.state.firstname}
								onChangeText={firstname=>this.setState({firstname})}/>
								<MaterialIcons onPress={()=>this.required()}  name='error-outline' color="red"  size={20} style={[registrationStyle.iconError,(this.state.firstnameError && this.state.firstname=='' ) && registrationStyle.show]} />
							</View>
						</Item>
					
						<Item  stackedLabel style={registrationStyle.item}>
							<Label style={registrationStyle.stackedlabel}>Middle Name</Label>
							<View style={registrationStyle.inputicon}>  
								<TextInput  style={registrationStyle.textinput} 
								name="middlename" autoCorrect={false}
								value={this.state.middlename}
								onChangeText={middlename=>this.setState({middlename})}/>
								</View>
						</Item>
					
						<Item  stackedLabel style={registrationStyle.item}>
							<Label style={registrationStyle.stackedlabel}>Last Name</Label>
							<View style={registrationStyle.inputicon}>  
								<TextInput  style={registrationStyle.textinput} 
								name="lastname" autoCorrect={false}
								value={this.state.lastname}
								onChangeText={lastname=>this.setState({lastname})}/>
								<MaterialIcons onPress={()=>this.required()}  name='error-outline' color="red"  size={20} style={[registrationStyle.iconError,(this.state.lastnameError && this.state.lastname=='' ) && registrationStyle.show]} />
							</View>
					</Item>
						<Item  stackedLabel style={registrationStyle.item}>
							<Label style={registrationStyle.stackedlabel}>Mobile No.</Label>
							<View style={registrationStyle.inputicon}>  
								<TextInput  style={registrationStyle.textinput} 
								name="mobileno" autoCorrect={false}
								value={this.state.mobileno}
								onChangeText={mobileno=>this.setState({mobileno})}/>
								<MaterialIcons onPress={()=>this.required()}  name='error-outline' color="red"  size={20} style={[registrationStyle.iconError,(this.state.mobilenoError && this.state.mobileno=='' ) && registrationStyle.show]} />
							</View>
						</Item>
					<Item    style={registrationStyle.subitem}  >
					<View >
						<Label style={registrationStyle.countrycode}>{this.state.mobilecountry}
						
						</Label>
						<Picker
							style={{position:'absolute',top:-10, width: 400,height:40,opacity:100,color:'transparent',zIndex: 1 }}
							onValueChange={(itemValue, itemIndex) => this.setCountry(itemIndex)}>
							
                                {countries}
						</Picker>
						</View>
						<MaterialIcons   name='arrow-drop-down' color="gray"  size={20} />
					</Item>

						
					
					</View>
				</ScrollView>
            
                    <List>
                    
                        <ListItem >
                        <Body>
                        <Text style={globalStyle.label}>First Name</Text>
                        <Input style={globalStyle.textinput} value={this.state.firstname}  autoCorrect={false} onChangeText={firstname=>this.setState({firstname})} name="firstname"/>
                        </Body>
                        </ListItem>
                        <ListItem >
                        <Body>
                        <Text style={globalStyle.label}>Middle Name</Text>
                        <Text style={globalStyle.value} note>{this.props.profile.middlename}</Text>
                        </Body>
                        </ListItem>
                        <ListItem >
                        <Body>
                        <Text style={globalStyle.label}>Last Name</Text>
                        <Text style={globalStyle.value} note>{this.props.profile.lastname}</Text>
                        </Body>
                        </ListItem>
                        <ListItem >
                        <Body>
                        <Text style={globalStyle.label}>Mobile No.</Text>
                        <Text style={globalStyle.value} note>{this.props.profile.mobileno}</Text>
                        </Body>
                        </ListItem>
                        <ListItem >
                        <Body>
                        <Text style={globalStyle.label}>Email</Text>
                        <Text style={globalStyle.value} note>{this.props.profile.email}</Text>
                        </Body>
                        </ListItem>
                            
                        <ListItem last>
                        <Button 
                        bordered light full rounded style={globalStyle.secondaryButton}>
                        <Text style={{color:'white'}}>Update Profile</Text>
                        </Button>
                        </ListItem>
                        </List>
                </View>
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
    countries: state.fetchMember.countries,
    profile: state.fetchUser.profile,
    isLoading:state.fetchUser.isLoading,
  })
  
  
  UserProfile=connect(mapStateToProps,{getProfile,getCountrries})(UserProfile);
  
export default UserProfile;
  


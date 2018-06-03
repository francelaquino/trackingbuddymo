
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform,  StyleSheet,  View, TextInput, TouchableOpacity,ScrollView,Picker, Alert, ToastAndroid, Form, TouchableHighlight ,Image } from 'react-native';
import { Root, Container, Header, Body, Title, Item, Input, Label, Button,Text, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
var registrationStyle = require('../assets/style/Registration');



class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isLoading:true,
        email:'',
        password:'',
        retypepassword:'',
        mobileno:'',
        firstname:'',
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
        avatar:'',
        avatarsource: '',

        countries:{
          id: '',
          countrycode: '',
          country: ''
        }

        
        
    };
    
  
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



  componentWillMount() {
    this.initialize();
  }
       
  initialize(){
    let countryRef = firebase.database().ref().child('countries').orderByChild("country");
      countryRef.on('value', (dataSnapshot) => {
        let countries=[];
        if(dataSnapshot.exists){
            dataSnapshot.forEach(function(child) {
                countries.push({
                  id: child.val().id,
                  countrycode: child.val().countrycode,
                  country: child.val().countrycode+" "+ child.val().country
                })
                
            });
            this.setState({countries: countries,isLoading:false});

        }
    
    })
  }





  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  
  
  onSubmit(){
    
   
    var isvalid=true;

    if(this.state.email==""){
    	this.setState({emailError:true});
      	isvalid=false;
    }
    
    if(this.state.password==""){
    	this.setState({passwordError:true});
    	isvalid=false;
    }

    
    if(this.state.mobileno==""){
    	this.setState({mobilenoError:true});
    	isvalid=false;
    }
    
    if(this.state.firstname==""){
         this.setState({firstnameError:true});
         isvalid=false;
    }
    
    if(this.state.lastname==""){
          this.setState({lastnameError:true});
          isvalid=false;
    }
    

    if(this.state.password!=this.state.retypepassword){
          Alert.alert('','Password mismatch');
          isvalid=false;
	}
	


    if(isvalid){
      
        if(this.state.avatarsource!=""){
          let avatarlink=this.state.email+'.jpg';

          const ref = firebase.storage().ref("/member_photos/"+avatarlink);
          const unsubscribe = ref.putFile(this.state.avatarsource.uri.replace("file:/", "")).on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
              
          },
          (error) => {
          unsubscribe();
          },
          (res) => {
            this.setState({avatar:res.downloadURL })
            this.sendSubmit();
          });
        }else{
          this.sendSubmit();
        }
      }
  }
  sendSubmit(){
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email,this.state.password).then((res)=>{
      let uid=res.user.uid;
      let userRef = firebase.database().ref().child("users/"+uid);

      userRef.set({ 
        email : this.state.email,
        firstname : this.state.firstname,
        middlename: this.state.middlename,
        lastname: this.state.lastname,
        mobileno: this.state.mobileno,
        mobilecountrycode: this.state.mobilecountrycode,
		avatar: this.state.avatar,
		datecreated: Date.now(),
		dateupdated: Date.now(),
		invitationcode:'',

	  });
	  this.resetState();
	  ToastAndroid.showWithGravityAndOffset("Registration successfully completed",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);

    }).catch(function(e){
      ToastAndroid.showWithGravityAndOffset(e.Error,ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
    })
  }
  required(){
	ToastAndroid.showWithGravityAndOffset("Please fill required field",ToastAndroid.LONG,ToastAndroid.BOTTOM, 25, 50);
  }

  resetState(){
	  this.setState({
		email:'',
        password:'',
        retypepassword:'',
        mobileno:'',
        firstname:'',
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
        avatar:'',
		avatarsource: '',
	  })
  }

  setCountry(index){
    this.setState({
      mobilecountrycode:this.state.countries[index].id,
      mobilecountry:this.state.countries[index].country
    })
    
  }
  loading(){
	  return (
		<Root>
		<Container style={registrationStyle.containerWrapper}>
		<View>
			<Text>Loading</Text>
		</View>
		</Container>
		</Root>
	  )
  }
  ready(){
		const { navigate } = this.props.navigation;
		const countries =this.state.countries.map(country=>(
		<Picker.Item key={country.id} label={country.country} value={country.id} />
	  	));
	  return (
			<Root>
			<Container style={registrationStyle.containerWrapper} >
			<ScrollView  contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={"always"}>
					<View  style={registrationStyle.header}>
						<TouchableOpacity onPress={this.selectPhoto.bind(this)}>
							<View style={registrationStyle.avatarContainer}>
							{ this.state.avatarsource === '' ? <Text style={{fontSize:10,marginTop:32,color:'#32acce'}}>Select a Photo</Text> :
							<Image style={registrationStyle.avatar} source={this.state.avatarsource} />
							}
							</View>
						</TouchableOpacity>
					</View>
						
					<View style={registrationStyle.container}>
					
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
							<Label style={registrationStyle.stackedlabel}>Password</Label>
							<View style={registrationStyle.inputicon}>  
								<TextInput  style={registrationStyle.textinput } 
								name="password" autoCorrect={false}
								value={this.state.password} secureTextEntry
								onChangeText={password=>this.setState({password})}/>
								<MaterialIcons onPress={()=>this.required()}  name='error-outline' color="red"  size={20} style={[registrationStyle.iconError,(this.state.passwordError && this.state.password=='' ) && registrationStyle.show]} />
							</View>
						</Item>


						<Item  stackedLabel style={registrationStyle.item} >
							<Label style={registrationStyle.stackedlabel}>Re-type Password</Label>
							<View style={registrationStyle.inputicon}>  
								<TextInput  style={registrationStyle.textinput} 
								name="retypepassword" autoCorrect={false}
								value={this.state.retypepassword} secureTextEntry
								onChangeText={retypepassword=>this.setState({retypepassword})}/>
								<MaterialIcons onPress={()=>this.required()}  name='error-outline' color="red"  size={20} style={[registrationStyle.iconError,(this.state.retypepasswordError && this.state.retypepassword=='' ) && registrationStyle.show]} />
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

						
					<View style={{justifyContent: 'center',alignItems: 'center',marginTop:30}}>
						<Button 
							onPress={()=>this.onSubmit()}
							full rounded style={registrationStyle.registrationbutton}>
							<Text>Register</Text>
						</Button>
						<TouchableHighlight  style={{marginTop:20}} underlayColor={'transparent'} onPress={() =>navigate('Login')}>
						<Text style={registrationStyle.haveaccount}>Already have an acccount? <Text style={registrationStyle.loginButton}>Login</Text></Text>
						</TouchableHighlight>
						
					</View>
					</View>
				</ScrollView>
				</Container>
			</Root>
	  )
  }
  render() {
	  if(this.state.isLoading){
		  return this.loading();
	  }else{
		  return this.ready();
	  }
  }
}



export default Register;

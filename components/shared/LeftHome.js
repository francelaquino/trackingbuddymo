
import React, { Component } from 'react';
import { Button, Icon,Left } from 'native-base';

var globalStyle = require('../../assets/style/GlobalStyle');


const LeftHome =()=> {
    return (
        <Left style={globalStyle.headerMenu} >
            <Button transparent >
                <Icon size={30} name='menu' />
            </Button> 
        </Left>
    )
}


  
export  { LeftHome };

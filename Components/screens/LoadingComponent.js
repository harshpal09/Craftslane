import { Text, View, Image, ImageBackground } from 'react-native'
import React, { Component } from 'react';
import { portraitStyles } from '../../Style/globleCss';

export default class LoadingComponent extends Component {
  render() {
    return (
        // <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover">
        <View style={portraitStyles.loadingScreen}>
            <Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.loadingImage} />
        </View> 
        // </ImageBackground>
    )
  }
}
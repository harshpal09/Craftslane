import { View, Image } from 'react-native'
import React from 'react'
import { portraitStyles } from '../../Style/globleCss';

export default function CarouselLoading() {
  return (
    <View style={portraitStyles.carouselLoadingScreen}>
    <Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.loadingImage} />
</View> 
  )
}
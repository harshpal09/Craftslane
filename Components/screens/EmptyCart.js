import { Text, View, Pressable, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { portraitStyles } from '../../Style/globleCss'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class EmptyCart extends Component {

  render() {
    console.log("Empty cart component")
    return (
      <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>

          <View style={{margin:10}}>
            <MaterialCommunityIcons name="cart-remove" color={'#c59a6a'} size={150} />
          </View>
          {/* 
      <View style={portraitStyles.centre_heading_container}> */}

          <View style={{margin:10}}>
            <Text style={{ fontSize: 30, fontFamily: 'Baskervville-Italic',color:'#6D6D6D' }}>OOPS!</Text>
          </View>

          <View style={{margin:10}}>
            <Text style={portraitStyles.headerText }>Your Cart is Currently empty.</Text>
          </View>



          {/* {/ </View> /} */}
        </View>

      </SafeAreaView>

    )
  }
}
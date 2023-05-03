import { Text, View, Pressable, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import { portraitStyles } from '../../Style/globleCss'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class EmptyCart extends Component {
  render() {
    return (
      <SafeAreaView style={portraitStyles.screenBackground}>
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>

          <View style={{margin:10}}>
            <MaterialCommunityIcons name="cart-remove" color={'#c59a6a'} size={150} />
          </View>
          {/* 
      <View style={portraitStyles.centre_heading_container}> */}

          <View style={{margin:10}}>
            <Text style={{ fontSize: 30, fontFamily: 'LibreBaskerville-Italic' }}>OOPS!</Text>
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
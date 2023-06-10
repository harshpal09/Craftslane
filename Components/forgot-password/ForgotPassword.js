// In App.js in a new project
import { View, Text, ScrollView, Image, TextInput, ImageBackground, SafeAreaView, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto'
import React, { Component } from 'react';
import { portraitStyles } from "../../Style/globleCss";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"



class ForgotPassword extends Component {
  constructor() {
    super()
    this.state = {
      all_data: {},
      toggle: undefined,
    }
  }
  async forgotPassword() {

    this.setState({ toggle: false })

    const data = {
      email: this.state.email
    }

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }

    await axios.post('https://www.craftslane.com?route=api/customforgotten/index&key=Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q&os_type=android', data, header).then((response) => this.setState({ all_data: response.data }))

    this.setState({ toggle: true })

    if (this.state.all_data.status == 200) {
      return this.props.navigation.navigate('success');
    }

    else {
      showMessage({
        message: this.state.all_data.message,
        type: 'danger',
        color: 'white',
        icon: props => <MaterialIcons name="error-outline" size={15} color={'white'} {...props} />,
        // backgroundColor: 'red',
        titleStyle: { fontSize: 18 }
      })
    }
  }

  render() {
    return (
      <SafeAreaView style={portraitStyles.screenBackground}>
        <KeyboardAvoidingView>
        <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" >
          <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false}>
            {/* <View style={portraitStyles.logoContainer}>
              <Image style={portraitStyles.logo} source={require('../../assets/Craftslane_logo.png')} />
            </View> */}
            <View style={{ width: '100%', borderTopWidth: 1, borderColor: '#bba890' }}></View>
            <View style={portraitStyles.iconContainer} >
              <Fontisto name="unlocked" color={'#B48D56'} size={160} />
            </View>
            <View style={portraitStyles.welcomeTextContainer}>
              <View >
                <Text style={portraitStyles.welcomeText}>Forgot Your Password?</Text>
              </View>
              <View style={{ width: '100%' }}>
                <Text style={portraitStyles.text}>Please enter the Email Address associated with your Account. Click Continue to have a Password reset link emailed to you.</Text>
              </View>
            </View>
            <KeyboardAvoidingView behavior="padding">
              <View style={portraitStyles.containLabelAndInput}>
                <TextInput style={portraitStyles.input} placeholder={'Enter your email'} placeholderTextColor='grey' onChangeText={(text) => this.setState({
                  email: text
                })} />
              </View>
              
              <View style={portraitStyles.forgotButtonContainer}>
                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.button} onPress={() => this.forgotPassword()} disabled={this.state.toggle == false ? true : false} >
                  {this.state.toggle == false ? <ActivityIndicator size={'small'} color={'#fff'} /> : <Text style={portraitStyles.buttonText}>Continue</Text>}
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>

          </ScrollView>
        </ImageBackground>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}



export default ForgotPassword;



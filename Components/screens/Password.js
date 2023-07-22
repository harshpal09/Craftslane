import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, SafeAreaView,ImageBackground, Pressabl, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import UiOrientation from '../UiOrientation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';

class Password extends Component {
  state = {
    toggle: undefined,
    password: '',
    confirm_password: '',
    response_data: {},
    hide_and_show1: true,
    hide_and_show2: true,
    hide_and_show_icon_name1: 'eye-slash',
    hide_and_show_icon_name2: 'eye-slash',
  }
  hideAndShow() {
    this.state.hide_and_show1 ? this.setState({ hide_and_show1: false }) : this.setState({ hide_and_show1: true });
    this.state.hide_and_show_icon_name1 == 'eye-slash' ? this.setState({ hide_and_show_icon_name1: 'eye' }) : this.setState({ hide_and_show_icon_name1: 'eye-slash' })
}
hideAndShow1() {
    this.state.hide_and_show2 ? this.setState({ hide_and_show2: false }) : this.setState({ hide_and_show2: true });
    this.state.hide_and_show_icon_name2 == 'eye-slash' ? this.setState({ hide_and_show_icon_name2: 'eye' }) : this.setState({ hide_and_show_icon_name2: 'eye-slash' })

}

  async submitFrom() {
    this.setState({ toggle: false })
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })

      let token = await AsyncStorage.getItem('token');
      let parsed2 = JSON.parse(token);

      this.setState({token: parsed2})
    }
    catch (error) {
      Alert.alert(error)
    }
    data = {
      password: this.state.password,
      confirm: this.state.confirm_password
    }
    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }

    // console.warn(data);
    await axios.post(this.state.data.url + 'customchangepassword/index&key=' + this.state.data.key + '&token=' + this.state.token.token + '&os_type=android', data, header)
      .then((resp) => this.setState({ response_data: resp.data }))
    this.setState({ toggle: true })
    // console.warn(this.state.response_data);
    if (this.state.response_data.status != 200) {
      showMessage({
        message: this.state.response_data.message,
        // duration: 4000,
        type: 'danger',
        color: 'white',
        icon: props => <MaterialIcons name="error-outline" size={16} color={'white'} {...props} />,
        titleStyle: { fontSize: 18 }
      })
    }
    else {

      showMessage({
        message: this.state.response_data.message,
        duration: 4000,
        type: 'success',
        color: 'white',
        icon: props => <MaterialIcons name="done-outline" size={18} color={'white'} {...props} />,
        titleStyle: { fontSize: 18 }
      })


    }



  }
  render() {
    // console.warn(this.state.help)
    return (
      <SafeAreaView style={portraitStyles.screenBackgroundTab}>
        {/* {this.state.notifications.length == false ? <View style={portraitStyles.navigationLoadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View> : */}
        <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" >
        <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false}>
          <View style={portraitStyles.headerMiddleTextContainer}>
            <Text style={portraitStyles.profileHeaderMiddleText}>Manage your Personal Information and change your password Settings</Text>
          </View>
          <View style={portraitStyles.containLabelAndInput}>
            <TextInput style={portraitStyles.passwordInput} secureTextEntry={this.state.hide_and_show1} placeholder="Password" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ password: text })} />
            <FontAwesome name={this.state.hide_and_show_icon_name1} size={20} style={{ position: 'absolute', left: DeviceInfo.isTablet() ? Dimensions.get('screen').width / 1.2 : Dimensions.get('screen').width / 1.2 }} color={'grey'} onPress={() => this.hideAndShow()} />
          </View>
          <View style={portraitStyles.containLabelAndInput}>
            <TextInput style={portraitStyles.input} secureTextEntry={this.state.hide_and_show2} placeholder="Confirm Password" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ confirm_password: text })} />
            <FontAwesome name={this.state.hide_and_show_icon_name2} size={20} style={{ position: 'absolute', left: DeviceInfo.isTablet() ? Dimensions.get('screen').width / 1.2 : Dimensions.get('screen').width / 1.2 }} color={'grey'} onPress={() => this.hideAndShow1()} />
          </View>
          <TouchableOpacity activeOpacity={0.9} style={portraitStyles.logoutButtonContainer} onPress={() => this.submitFrom()} disabled={this.state.toggle == false ? true : false}>

            <View style={portraitStyles.button} >
              {this.state.toggle == false ? <ActivityIndicator size="small" color="#fff" /> : <Text style={portraitStyles.buttonText}>Save</Text>}
            </View>
          </TouchableOpacity>
        </ScrollView>
        </ImageBackground>
        {/* } */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({})

export default Password;

import { View, Text,TouchableOpacity,TextInput , Alert} from 'react-native'
import React, { useState, useEffect } from 'react';
import Modal from "react-native-modal";
import { portraitStyles } from '../Style/globleCss';
import renderIf from './screens/renderIf';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalComponent() {
  const [showModel, setModalVisible] = useState(false);
  const tokenAvailable = useSelector(
    (state) => state.tokenAvailable
  );
  const [mobile, setNumber] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // console.log("UseEffect val =>", val)
    isModelVisible();
  }, [])


  const isModelVisible = async () => {

    if (tokenAvailable) {
      setModalVisible(false);
      console.log(showModel)
    } else {
      setModalVisible(true);
      console.log(showModel);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    // setShowMessage(true); 
  };

  getCode = async () => {

    // dispatch(checkToken(true))
    setModalVisible(false);
    // console.log('After dispatch =>', tokenAvailable)

    let parsed = {}
    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

      console.log(parsed)

    }
    catch (error) {
      Alert.alert(error)
    }
   
    console.log("Send OTP url=>",parsed.url + "customlogin/send_otp&key=" + parsed.key)
    let resp = await axios.get(parsed.url + "customlogin/send_otp&key=" + parsed.key + "&mobile=" + mobile)

     console.log("OTP response=>",resp.data)

    if (resp.data.status == 200) {
      console.log('success')
      setModalVisible(false)
      navigation.navigate('otp', { mobile: mobile + "" })
    } else {
      console.log("failure")
      Alert.alert('Alert ', resp.data.success, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }

  }

  return (
    <View style={{ flex: 1 }}>


<Modal isVisible={showModel}
        // onBackdropPress={() => setModalVisible(false)}
        style={{ width: '100%', marginLeft: 0, marginBottom: 0 }}
      >
        <View style={portraitStyles.modalContainer}>

          <View style={{ padding: 20}}>
            <Text style={portraitStyles.loginWelcomeText}>Welcome to Craftslane</Text>
          </View>


          <TouchableOpacity style={portraitStyles.closeContainer} onPress={closeModal} >
            <Text style={portraitStyles.closeIcon}>X</Text>
          </TouchableOpacity>

          <View style={{paddingBottom:20  }}>
            <Text style={portraitStyles.mobileMessage}>Please enter your mobile number</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>

            <View style={portraitStyles.mobileFieldContainer}>
              <Text style={{ fontSize: 18, padding: 10 }}>+91</Text>
              <TextInput style={{ fontSize: 18, padding: 8, width: '70%' }} placeholder='Enter mobile number' keyboardType='numeric'
                onChangeText={(text) => setNumber(text)}
              ></TextInput>
            </View>

            <View style={portraitStyles.otpButtonContainer}>
              <TouchableOpacity style={portraitStyles.otpButton} onPress={() => getCode()}>
                <Text style={{ color: 'white' }} >Get OTP</Text>
              </TouchableOpacity>
            </View>
          </View>



          <View style={{ padding: 15, marginTop:10 }}>
            <Text style={{ fontSize: 18 }}>OR</Text>
          </View>


          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }} onPress={() => navigation.navigate('login', setModalVisible(false))}>
            <Text style={{ fontSize: 18, color: '#B48D56', fontWeight: '400', fontFamily: 'Georgia' }}>Login with mobile/email and password</Text>
          </TouchableOpacity>

          <View style={{ padding: 15,}}>
            <Text style={{ fontSize: 18 }}>OR</Text>
          </View>

          <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('signup', setModalVisible(false))}>
            <Text style={{ fontSize: 18, color: '#B48D56', fontWeight: '400', fontFamily: 'Georgia', }}>New Sign up</Text>
          </TouchableOpacity>

          {/* <Button title="Hide modal" onPress={() => { dispatch(checkToken(false)) }} /> */}
        </View>
      </Modal>

      {renderIf(true)(
        <View style={portraitStyles.screenBackgroundStackTab}>
          <Text style={portraitStyles.loginMessageText}>Please login to open this page</Text>
          <TouchableOpacity
            style={portraitStyles.loginButton}
            onPress={() => {
              setModalVisible(true);
              // setShowMessage(false); 
            }}
          >
            <Text style={portraitStyles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
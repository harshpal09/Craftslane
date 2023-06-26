import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { portraitStyles } from '../Style/globleCss';

export default function ModalComponent({ visible, closeModal }) {
  if (!visible) {
    return null;
  }

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={true}
        onBackdropPress={closeModal}
        style={{ width: '100%', marginLeft: 0, marginBottom: 0 }}
      >
        <View style={portraitStyles.modalContainer}>
          <View style={{ paddingTop: 20 }}>
            <Text style={portraitStyles.loginWelcomeText}>Welcome to Craftslane</Text>
          </View>

          <TouchableOpacity style={portraitStyles.closeContainer} onPress={closeModal} >
            <Text style={portraitStyles.closeIcon}>X</Text>
          </TouchableOpacity>

          <View style={{ padding: 10 }}>
            <Text style={portraitStyles.mobileMessage}>Please enter your mobile number</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={portraitStyles.mobileFieldContainer}>
              <Text style={{ fontSize: 18, padding: 10 }}>+91</Text>
              <TextInput
                style={{ fontSize: 18, padding: 8, width: '70%' }}
                placeholder='Enter mobile number'
                onChangeText={(text) => setNumber(text)}
              ></TextInput>
            </View>

            <View style={portraitStyles.otpButtonContainer}>
              <TouchableOpacity style={portraitStyles.otpButton} onPress={() => getCode()}>
                <Text style={{ color: 'white' }}>Get OTP</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 18 }}>OR</Text>
          </View>

          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}
            onPress={() => navigation.navigate('login')}
          >
            <Text style={{ fontSize: 18, color: '#B48D56', fontWeight: '400', fontFamily: 'Georgia' }}>
              Login with mobile/email and password
            </Text>
          </TouchableOpacity>

          <View style={{ padding: 5 }}>
            <Text style={{ fontSize: 18, padding: 5 }}>OR</Text>
          </View>

          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.navigate('signup', dispatch(checkToken(false)))}
          >
            <Text style={{ fontSize: 18, color: '#B48D56', fontWeight: '400', fontFamily: 'Georgia' }}>
              New Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
  Alert,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { portraitStyles, landscapeStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { setTokenAvailability } from '../../Components/redux/Actions';

const LogInPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(0);
  const [token, setToken] = useState('');
  const [key, setKey] = useState('');
  const [url, setUrl] = useState('');
  const [value, setValue] = useState('');
  const [response_data, setResponseData] = useState({});
  const [toggle, setToggle] = useState(undefined);
  const [hideAndShow, setHideAndShow] = useState(true);
  const [hideAndShowIconName, setHideAndShowIconName] = useState('eye-slash');

  const hideAndShowPassword = () => {
    setHideAndShow(!hideAndShow);
    hideAndShowIconName === 'eye-slash' ? setHideAndShowIconName('eye') : setHideAndShowIconName('eye-slash');
  };

  const loginCall = async () => {
    setToggle(false);
    
    if (isNaN(value)) {
      let parsed = {};

      const data = {
        email: value,
        password: password
      };

      try {
        let user = await AsyncStorage.getItem('user');
        parsed = JSON.parse(user);
      } catch (error) {
        Alert.alert(error);
      }
      console.log("Login Url=>",parsed.url + 'customlogin/index&key=' + parsed.key)
      await axios.post(parsed.url + 'customlogin/index&key=' + parsed.key, data, { 'Content-Type': 'application/x-www-form-urlencoded' })
        .then(response => {
          
        console.log(response.data)

      setToggle(true);

      if (response.data.status != 200) {
        console.log("Error Message=>",response.data.message )
        showMessage({
          message: response.data.message,
          type: 'danger',
          color: 'white',
          icon: props => <MaterialIcons name="error-outline" size={16} color={'white'} {...props} />,
          titleStyle: { fontSize: 18 }
        });
      } else {
        // console.log("Error message ")
        setToken(response.data.token);
        console.log("Error message ")
        AsyncStorage.setItem('token', JSON.stringify({ token: response.data.token, os_type: 'android' }));
        dispatch(setTokenAvailability(true));
        navigation.navigate('Home');
      }
    });
    } else {
      let parsed = {};

      const data = {
        mobile: value,
        password: password
      };

      try {
        let user = await AsyncStorage.getItem('user');
        parsed = JSON.parse(user);
      } catch (error) {
        Alert.alert(error);
      }
     
      await axios.post(parsed.url + 'customlogin/mobilelogin&key=' + parsed.key, data, { 'Content-Type': 'application/x-www-form-urlencoded' })
        .then(response => {
          setResponseData(response.data);
          console.log(response.data)
        

      setToggle(true);

      if (response_data.status !== 200) {
        
        showMessage({
          message: response_data.message,
          type: 'danger',
          color: 'white',
          icon: props => <MaterialIcons name="error-outline" size={16} color={'white'} {...props} />,
          titleStyle: { fontSize: 18 }
        });
      } else {
        setToken(response_data.token);
        AsyncStorage.setItem('token', JSON.stringify({ token: response_data.token, os_type: 'android' }));
        dispatch(setTokenAvailability(true));
        navigation.navigate('Home');
      }
    });
    }
  };

  return (
    <SafeAreaView style={portraitStyles.screenBackground}>
      <KeyboardAvoidingView>
        <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover">
          <ScrollView style={portraitStyles.container}>
            <View style={portraitStyles.logoContainer}>
              <Image style={portraitStyles.logo} source={require('../../assets/Craftslane_logo.png')} />
            </View>
            <View style={{ borderColor: '#bba890', borderTopWidth: 1, borderBottomWidth: 1 }}>
              <View style={portraitStyles.welcomeTextContainer}>
                <View>
                  <Text style={portraitStyles.welcomeText}>Welcome Back!</Text>
                </View>
                <View style={{ width: '100%' }}>
                  <Text style={portraitStyles.text}>Please enter your Email Address & Password to Sign In!</Text>
                </View>
              </View>
              <View style={portraitStyles.containLabelAndInput}>
                <TextInput
                  style={portraitStyles.input}
                  placeholder="Email Address or Mobile number"
                  placeholderTextColor={'grey'}
                  autoCapitalize="none"
                  onChangeText={text => setValue(text)}
                />
              </View>
              <View style={portraitStyles.containLabelAndInput}>
                <TextInput
                  style={portraitStyles.passwordInput}
                  secureTextEntry={hideAndShow}
                  placeholderTextColor={'grey'}
                  placeholder="Password"
                  onChangeText={text => setPassword(text)}
                />
                <FontAwesome name={hideAndShowIconName} size={20} style={portraitStyles.passwordEyeIcon} color={'grey'} onPress={hideAndShowPassword} />
              </View>
              <View style={portraitStyles.hyperlink}>
                <Text
                  style={portraitStyles.hyperlinkText}
                  onPress={() => navigation.navigate('forgot')}
                >
                  Forgot Your Password?
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.9} style={portraitStyles.buttonContainer} onPress={loginCall} disabled={toggle === false ? true : false}>
                <View style={portraitStyles.button}>
                  {toggle === false ? <ActivityIndicator size={'small'} color={'#fff'} /> : <Text style={portraitStyles.buttonText}>Continue</Text>}
                </View>
              </TouchableOpacity>
            </View>
            <View style={portraitStyles.hyperlinkWithText}>
              <Text style={portraitStyles.normal2text}>Not a Member yet? Sign Up with Us! </Text>
            </View>
            <TouchableOpacity activeOpacity={0.9} style={portraitStyles.creatButtonContainer} onPress={() => navigation.navigate('signup')}>
              <View style={portraitStyles.button}>
                <Text style={portraitStyles.buttonText}>Create an Account</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LogInPage;

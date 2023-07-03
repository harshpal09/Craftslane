import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, Dimensions, Keyboard } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPScreen = ({ route }) => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const otpInputRefs = useRef([]);
  const [token, setToken] = useState('');
  const navigation = useNavigation();

  const OTP_LENGTH = 4;

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        setIsTimerRunning(false);
      }, 60000);
    }
  }, [isTimerRunning]);

  const handleOTPChange = (value, index) => {
    const newOTP = [...otp];
    newOTP[index] = value;

    setOTP(newOTP);

    if (value !== '' && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1].focus();
    } else if (value === '' && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };


  const handleVerifyOTP = async () => {

    const { mobile } = route.params;
    console.log("Entered mobile number",mobile);

    const enteredOTP = otp.join('');
    let parsed = {}

    // const data = {
    //   otp: enteredOTP,
    //   mobile: mobile
    // }

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

    }
    catch (error) {
      Alert.alert(error)
    }

    // console.log(data)
    // console.log("Verify OTP url=>", parsed.url + "customlogin/validate_otp&key=" + parsed.key)
    await axios.get(parsed.url + "customlogin/validate_otp&key=" + parsed.key+"&mobile=" +mobile).then((r)=> console.log(r.data))

    // console.log("token generated =>", token)

    
  };

  useEffect(() => {
    // console.log("token generated =>", token);
  
    if (token !== '') {
      console.log('token created', token);
      setIsOTPVerified(true);
      setErrorMessage('');
      Keyboard.dismiss();
      
      setTimeout(async () => {
        // const storedData = await AsyncStorage.getItem('user');
        // let userData = {};
  
        // if (storedData) {
        //   userData = JSON.parse(storedData);
        // }
  
        // userData.token = token; 
        
        await AsyncStorage.setItem('token', JSON.stringify(token)); 
        const retrievedData = await AsyncStorage.getItem('token'); 

      console.log('Retrieved Data:',retrievedData );
  
        navigation.navigate('product');
      }, 1000);
    }

    else{

      console.log('Token is null or undefined');
      console.log('token not created');
      setIsOTPVerified(false);
      // setErrorMessage('Please enter the OTP!');
      Keyboard.dismiss();
    }
  }, [token]);

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(60);
  };



  const resendCode = async () => {
    const { mobile } = route.params;
    console.log(mobile);

    let parsed = {}
    // const data = {
    //   mobile: mobile,

    // }

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

    }
    catch (error) {
      Alert.alert(error)
    }
    // console.log(data)
    console.log("Resend OTP url=>", parsed.url + "customlogin/send_otp&key=" + parsed.key+"&mobile="+mobile)
    await axios.get(parsed.url + "customlogin/resend_otp&key=" + parsed.key+"&mobile="+mobile).then((response) =>

        console.log(response.data)


      )
    startTimer();
  };

  const renderOTPInputs = () => {
    const inputs = [];
    for (let i = 0; i < OTP_LENGTH; i++) {
      inputs.push(
        <TextInput
          key={i}
          style={[
            styles.otpInput,
            isOTPVerified ? { borderColor: 'green' } : { borderColor: 'gray' },
          ]}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(value) => handleOTPChange(value, i)}
          ref={(ref) => (otpInputRefs.current[i] = ref)}
          value={otp[i]}
          editable={!isOTPVerified}
          autoFocus={i === 0}
        />


      );
    }
    return inputs;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>{renderOTPInputs()}</View>
      {!isOTPVerified && (
        <>
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerifyOTP}
            disabled={otp.join('').length !== OTP_LENGTH}
          >
            <Text style={styles.verifyButtonText}>Verify OTP</Text>
          </TouchableOpacity>
          {isTimerRunning ? (
            <Text style={styles.timerText}>Resend code in {timer} seconds</Text>
          ) : (
            <TouchableOpacity style={styles.resendButton} onPress={resendCode}>
              <Text style={[styles.resendButtonText, isTimerRunning ? styles.fadeResendButtonText : null]}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <Text style={styles.successMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: windowWidth < 600 ? 20 : 24,
    fontWeight: 'bold',
    marginBottom: windowWidth < 600 ? 20 : 30,
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: windowWidth < 600 ? 20 : 30,
  },
  otpInput: {
    width: windowWidth < 600 ? 50 : 60,
    height: windowWidth < 600 ? 50 : 60,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: windowWidth < 600 ? 5 : 10,
    textAlign: 'center',
    fontSize: windowWidth < 600 ? 20 : 24,
  },
  verifyButton: {
    backgroundColor: '#B48D56',
    paddingVertical: windowWidth < 600 ? 10 : 15,
    paddingHorizontal: windowWidth < 600 ? 20 : 30,
    borderRadius: 5,
    marginTop: windowWidth < 600 ? 10 : 20,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: windowWidth < 600 ? 16 : 18,
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: windowWidth < 600 ? 10 : 20,
  },
  resendButtonText: {
    color: 'black',
    fontSize: windowWidth < 600 ? 16 : 18,
    fontWeight: 'bold',
  },
  fadeResendButtonText: {
    opacity: 0.5,
  },
  timerText: {
    marginTop: windowWidth < 600 ? 10 : 20,
    fontSize: windowWidth < 600 ? 14 : 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: windowWidth < 600 ? 10 : 20,
    fontSize: windowWidth < 600 ? 14 : 16,
  },
  successMessage: {
    color: 'green',
    marginTop: windowWidth < 600 ? 10 : 20,
    fontSize: windowWidth < 600 ? 14 : 16,
  },
});

export default OTPScreen;

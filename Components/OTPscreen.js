import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';

const OTPScreen = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const otpInputRefs = useRef([]);

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

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP.length !== OTP_LENGTH) {
      setIsOTPVerified(false);
      setErrorMessage('Invalid OTP. Please enter all 4 digits.');
      return;
    }

    // Simulating API call to verify OTP
    // Replace with your actual OTP verification logic
    // If OTP verification fails, set the error message
    if (enteredOTP !== '1234') {
      setIsOTPVerified(false);
      setErrorMessage('Invalid OTP. Please try again.');
    } else {
      // OTP verification successful
      setIsOTPVerified(true);
      setErrorMessage(''); // Reset error message
      // Navigate to the next screen
      // Replace 'NextScreen' with the appropriate screen name or navigation action
      // navigation.navigate('NextScreen');

      // Start the timer for resend code
      startTimer();
    }
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(60);
  };

  const resendCode = () => {
    // Simulating API call to resend OTP
    // Replace with your actual API call logic
    // On success, start the timer
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
          editable={!isOTPVerified} // Disable input if OTP is already verified
          autoFocus={i === 0} // Autofocus on the first input field
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

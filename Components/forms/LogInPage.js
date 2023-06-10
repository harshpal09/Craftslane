import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TextInput, Pressable, ImageBackground, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import styles from '../../Style/globleCss';
import { portraitStyles, landscapeStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

class LogInPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            success: 0,
            token: '',
            key: '',
            url: '',
            response_data: {},
            toggle: undefined,
            hide_and_show:true,
            hide_and_show_icon_name:'eye-slash'
        }
    }

    hideAndShow()
    {
        this.state.hide_and_show ? this.setState({hide_and_show:false}) : this.setState({hide_and_show:true});
        this.state.hide_and_show_icon_name == 'eye-slash' ? this.setState({hide_and_show_icon_name:'eye'}) :  this.setState({hide_and_show_icon_name:'eye-slash'})

    }

    async loginCall() {
        this.setState({ toggle: false })
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        await axios.post('https://www.craftslane.com?route=api/customlogin/index&key=Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q&os_type=android',
            data, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((response) =>
                this.setState({ response_data: response.data })
            )
        // console.warn(this.state.response_data);
        this.setState({ toggle: true })
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

            // showMessage({
            //     message: this.state.response_data.message,
            //     duration: 4000,
            //     type: 'success',
            //     color: 'white',
            //     icon: props => <MaterialIcons name="done-outline" size={18} color={'white'} {...props} />,
            //     titleStyle: { fontSize: 18 }
            // })

            this.state = {
                token: this.state.response_data.token,
                key: 'Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q',
                url: 'https://www.craftslane.com?route=api/',
                os_type:'android'
            }

            AsyncStorage.setItem('user', JSON.stringify(this.state));

            // console.warn(this.state.os_type);
            // const data = await AsyncStorage.getItem('user');
            // let par = JSON.parse(data);
            // console.warn(par);

            return this.props.navigation.replace('Tab')

        }




    }

    render() {
        // console.warn(this.state.response_data.token);
        return (
            <SafeAreaView style={portraitStyles.screenBackground}>
                <KeyboardAvoidingView>
                <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" >
                    <ScrollView style={portraitStyles.container} >
                        <View style={portraitStyles.logoContainer} >
                            <Image style={portraitStyles.logo} source={require('../../assets/Craftslane_logo.png')} />
                        </View>
                        <View style={{borderColor:"#bba890",borderTopWidth:1,borderBottomWidth:1}}>
                            <View style={portraitStyles.welcomeTextContainer}>
                                <View >
                                    <Text style={portraitStyles.welcomeText}>Welcome Back!</Text>
                                </View>
                                <View style={{width:'100%'}}>
                                    <Text style={portraitStyles.text}>Please enter your Email Address & Password to Sign In!</Text>
                                </View>
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} placeholder="Email Address" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ email: text })} />
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                
                                <TextInput style={portraitStyles.passwordInput} secureTextEntry={this.state.hide_and_show} placeholderTextColor={'grey'} placeholder="Password" onChangeText={(text) => this.setState({ password: text })} />
                                <FontAwesome name={this.state.hide_and_show_icon_name} size={20}  style={portraitStyles.passwordEyeIcon}  color={'grey'} onPress={() => this.hideAndShow()}/>
                            </View>
                            <View style={portraitStyles.hyperlink}>
                                <Text
                                    style={portraitStyles.hyperlinkText}
                                    onPress={() => this.props.navigation.navigate('forgot')}
                                >
                                    Forgot Your Password?
                                </Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.9} style={portraitStyles.buttonContainer} onPress={() => this.loginCall()} disabled={this.state.toggle == false ? true : false} >
                                <View style={portraitStyles.button} >
                                    {this.state.toggle == false ? <ActivityIndicator size={'small'} color={'#fff'} /> : <Text style={portraitStyles.buttonText}>Continue</Text>}

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={portraitStyles.hyperlinkWithText}>
                            <Text style={portraitStyles.normal2text} >Not a Member yet? Sign Up with Us! </Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} style={portraitStyles.creatButtonContainer} onPress={() => this.props.navigation.navigate('signup')}>
                            <View style={portraitStyles.button} >
                                <Text style={portraitStyles.buttonText}>Create an Account</Text>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}



export default LogInPage;

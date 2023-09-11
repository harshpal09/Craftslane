import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import { SelectCountry } from 'react-native-element-dropdown';
// import { Dropdown } from 'react-native-element-dropdown';
import React, { Component, PureComponent, useMemo, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    ImageBackground,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
    ActivityIndicator, Linking, Keyboard, TouchableWithoutFeedback, RefreshControl
} from 'react-native';
import { portraitStyles } from '../../Style/globleCss';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';


class SignUpPage extends Component {
    state = {
        toggleCheckBox1: false,
        toggleCheckBox2: false,
        countries: [],
        zones: [],
        states_id: {},
        date: new Date(),
        first_name: '',
        last_name: '',
        company_name: '',
        gstn: '',
        contact_number: '',
        email: '',
        city: '',
        postal_code: '',
        postcode_required: 1,
        s_country: 0,
        s_state: '',
        password: '',
        confirm_password: '',
        agree: 0,
        fax: '',
        response_data: {},
        toggle: undefined,
        hide_and_show1: true,
        hide_and_show2: true,
        hide_and_show_icon_name1: 'eye-slash',
        hide_and_show_icon_name2: 'eye-slash',
        open: false,
        flag: false,
        isLoading: false,
        isLoadingState: false,
    }
    hideAndShow() {
        this.state.hide_and_show1 ? this.setState({ hide_and_show1: false }) : this.setState({ hide_and_show1: true });
        this.state.hide_and_show_icon_name1 == 'eye-slash' ? this.setState({ hide_and_show_icon_name1: 'eye' }) : this.setState({ hide_and_show_icon_name1: 'eye-slash' })
    }
    hideAndShow1() {
        this.state.hide_and_show2 ? this.setState({ hide_and_show2: false }) : this.setState({ hide_and_show2: true });
        this.state.hide_and_show_icon_name2 == 'eye-slash' ? this.setState({ hide_and_show_icon_name2: 'eye' }) : this.setState({ hide_and_show_icon_name2: 'eye-slash' })

    }


    // setToggleCheckBox1(val) {
    //     console.log(val);
    //     this.setState({ toggleCheckBox1: val });

    // }
    // setToggleCheckBox2(val) {
    //     // console.log(val);
    //     this.setState({ toggleCheckBox2: val });
    // }
    componentDidMount() {
        this.getData();
        // this.shouldComponentUpdate();
    }
    async getData() {
        let parsed = {}
        try {
            let user = await AsyncStorage.getItem('user');
            parsed = JSON.parse(user);

        }
        catch (error) {
            Alert.alert(error)
        }

        await axios.get(parsed.url + "customcountry/index&key=" + parsed.key).then((resp) => this.setState({ countries: resp.data.body }));
        this.setState({ isLoading: false });
        this.setState({ isLoadingState: false });

    }
    async selectCountry(idx) {
        let parsed = {}
        try {
            let user = await AsyncStorage.getItem('user');
            parsed = JSON.parse(user);

        }
        catch (error) {
            Alert.alert(error)
        }

        this.setState({ s_country: idx.country_id });

        await axios.get(parsed.url + "customzone/index&key=" + parsed.key+ '&country_id=' + idx.country_id).then((resp) => this.setState({ zones: resp.data.body }));


    }
    async submitFrom() {
        let parsed = {}
        try {
            let user = await AsyncStorage.getItem('user');
            parsed = JSON.parse(user);

        }
        catch (error) {
            Alert.alert(error)
        }

        // this.state.toggleCheckBox1 == true && this.state.toggleCheckBox2 == true? this.setState({agree:1}) : this.setState({agree:0});
        if (this.state.toggleCheckBox1 == true && this.state.toggleCheckBox2 == true) {
            this.setState({agree:1})
        }
            this.setState({ toggle: false })
            const data = {
                'firstname': this.state.first_name,
                'lastname': this.state.last_name,
                'email': this.state.email,
                'telephone': this.state.contact_number,
                'day': JSON.stringify(this.state.date).substring(9, 11),
                'month': JSON.stringify(this.state.date).substring(6, 18),
                'year': JSON.stringify(this.state.date).substring(1, 5),
                'password': this.state.password,
                'confirm': this.state.confirm_password,
                'city': this.state.city,
                'country_id': this.state.s_country,
                'zone_id': this.state.s_state,
                'postcode_required': this.state.postcode_required,
                'postcode': this.state.postal_code,
                'agree': this.state.agree,
                'fax': this.state.gstn,
                'company': this.state.company_name,
                'gst': this.state.gstn,
            }
            const header = {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
            // console.log("Sign Up url=>",parsed.url + "customsignup/index&key=" + parsed.key, data, header)
            await axios.post(parsed.url + "customsignup/index&key=" + parsed.key, data, header).then((resp) => this.setState({ response_data: resp.data }))
              console.warn(this.state.response_data);
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
                    // key: 'Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q',
                    // url: 'https://demo.craftslane.com/index.php?route=api/'
                }

                AsyncStorage.setItem('token', JSON.stringify(this.state));
                return this.props.navigation.replace('Tab')

            }
        
    }

    termAndConditions = async(val) => {
        let parsed = {}
        try {
            let user = await AsyncStorage.getItem('user');
            parsed = JSON.parse(user);

        }
        catch (error) {
            Alert.alert(error)
        }

        if (val == "terms")
            return Linking.openURL(parsed.url+'information/information&information_id=5');
        else
            return Linking.openURL(parsed.url+'information/information&information_id=3');
    }
    onRefresh() {
        this.getData();
    }
    onLoadMore() {
        this.setState({ isLoading: true });
        this.getData();
    }
    onLoadMoreStates() {
        this.setState({ isLoadingState: true });
    }

    render() {
        return (
            <SafeAreaView style={portraitStyles.screenBackground}>
                <KeyboardAvoidingView>
                    <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover"  >
                        <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false} >
                            <View style={portraitStyles.logoContainer}>
                                <Image style={portraitStyles.logo} source={require('../../assets/Craftslane_logo.png')} />
                            </View>

                            <View style={{ width: '100%', borderTopWidth: 1, borderColor: '#bba890' }}></View>
                            <View style={portraitStyles.welcomeTextContainer}>
                                <Text style={portraitStyles.welcomeText}>Welcome!</Text>
                                <Text style={portraitStyles.text}>Visiting us for the first time?{'\n'}Please enter your Email Address & Password to Create an Account and Join In!</Text>
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} placeholder="First Name" placeholderTextColor={'grey'} autoCapitalize='none' autoComplete='none' autoCorrect='none' onChangeText={(text) => this.setState({ first_name: text })} />
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} placeholder="Last Name" placeholderTextColor={'grey'} autoCapitalize='none' autoComplete='none' autoCorrect='none' onChangeText={(text) => this.setState({ last_name: text })} />
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput showSoftInputOnFocus={false} onPressIn={() => this.setState({ open: true })} style={portraitStyles.input} placeholder="Date of Birth" placeholderTextColor={'grey'} defaultValue={this.state.flag ? JSON.stringify(this.state.date).substring(1, 11) : ""} onChangeText={(date) => this.setState({ date: date })} />
                                <DatePicker
                                    modal
                                    open={this.state.open}
                                    date={this.state.date}
                                    androidVariant={'iosClone'}
                                    onConfirm={(date) => {
                                        this.setState({ open: false })
                                        this.setState({ date: date })
                                        this.setState({ flag: true })
                                    }}
                                    fadeToColor={'none'}
                                    mode='date'
                                    onCancel={() => {
                                        this.setState({ open: false })
                                    }}
                                />
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} placeholder="Company Name (If Applicable)" placeholderTextColor={'grey'} autoCapitalize='none' autoComplete='none' autoCorrect='none' onChangeText={(text) => this.setState({ company_name: text })} />
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} placeholder="GSTN (If Applicable)" placeholderTextColor={'grey'} maxLength={15} autoCapitalize='none' autoComplete='none' autoCorrect='none'  onChangeText={(text) => this.setState({ gstn: text })} />
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} placeholder="Contact Number" placeholderTextColor={'grey'} autoCapitalize='none' autoComplete='none' autoCorrect='none'  maxLength={10}  onChangeText={(text) => this.setState({ contact_number: text })} />
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} placeholder="Email" placeholderTextColor={'grey'} autoCapitalize='none' autoComplete='none' autoCorrect='none' onChangeText={(text) => this.setState({ email: text })} />
                            </View>

                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} placeholder="City" placeholderTextColor={'grey'} autoCapitalize='none' autoComplete='none' autoCorrect='none' onChangeText={(text) => this.setState({ city: text })} />
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} placeholder="Postal Code" placeholderTextColor={'grey'} autoCapitalize='none' autoComplete='none' autoCorrect='none' onChangeText={(text) => this.setState({ postal_code: text })} />
                            </View>
                            <KeyboardAvoidingView style={portraitStyles.containLabelAndInput}>
                                <SelectCountry
                                    style={styless.dropdown}
                                    selectedTextStyle={styless.selectedTextStyle}
                                    placeholderStyle={styless.placeholderStyle}
                                    imageStyle={styless.imageStyle}
                                    inputSearchStyle={styless.inputSearchStyle}
                                    iconStyle={styless.iconStyle}
                                    maxHeight={200}
                                    // search
                                    data={this.state.countries}
                                    valueField="country_id"
                                    labelField="name"
                                    // imageField="image"
                                    placeholder="Select Country"
                                    searchPlaceholder="Search..."
                                    itemContainerStyle={styless.itemContainerStyle}
                                    // containerStyle={{backgroundColor:'#f2ebd5'}}
                                    onChange={e => {
                                        // console.log(e),
                                        this.selectCountry(e);
                                    }}
                                    keyboardAvoiding={false}
                                    activeColor='#d4b58a'
                                    flatListProps={{
                                        ListEmptyComponent: <EmptyList />,
                                        ListFooterComponent: <RenderFooter isLoading={this.state.isLoading} />,
                                        refreshControl: (<RefreshControl refreshing={false} onRefresh={() => this.onRefresh()} />),
                                        onEndReachedThreshold: 0.5,
                                        onEndReached: () => this.onLoadMore(),

                                    }}
                                />
                            </KeyboardAvoidingView>
                            <KeyboardAvoidingView style={portraitStyles.containLabelAndInput}>
                                <SelectCountry
                                    style={styless.dropdown}
                                    selectedTextStyle={styless.selectedTextStyle}
                                    placeholderStyle={styless.placeholderStyle}
                                    imageStyle={styless.imageStyle}
                                    inputSearchStyle={styless.inputSearchStyle}
                                    iconStyle={styless.iconStyle}
                                    // search
                                    maxHeight={200}
                                    data={this.state.zones}
                                    valueField="zone_id"
                                    labelField="name"
                                    // imageField="image"
                                    placeholder="Select State"
                                    searchPlaceholder="Search..."
                                    // containerStyle={{backgroundColor:'#f9f0df'}}
                                    onChange={(e) => {
                                        this.setState({ s_state: e.zone_id });
                                    }}
                                    activeColor='#d4b58a'
                                    flatListProps={{
                                        ListEmptyComponent: <EmptyList_1 />,
                                        ListFooterComponent: <RenderFooter_2 isLoading={this.state.isLoadingState} />,
                                        // refreshControl:(<RefreshControl refreshing={false} onRefresh={()=> this.onRefresh()} />),
                                        onEndReachedThreshold: 0.5,
                                        onEndReached: () => this.onLoadMoreStates(),
                                    }}
                                />
                            </KeyboardAvoidingView>


                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} secureTextEntry={this.state.hide_and_show1} placeholder="Password" placeholderTextColor={'grey'} autoCapitalize='none' autoComplete='none' autoCorrect='none' onChangeText={(text) => this.setState({ password: text })} />
                                <FontAwesome name={this.state.hide_and_show_icon_name1} size={20} style={portraitStyles.passwordEyeIcon} color={'grey'} onPress={() => this.hideAndShow()} />
                            </View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} secureTextEntry={this.state.hide_and_show2} placeholder="Confirm Password" placeholderTextColor={'grey'} autoCapitalize='none' autoComplete='none' autoCorrect='none' onChangeText={(text) => this.setState({ confirm_password: text })} />
                                <FontAwesome name={this.state.hide_and_show_icon_name2} size={20} style={portraitStyles.passwordEyeIcon} color={'grey'} onPress={() => this.hideAndShow1()} />
                            </View>
                            <View style={portraitStyles.termsAndConditionContainer}>
                                <View style={portraitStyles.termsAndCondition}>
                                    <View style={portraitStyles.checkboxContainer}>
                                        <CheckBox
                                            tintColors={{ true: '#B48D56', false: 'black' }}
                                            disabled={false}
                                            value={this.state.toggleCheckBox1}
                                            onValueChange={(newValue) => this.setState({ toggleCheckBox1: newValue })}
                                            style={portraitStyles.checkbox}
                                        />
                                    </View>
                                    <Text style={portraitStyles.terms}>Please agree to the <Text style={portraitStyles.hyperlinkText} onPress={() => this.termAndConditions('terms')}>Terms & Conditions </Text></Text>
                                </View>
                                <View style={portraitStyles.termsAndCondition} >
                                    <View style={portraitStyles.checkboxContainer}>
                                        <CheckBox
                                            tintColors={{ true: '#B48D56', false: 'black' }}
                                            disabled={false}
                                            value={this.state.toggleCheckBox2}
                                            onValueChange={(newValue) => this.setState({ toggleCheckBox2: newValue })}
                                            style={portraitStyles.checkbox}
                                        />
                                    </View>
                                    <Text style={portraitStyles.terms}>I agree to receiving emails, calls, and text messages for service related information. (To know more about how we keep your data safe, please refer to our<Text style={portraitStyles.hyperlinkText} onPress={() => this.termAndConditions('policy')}> Privacy Policy </Text>)</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={0.9} style={portraitStyles.logoutButtonContainer} onPress={() => this.submitFrom()} disabled={this.state.toggle == false ? true : false}>
                                <View style={portraitStyles.button} >
                                    {this.state.toggle == false ? <ActivityIndicator size="small" color="#fff" /> : <Text style={portraitStyles.buttonText}>Continue</Text>}
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}


export default SignUpPage;

const styless = StyleSheet.create({
    dropdown: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: '90%',
        // left: 15,
        // margin: 2,
        color: 'black',
        height: 60,

    },
    imageStyle: {
        width: 24,
        height: 24,
    },
    placeholderStyle: {
        fontSize: 14,
        color: 'grey'
    },
    selectedTextStyle: {
        fontSize: 14,
        marginLeft: 8,
        color: 'grey',
        //   backgroundColor:'red',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'grey',
    },
});

const EmptyList = () => {
    return (
        <View style={{ padding: 16, alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>Please Wait!</Text>
        </View>
    )
}
const EmptyList_1 = () => {
    return (
        <View style={{ padding: 16, alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>Please Select the Country First</Text>
        </View>
    )
}
const RenderFooter = (isLoading) => {
    if (!isLoading) {
        return null;
    }
    return (
        <View style={{ padding: 16, alignItems: 'center' }}>
            <ActivityIndicator color={'grey'} size={'large'} />
        </View>
    )
}
const RenderFooter_2 = (isLoading) => {
    if (!isLoading) {
        return null;
    }
    return (
        <View style={{ padding: 16, alignItems: 'center' }}>
            <ActivityIndicator color={'grey'} size={'large'} />
        </View>
    )
}


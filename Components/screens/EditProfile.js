import React, { Component, PureComponent } from 'react';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    Button,
    Pressable,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    ImageBackground
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { getAllExternalFilesDirs } from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { portraitStyles } from '../../Style/globleCss';
import LoadingComponent from './LoadingComponent';


class EditProfile extends Component {
    state = {
        info: [],
        date: new Date(),
        first_name: '',
        last_name: '',
        gstn: '',
        email: '',
        contact_number: '',
        response_data: {},
        toggle: undefined,
        refreshing: false,
        open: false,
        flag: false,
        toggleCheckBox2: false,
    }
    componentDidMount() {
        this.getData();
    }

    setToggleCheckBox2(val) {
        // console.log(val);
        this.setState({ toggleCheckBox2: val });
    }
    async getData() {
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed })
            // console.warn(this.state.data)
        }
        catch (error) {
            Alert.alert(error)
        }

        await axios.get(this.state.data.url + "customaccountinfo/index&key=" + this.state.data.key + "&token=" + this.state.data.token)
            .then((resp) => this.setState({ info: resp.data.body }))
            .catch((error) => console.warn(error));

        this.state.info.map((val) =>
            this.setState({ first_name: val.firstname, last_name: val.lastname, email: val.email, contact_number: val.telephone, gstn: val.fax, dob: JSON.stringify(val.custom_field).substring(10,20)}),
        )
        // console.warn(this.state.dob);
    }
    async submitFrom() {
        this.setState({ toggle: false })
        let day = "";
        let month = "";
        let year = "";
        console.log(JSON.stringify(this.state.date).substring(9, 11) +" == "+ JSON.stringify(Date()).substring(9,11))
        if(JSON.stringify(this.state.date).substring(9, 11) == JSON.stringify(Date()).substring(9,11)){
            year = JSON.stringify(this.state.dob).substring(1, 5)
            month = JSON.stringify(this.state.dob).substring(6,8 )
            day = JSON.stringify(this.state.dob).substring(9 ,11)
        }
        else{
            day = JSON.stringify(this.state.date).substring(9, 11)
            month = JSON.stringify(this.state.date).substring(6, 8)
            year = JSON.stringify(this.state.date).substring(1, 5) 
        }
        console.log(day+" "+month," "+year);
        data = {
            firstname: this.state.first_name,
            lastname: this.state.last_name,
            email: this.state.email,
            telephone: this.state.contact_number,
            fax: this.state.gstn,
            selectaddress: '',
            country_id: "",
            day: day,
            month: month,
            year: year,
            agree:this.state.toggleCheckBox2 ? 1 : 0,
        }
        const header = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }
        await axios.post(this.state.data.url + "customaccountedit/index&key=" + this.state.data.key + "&token=" + this.state.data.token, data, header).then((resp) => this.setState({ response_data: resp.data })).catch((error) => console.warn(error))
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

    _onRefresh = () => {

        this.setState({ refreshing: true });
        if (this.state.info.length > 0) {
            this.setState({ refreshing: false });
        }
    }
    render() {
        
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundTab}>
                {this.state.info.length == false ? <LoadingComponent /> :
                    <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" >
                        <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this._onRefresh()}
                            />}
                        >

                            <View style={portraitStyles.headerMiddleTextContainer}>
                                <Text style={portraitStyles.profileHeaderMiddleText}>Manage your Personal Information</Text>
                            </View>
                            {this.state.info.map((item, i) => (
                                <View key={i}>
                                    <View style={portraitStyles.containLabelAndInput}>
                                        <TextInput style={portraitStyles.input} placeholder="First Name" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ first_name: text })} defaultValue={item.firstname} />
                                    </View>
                                    <View style={portraitStyles.containLabelAndInput}>
                                        <TextInput style={portraitStyles.input} placeholder="Last Name" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ last_name: text })} defaultValue={item.lastname} />
                                    </View>
                                    <View style={portraitStyles.containLabelAndInput}>
                                        <TextInput style={portraitStyles.input} placeholder="Email" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ email: text })} defaultValue={item.email} />
                                    </View>
                                    <View style={portraitStyles.containLabelAndInput}>
                                        <TextInput showSoftInputOnFocus={false} onPressIn={() => this.setState({ open: true })} style={portraitStyles.input} placeholder="Date of Birth" placeholderTextColor={'grey'} defaultValue={this.state.flag ? JSON.stringify(this.state.date).substring(1, 11) : this.state.dob} onChangeText={(date) => this.setState({ date: date })} />
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
                                        <TextInput style={portraitStyles.input} placeholder="Contact Number" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ contact_number: text })} defaultValue={item.telephone} />
                                    </View>
                                    <View style={portraitStyles.containLabelAndInput}>
                                        <TextInput style={portraitStyles.input} placeholder="GSTN (If Applicable)" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ gstn: text })} defaultValue={item.fax} />
                                    </View>
                                </View>
                            ))}
                            <View style={portraitStyles.termsAndConditionContainer}>
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

                                <View style={portraitStyles.button}>
                                    {this.state.toggle == false ? <ActivityIndicator size="small" color="#fff" /> : <Text style={portraitStyles.buttonText}>Save</Text>}
                                </View>
                            </TouchableOpacity>

                        </ScrollView>
                    </ImageBackground>
                }
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({})

export default EditProfile;

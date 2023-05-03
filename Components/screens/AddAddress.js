import React, { Component, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
// import React, { useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import SelectDropdown from 'react-native-select-dropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectCountry } from 'react-native-element-dropdown';

import { portraitStyles } from '../../Style/globleCss';
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
    RefreshControl
} from 'react-native';


class AddAddress extends Component {
    state = {
        toggleCheckBox1: false,
        toggleCheckBox2: false,
        countries: [],
        con: [],
        countries_id: [],
        zones: [],
        states: [],
        states_id: [],
        date: new Date(),
        first_name: '',
        last_name: '',
        company_name: '',
        gstn: '',
        contact_number: '',
        email: '',
        city: '',
        address_1: '',
        address_2: '',
        postal_code: '',
        postcode_required: 1,
        s_country: '',
        s_state: '',
        password: '',
        confirm_password: '',
        agree: 0,
        fax: '',
        response_data: {},
        toggle: undefined,
        prefield: [],
        country: 'Select Country',
        zone: '',
        custom_field: {},
        two: '2',
        address_id: '',
        zone_id: '',
        coun_id: '',
        radioButtons: [
            {
                id: '1', // acts as primary key, should be unique and non-empty string
                label: 'Yes',
                value: 'option1',
                color:'#B48D56',
                borderSize:1,
                borderColor:'#B48D56',
                labelStyle:portraitStyles.radioButtons

            },
            {
                id: '2',
                label: 'No',
                value: 'option2',
                color:'#B48D56',
                borderSize:1,
                borderColor:'#B48D56',
                labelStyle:portraitStyles.radioButtons
            }
        ],
        isLoading:false,
        isLoadingState:false,
    }
    setRadioButtons(arr)
    {
        
        this.setState({radioButtons:arr});       
    }

    onPressRadioButton(radioButtonsArray) {
        console.warn(radioButtonsArray);
    }


    setToggleCheckBox1(val) {
        console.log(val);
        this.setState({ toggleCheckBox1: val });

    }
    setToggleCheckBox2(val) {
        // console.log(val);
        this.setState({ toggleCheckBox2: val });
    }
    componentDidMount() {
        this.getData();
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


        this.state.prefield.map((val) =>
            this.setState({ first_name: val.firstname, last_name: val.lastname, email: val.email, contact_number: val.telephone, address_1: val.address_1, address_2: val.address_2, company_name: val.company, postal_code: val.postcode, country: val.country, zone: val.zone, city: val.city, custom_field: val.custom_field, zone_id: val.zone_id, coun_id: val.country_id }),
        )


        await axios.get(this.state.data.url + '/customcountry/index&key=' + this.state.data.key + '&os_type=android').then((resp) => this.setState({ countries: resp.data.body }));

        
    }
    async selectCountry(idx) {
        console.warn({s_country:idx.countries_id});
        this.setState({ s_country: idx });
        await axios.get('https://demo.craftslane.com/index.php?route=api/customzone/index&key=Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q&os_type=android&country_id=' + idx.country_id).then((resp) => this.setState({ zones: resp.data.body }));
        // console.log(this.state.zones);
        
    }
    async submitFrom() {
        this.setState({ toggle: false })
        const data = {
            'firstname': this.state.first_name,
            'lastname': this.state.last_name,
            'company': this.state.company_name,
            'address_1': this.state.address_1,
            'address_2': this.state.address_2,
            'postcode': this.state.postal_code,
            'city': this.state.city,
            'zone_id': this.state.s_state,
            'country_id': this.state.s_country,
            'contact_number': this.state.contact_number,
        }
        const header = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }

        await axios.post(this.state.data.url + "customaddressbook/add&key=" + this.state.data.key + "&token=" + this.state.data.token, data, header).then((resp) => this.setState({ response_data: resp.data })).catch((error) => console.warn(error))
        this.setState({ toggle: true })
        console.warn(this.state.response_data)
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
                message: "Address Added successfully!",
                duration: 4000,
                type: 'success',
                color: 'white',
                icon: props => <MaterialIcons name="done-outline" size={18} color={'white'} {...props} />,
                titleStyle: { fontSize: 18 }
            })
            return this.props.navigation.replace('addressbook');
        }

    }
    onRefresh()
    {
        this.getData();    
    }
    onLoadMore()
    {
        this.setState({isLoading:true});
        this.getData();
    }
    onLoadMoreStates()
    {
        this.setState({isLoadingState:true});
    }
    render() {
        return (
            <SafeAreaView style={portraitStyles.screenBackground}>
                <KeyboardAvoidingView>

                    <ScrollView style={portraitStyles.container}  >

                        <View style={portraitStyles.headerMiddleTextContainer}>
                            <Text style={portraitStyles.profileHeaderMiddleText}>Add Multiple Billing and Shipping Addresses.</Text>
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="First Name" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ first_name: text })} defaultValue={this.state.first_name} />
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Last Name" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ last_name: text })} defaultValue={this.state.last_name} />
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Company Name" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ company_name: text })} defaultValue={this.state.company_name} />
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Address 1" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ address_1: text })} defaultValue={this.state.address_1} />
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Address 2" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ address_2: text })} defaultValue={this.state.address_2} />
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="City" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ city: text })} defaultValue={this.state.city} />
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Postal Code" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ postal_code: text })} defaultValue={this.state.postal_code} />
                        </View>

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
                            containerStyle={{backgroundColor:'#f2ebd5'}}
                            onChange={e => 
                            {
                                console.log(e),
                                this.selectCountry(e);
                            }} 
                            keyboardAvoiding={false}
                            activeColor='#d4b58a'
                            flatListProps={{
                                ListEmptyComponent:<EmptyList />,
                                ListFooterComponent: <RenderFooter isLoading={this.state.isLoading} />,
                                refreshControl:(<RefreshControl refreshing={false} onRefresh={()=> this.onRefresh()} />),
                                onEndReachedThreshold:0.5,
                                onEndReached:()=> this.onLoadMore(),

                            }}                       
                        />                           
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
                            containerStyle={{backgroundColor:'#f2ebd5'}}
                            onChange={(e) => {
                                this.setState({s_state:e.zone_id});
                            }}
                            activeColor='#d4b58a'
                            flatListProps={{
                                ListEmptyComponent:<EmptyList_1 />,
                                ListFooterComponent: <RenderFooter_2 isLoading={this.state.isLoadingState} />,
                                // refreshControl:(<RefreshControl refreshing={false} onRefresh={()=> this.onRefresh()} />),
                                onEndReachedThreshold:0.5,
                                onEndReached:()=> this.onLoadMoreStates(),
                            }}           
                        />

                        <View style={{marginTop:10,height:60}}>
                            <TextInput style={portraitStyles.input} placeholder="Contact Number" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ contact_number: text })} defaultValue={this.state.custom_field} />
                        </View>
                        <View style={{width:'100%',paddingHorizontal:30,paddingVertical:10}}>
                            <Text style={portraitStyles.defaultAddress}>Default Address</Text>
                            <RadioGroup
                                radioButtons={this.state.radioButtons}
                                onPress={()=> this.onPressRadioButton(this.state.radioButtons)}
                                layout='row'
                            />
                        </View>
                        
                        <TouchableOpacity activeOpacity={0.9} style={portraitStyles.logoutButtonContainer} onPress={() => this.submitFrom()} disabled={this.state.toggle == false ? true : false}>

                            <View style={portraitStyles.button} >
                                {/* <Text style={portraitStyles.buttonText}>Continue</Text> */}
                                {this.state.toggle == false ? <ActivityIndicator size="small" color="#fff" /> : <Text style={portraitStyles.buttonText}>Save</Text>}
                            </View>
                        </TouchableOpacity>


                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>

        );
    }
}

export default AddAddress;
const styless = StyleSheet.create({
    dropdown: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: '90%',
        left: 15,
        marginBottom: 1,
        color:'black',
        height:60,
        backgroundColor:'#f2ebd5'
    },
    imageStyle: {
      width: 24,
      height: 24,
    },
    placeholderStyle: {
      fontSize: 14,
      color:'grey'
    },
    selectedTextStyle: {
      fontSize: 14,
      marginLeft: 8,
      color:'grey',
    //   backgroundColor:'red',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color:'grey',
    },
  });
  
const EmptyList =()=>{
    return(
        <View style={{padding:16,alignItems:'center'}}>
            <Text style={{color:'black'}}>Please Wait!</Text>
        </View>
    )
}
const EmptyList_1 =()=>{
    return(
        <View style={{padding:16,alignItems:'center'}}>
            <Text style={{color:'black'}}>Please Wait!</Text>
        </View>
    )
}
const RenderFooter = (isLoading) =>{
    if(!isLoading)
    {
        return null;
    }
    return(
        <View style={{padding:16,alignItems:'center'}}>
            <ActivityIndicator color={'grey'} size={'large'}  />
        </View>
    )
}
const RenderFooter_2 = (isLoading) =>{
    if(!isLoading)
    {
        return null;
    }
    return(
        <View style={{padding:16,alignItems:'center'}}>
            <ActivityIndicator color={'grey'} size={'large'}  />
        </View>
    )
}
  

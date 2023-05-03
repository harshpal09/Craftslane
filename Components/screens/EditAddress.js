import React, { Component } from 'react';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';

import SelectDropdown from 'react-native-select-dropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
} from 'react-native';


class EditAddress extends Component {

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
        address_1:'',
        address_2:'',
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
        prefield:[],
        country:'',
        zone:'',
        custom_field:{},
        two:'2',
        address_id:'',
        zone_id:'',
        coun_id:'',
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

        const { item_id } = this.props.route.params;
        // console.warn(item_id);
        this.setState({address_id:item_id});
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed })

            // console.warn(this.state.data)
        }
        catch (error) {
            Alert.alert(error)
        }

        
        await axios.get(this.state.data.url+'customaddressbook/get-address&key='+this.state.data.key+'&token='+this.state.data.token+'&os_type=android'+'&address_id='+item_id).then((resp) => this.setState({prefield:resp.data.body}));

        // console.warn(this.state.prefield);
        this.state.prefield.map((val)=>
            this.setState({first_name:val.firstname,last_name:val.lastname,email:val.email,contact_number:val.telephone,address_1:val.address_1,address_2:val.address_2,company_name:val.company,postal_code:val.postcode,country:val.country,zone:val.zone,city:val.city,custom_field:val.custom_field,zone_id:val.zone_id,coun_id:val.country_id}),
        )
        

        await axios.get(this.state.data.url+'/customcountry/index&key='+this.state.data.key+'&os_type=android').then((resp) => this.setState({ con: resp.data.body }));

        const country_name_array = [];
        const country_id_array = [];

        this.state.con.map((data, i) => {
            country_name_array.push(data.name);
            country_id_array.push(data.country_id)
        })
        this.setState({ countries: country_name_array });
        this.setState({ countries_id: country_id_array });
    }
    async selectCountry(idx) {
        // console.warn(this.state.countries_id[idx]);
        this.setState({ s_country: idx });
        await axios.get('https://demo.craftslane.com/index.php?route=api/customzone/index&key=Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q&os_type=android&country_id=' + this.state.countries_id[idx]).then((resp) => this.setState({ zones: resp.data.body }));
        // console.log(this.state.zones);
        const rajya = [];
        const rajya_id = [];

        this.state.zones.map((data, j) => {
            rajya.push(data.name);
            rajya_id.push(data.zone_id);
        })
        this.setState({ states: rajya });
        this.setState({ states_id: rajya_id });

    }
    async submitFrom()
    {
        this.setState({toggle:false})
        const data = {
            'firstname':this.state.first_name,
            'lastname':this.state.last_name,
            'company':this.state.company_name,
            'address_1':this.state.address_1,
            'address_2':this.state.address_2,
            'postcode': this.state.postal_code ,
            'city': this.state.city,
            'zone_id': this.state.s_state,
            'country_id':this.state.countries_id[this.state.s_country],
            

            'contact_number': this.state.contact_number,
            'address_id': this.state.address_id
        }
        const header = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }

          await axios.post(this.state.data.url+"customaddressbook/edit&key="+this.state.data.key+"&token="+this.state.data.token,data,header).then((resp)=> this.setState({response_data:resp.data})).catch((error) => console.warn(error))
          this.setState({toggle:true})
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
                message: "Address updated successfully!",
                duration: 4000,
                type: 'success',
                color: 'white',
                icon: props => <MaterialIcons name="done-outline" size={18} color={'white'} {...props} />,
                titleStyle: { fontSize: 18 }
            })
        }
    }
    render() {
        // console.warn(this.state.custom_field+this.state.two);
        return (
            <SafeAreaView style={portraitStyles.screenBackground}>
                <KeyboardAvoidingView>
                    <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false} >

                        <View style={portraitStyles.headerMiddleTextContainer}>
                            <Text style={portraitStyles.profileHeaderMiddleText}>Add Multiple Billing and Shipping Addresses.</Text>
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="First Name" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ first_name: text })} defaultValue={this.state.first_name} />
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Last Name" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ last_name: text })} defaultValue={this.state.last_name}/>
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Company Name" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ company_name: text })} defaultValue={this.state.company_name} />
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Address 1" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ address_1: text })} defaultValue={this.state.address_1}/>
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Address 2" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ address_2: text })} defaultValue={this.state.address_2} />
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="City" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ city: text })} defaultValue={this.state.city} />
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Postal Code" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ postal_code: text })} defaultValue={this.state.postal_code}/>
                        </View>
                        


                        <View style={portraitStyles.selectDropdownContainer}>
                            <Text style={portraitStyles.normalText}>Select Country:</Text>

                            <SelectDropdown
                                data={this.state.countries}
                                onSelect={(selectedItem, index) => {
                                    this.selectCountry(index)

                                }}
                                defaultValue={this.state.country}
                                buttonTextAfterSelection={(selectedItem, index) => {

                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}

                                defaultButtonText={this.state.country}

                                rowTextStyle={portraitStyles.selectedText}
                                buttonStyle={portraitStyles.selectDropdown}
                                buttonTextStyle={{}}
                                dropdownStyle={portraitStyles.selectDropdown}
                                dropdownOverlayColor={'rgba(0,0,0,0.58)'}
                                // dropdownBackgroundColor={'green'}
                                // selectedRowTextStyle={portraitStyles.selectedText}
                                selectedRowStyle={portraitStyles.selectedText}
                                search={true}
                                renderDropdownIcon={(icon) => <MaterialIcons name="keyboard-arrow-down" size={16} color={'black'}  {...icon} />}
                            />
                        </View>
                        <View style={portraitStyles.selectDropdownContainer}>
                            <Text style={portraitStyles.normalText}>Select state:</Text>

                            <SelectDropdown
                                data={this.state.states}
                                // defaultValue={this.state.zone}
                                onSelect={(selectedItem, index) => {
                                    this.setState({ s_state: this.state.states_id[index] })
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {

                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {

                                    return item
                                }}
                                defaultButtonText={this.state.zone}
                                buttonStyle={portraitStyles.selectDropdown}
                                buttonTextStyle={{}}
                                dropdownStyle={portraitStyles.selectDropdown}
                                dropdownOverlayColor={'rgba(0,0,0,0.58)'}
                                dropdownBackgroundColor={'green'}


                                renderDropdownIcon={(icon) => <MaterialIcons name="keyboard-arrow-down" size={16} color={'black'}  {...icon} />}
                            />
                        </View>
                        
                        
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Contact Number" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ contact_number: text })} defaultValue={this.state.custom_field}/>
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

const styles = StyleSheet.create({})

export default EditAddress;

import React, { Component } from 'react';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';

import SelectDropdown from 'react-native-select-dropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { portraitStyles } from '../../Style/globleCss';
import { SelectCountry } from 'react-native-element-dropdown';
import LoadingComponent from './LoadingComponent';

import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    ImageBackground,
    TextInput,
    Button,
    Pressable,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
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
        s_state: {},
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
        country_id:'',
        isLoading:false,
        isLoadingState:false
    }

    setToggleCheckBox1(val) {
        // console.log(val);
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

            let token = await AsyncStorage.getItem('token');
            let parsed2 = JSON.parse(token);

            this.setState({token: parsed2})

            // console.warn(this.state.data)
        }
        catch (error) {
            Alert.alert(error)
        }

        // console.log("Edit Address URL=>",this.state.data.url+'customaddressbook/get-address&key='+this.state.data.key+'&token='+this.state.token.token+'&os_type=android'+'&address_id='+item_id)
        await axios.get(this.state.data.url+'customaddressbook/get-address&key='+this.state.data.key+'&token='+this.state.token.token+'&os_type=android'+'&address_id='+item_id).then((resp) => this.setState({prefield:resp.data.body}));
        console.log("Edit address Response=>", this.state.prefield )
        // console.war]n(this.state.prefield);
        this.state.prefield.map((val)=>
            this.setState({first_name:val.firstname,last_name:val.lastname,email:val.email,contact_number:val.custom_field[2],address_1:val.address_1,address_2:val.address_2,company_name:val.company,postal_code:val.postcode,city:val.city,custom_field:val.custom_field,country:val.country,zone:val.zone,country_id:val.country_id,zone_id:val.zone_id}),
        )
        

        await axios.get(this.state.data.url+'/customcountry/index&key='+this.state.data.key+'&os_type=android').then((resp) => this.setState({ countries: resp.data.body }));
        await axios.get(this.state.data.url+'customzone/index&key='+this.state.data.key+'&os_type=android&country_id=' + this.state.country_id).then((resp) => this.setState({ zones: resp.data.body }));

       
        
    }
    async selectCountry(idx) {
        await axios.get(this.state.data.url+'customzone/index&key='+this.state.data.key+'&os_type=android&country_id=' + idx.country_id).then((resp) => this.setState({ zones: resp.data.body }));
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
            'zone_id': this.state.zone_id,
            'country_id':this.state.country_id,
            

            'contact_number': this.state.contact_number,
            'address_id': this.state.address_id
        }
        const header = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }

          await axios.post(this.state.data.url+"customaddressbook/edit&key="+this.state.data.key+"&token="+this.state.token.token,data,header).then((resp)=> this.setState({response_data:resp.data})).catch((error) => console.warn(error))
          this.setState({toggle:true})
        //   console.warn(this.state.response_data)
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
            return this.props.navigation.navigate('addressbook')
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
        // console.log(this.state.country_id);
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundTab}>
                {this.state.prefield.length == false ?<LoadingComponent />:
                <KeyboardAvoidingView>
                <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover"  >
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
                        


                        {/* <View style={portraitStyles.selectDropdownContainer}>
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
                                dropdownBackgroundColor={'green'}
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
                        </View> */}
                        <View style={portraitStyles.containLabelAndInput}>
                        <SelectCountry
                            style={styless.dropdown}
                            selectedTextStyle={styless.selectedTextStyle}
                            placeholderStyle={styless.placeholderStyle}
                            imageStyle={styless.imageStyle}
                            inputSearchStyle={styless.inputSearchStyle}
                            iconStyle={styless.iconStyle}
                            maxHeight={200}
                            // search
                            // value={this.state.countries}
                            data={this.state.countries}
                            valueField="country_id"
                            labelField="name"
                            // imageField="image"
                        
                            placeholder={this.state.country}
                            searchPlaceholder="Search..."
                            itemContainerStyle={styless.itemContainerStyle}
                            // containerStyle={{backgroundColor:'#f2ebd5'}}
                            onChange={e => 
                            {
                                // console.log(e),
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
                        </View> 
                        <View style={portraitStyles.containLabelAndInput}>                          
                        <SelectCountry
                            style={styless.dropdown}
                            selectedTextStyle={styless.selectedTextStyle}
                            placeholderStyle={styless.placeholderStyle}
                            imageStyle={styless.imageStyle}
                            inputSearchStyle={styless.inputSearchStyle}
                            iconStyle={styless.iconStyle}
                            // search
                            maxHeight={200}
                            value={{zone_id : this.state.zone_id }}
                            data={this.state.zones}
                            valueField="zone_id"
                            labelField="name"
                            // imageField="image"
                            placeholder={this.state.zone}
                            searchPlaceholder="Search..."
                            // containerStyle={{backgroundColor:'#f2ebd5'}}
                            onChange={(e) => {
                                this.setState({zone_id:e.zone_id,country_id:e.country_id});
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
                        </View>
                        <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Contact Number" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ contact_number: text })} defaultValue={this.state.custom_field[2]}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} style={portraitStyles.logoutButtonContainer} onPress={() => this.submitFrom()} disabled={this.state.toggle == false ? true : false}>

                            <View style={portraitStyles.button} >
                                {/* <Text style={portraitStyles.buttonText}>Continue</Text> */}
                                {this.state.toggle == false ? <ActivityIndicator size="small" color="#fff" /> : <Text style={portraitStyles.buttonText}>Continue</Text>}
                            </View>
                        </TouchableOpacity>


                    </ScrollView>
                    </ImageBackground>
                </KeyboardAvoidingView>
    }
            </SafeAreaView>

        );
    }
}
export default EditAddress;
const styless = StyleSheet.create({
    dropdown: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: '90%',
        // left: 15,
        // margin: 2,
        color:'black',
        height:60,
        // backgroundColor:'#f2ebd5'
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

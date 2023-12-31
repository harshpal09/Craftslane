import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, ImageBackground, RefreshControl } from 'react-native';
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import LoadingComponent from './LoadingComponent';


class AddressBook extends Component {
    state = {
        address: [],
        refreshing: false,
        all_data: {},
        radioButtons: [
            {
                id: '1', // acts as primary key, should be unique and non-empty string
                label: 'Make Default',
                value: 'option1',
                color: '#B48D56',
                borderSize: 1,
                borderColor: '#B48D56',
                labelStyle: portraitStyles.radioButtons

            },
            {
                id: '2', // acts as primary key, should be unique and non-empty string
                label: 'Not Make Default',
                value: 'option2',
                color: '#B48D56',
                borderSize: 1,
                borderColor: '#B48D56',
                labelStyle: portraitStyles.radioButtons

            },

        ],
        toggle: undefined,
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
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
        await axios.get(this.state.data.url + "customaddressbook/get-addresses&key=" + this.state.data.key + "&token=" + this.state.token.token)
            .then((resp) => this.setState({ all_data: resp.data }))
            .catch((error) => console.warn(error));
        if (this.state.all_data.status == 200) {
            this.setState({ address: this.state.all_data.body })
        }
        else {
            this.setState({ message: this.state.all_data.body })
        }
    }
    deleteConfirmation(id) {
        Alert.alert(
            'Delete',
            'Do you really want to delete this address ?',
            [{ text: "Not Now" },
            { text: "Delete", onPress: () => this.deleteAddress(id) }
            ],
            { cancelable: false }
        )
    }
    async deleteAddress(id) {
        const d = {
            address_id: id
        }

        const header = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }


        await axios.post(this.state.data.url + "customaddressbook/delete&key=" + this.state.data.key + "&token=" + this.state.token.token + '&os_type=android', d, header)
            .then((response) => {
                this.setState({ all_data: response.data })
            })
        // console.log(this.state.all_data);
        if (this.state.all_data.status == 200) {
            this.setState({ address: this.state.all_data.body })
            showMessage({
                message: 'Address deleted successfully',
                duration: 4000,
                type: 'success',
                color: 'white',
                icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
                backgroundColor: 'green',
                titleStyle: { fontSize: 18 }
            })
        }
        else if (this.state.all_data.status == 204) {
            this.setState({ message: this.state.all_data.body })

        }

        // .catch((error) => {
        //     showMessage({
        //         message: error,
        //         duration: 4000,
        //         type: 'danger',
        //         color: 'white',
        //         icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
        //         backgroundColor: 'green',
        //         titleStyle: { fontSize: 18 }
        //     })
        // })

    }
    _onRefresh = () => {
        this.getData();
        this.setState({ refreshing: true });
        if (this.state.address.length > 0) {
            this.setState({ refreshing: false });
        }
    }
    async makeDefault(id) {
        this.setState({ toggle: id })

        const d = {
            address_id: id
        }
        // console.log("address_id=> ", id)
        const header = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }

        await axios.post(this.state.data.url + 'customaddressbook/updateDefaultAddress&key=' + this.state.data.key + '&token=' + this.state.token.token + '&os_type=android', d, header)
            .then((response) => {
                this.setState({ all_data: response.data })
            })
        // console.log(this.state.all_data);
        if (this.state.all_data.status == 200) {
            this.setState({ address: this.state.all_data.body })
            showMessage({
                message: 'Default address successfully Set',
                duration: 4000,
                type: 'success',
                color: 'white',
                icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
                backgroundColor: 'green',
                titleStyle: { fontSize: 18 }
            })
        }
        else if (this.state.all_data.status == 204) {
            this.setState({ message: this.state.all_data.body })

        }

    }


    render() {
        console.log(this.state.all_data);
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundTab}>
                {
                    this.state.all_data.status == undefined ? <LoadingComponent /> :
                        <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover"  >
                            <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false}
                                refreshControl={<RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this._onRefresh()}
                                />}
                            >
                                <View style={portraitStyles.headerMiddleTextContainer}>
                                    <Text style={portraitStyles.profileHeaderMiddleText}>Add Multiple Billing and Shipping Addresses.</Text>
                                </View>
                                {this.state.all_data.status == 200 ?
                                    <View style={portraitStyles.addressParentContainer} >
                                        {this.state.address.map((item, i) => (
                                            <View style={portraitStyles.addressChildContainer} key={i}>
                                                {/* <View style={{ width: '100%', paddingHorizontal: 30, paddingVertical: 10 }}>
                                                    <RadioGroup

                                                        radioButtons={this.state.radioButtons}
                                                        onPress={() => this.setRadioButtons(this.state.radioButtons)}
                                                        layout='row'
                                                    />
                                                </View> */}
                                                <TouchableOpacity style={{ width: '100%', paddingHorizontal: 30, paddingVertical: 10, display: 'flex', flexDirection: 'row', backgroundColor: '' }} onPress={() => this.makeDefault(item.address_id)}>
                                                    <MaterialIcons name={this.state.toggle == item.address_id || item.default == 1 ? 'radio-button-on' : 'radio-button-off'} size={25} color={"#B48D56"} />
                                                    <Text style={{ color: 'black', textAlignVertical: 'center', textAlign: 'center', paddingHorizontal: 10,paddingVertical:4 }}>Make Default</Text>
                                                </TouchableOpacity>
                                                <View style={{width:"90%"}}>
                                                    <Text style={portraitStyles.addressHeaderText}>{item.firstname} {item.lastname} </Text>
                                                    <Text style={portraitStyles.addressText}>{item.company}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.address_1}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.address_2}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.city} {item.postcode} </Text>
                                                    <Text style={portraitStyles.addressText}>{item.zone} </Text>
                                                    <Text style={portraitStyles.addressText}>{item.country}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', display: 'flex', width: "80%", justifyContent: 'space-between', padding: 20 }}>
                                                    <TouchableOpacity activeOpacity={0.9} style={{ width: '40%', backgroundColor: '#B48D56', borderRadius: 5, padding: 5 }} onPress={() => this.props.navigation.navigate('editaddress', { item_id: item.address_id })}>
                                                        <Text style={portraitStyles.addressButton}>Edit</Text>
                                                    </TouchableOpacity>
                                                    {this.state.address.length > 0 ?
                                                        <TouchableOpacity activeOpacity={0.9} style={{ width: '40%', backgroundColor: '#B48D56', borderRadius: 5, padding: 5 }} onPressIn={() => this.deleteConfirmation(item.address_id)}>
                                                            <Text style={portraitStyles.addressButton}>Delete</Text>
                                                        </TouchableOpacity> 
                                                        :
                                                        <>
                                                        </>
                                                    }
                                                </View>
                                            </View>
                                        ))}

                                    </View>
                                    :
                                    <View style={portraitStyles.headerMiddleTextContainer}>
                                        <Text style={portraitStyles.headerText}>{this.state.message}</Text>
                                    </View>
                                }
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.logoutButtonContainer} onPress={() => this.props.navigation.navigate('addaddress')}>
                                    <View style={portraitStyles.button} >
                                        <Text style={portraitStyles.buttonText}>Add New Address</Text>
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

export default AddressBook;

const RadioButton = ({ t }) => {
    const [toggle, settoggle] = useState(t);
    return (
        <TouchableOpacity style={{ width: '100%', paddingHorizontal: 30, paddingVertical: 10 }} onPress={() => settoggle(!toggle)}>
            <MaterialIcons name={toggle ? 'radio-button-on' : 'radio-button-off'} size={25} color={"black"} />
        </TouchableOpacity>
    )
} 
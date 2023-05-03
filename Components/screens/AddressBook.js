import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';

class AddressBook extends Component {
    state = {
        address: [],
        refreshing: false,
        all_data: {}
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
        await axios.get(this.state.data.url + "customaddressbook/get-addresses&key=" + this.state.data.key + "&token=" + this.state.data.token)
            .then((resp) => this.setState({ all_data: resp.data }))
            .catch((error) => console.warn(error));
        if (this.state.all_data.status == 200) {
            this.setState({ address: this.state.all_data.body })
        }
        else {
            this.setState({ message: this.state.all_data.body })
        }
    }
    async deleteAddress(id) {
        const d = {
            address_id: id
        }

        const header = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }


        await axios.post(this.state.data.url + "customaddressbook/delete&key=" + this.state.data.key + "&token=" + this.state.data.token + '&os_type=android', d, header).
            then((response) => {
                this.setState({ all_data: response.data })
            })
            console.log(this.state.all_data);
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
            else if(this.state.all_data.status == 204)  {
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

        this.setState({ refreshing: true });
        if (this.state.address.length > 0) {
            this.setState({ refreshing: false });
        }
    }

    render() {
        // console.log(this.state.all_data);
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
                {
                    this.state.all_data.status == undefined ? <View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View> :

                        <ScrollView style={portraitStyles.container}
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
                                            <Text style={portraitStyles.addressText}> {item.firstname} {item.lastname} </Text>
                                            <Text style={portraitStyles.addressText}>{item.company}</Text>
                                            <Text style={portraitStyles.addressText}>{item.address_1}</Text>
                                            <Text style={portraitStyles.addressText}> {item.address_2}</Text>
                                            <Text style={portraitStyles.addressText}> {item.city} {item.postcode} </Text>
                                            <Text style={portraitStyles.addressText}> {item.zone} </Text>
                                            <Text style={portraitStyles.addressText}> {item.country}</Text>
                                            <View style={{ flexDirection: 'row', display: 'flex', width: "70%", padding: 20 }}>
                                                <TouchableOpacity activeOpacity={0.9} style={{ width: '50%' }} onPress={() => this.props.navigation.replace('editaddress', { item_id: item.address_id })}>
                                                    <Text style={portraitStyles.addressButton}>Edit</Text>
                                                </TouchableOpacity>
                                                {this.state.address.length > 0 ?
                                                <TouchableOpacity activeOpacity={0.9} style={{ width: '50%' }} onPressIn={() => this.deleteAddress(item.address_id)}>
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
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({})

export default AddressBook;

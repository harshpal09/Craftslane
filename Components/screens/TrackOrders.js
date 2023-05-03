import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, SafeAreaView, ScrollView, Alert, Image, Dimensions, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { portraitStyles } from '../../Style/globleCss';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { showMessage } from 'react-native-flash-message';
// import UiOrientation from '../UiOrientation';

class TrackOrders extends Component {
    constructor()
    {
        super();
        this.state = {
            toggle: undefined,
            item: [],
            info:undefined,
            status: "",
            placed_on: "",
            order_id: undefined
        }

    }
    
    async submitFrom() {
        this.setState({ toggle: false })

        if(this.state.order_id != undefined) {

            try {
                let user = await AsyncStorage.getItem('user');
                let parsed = JSON.parse(user);
                this.setState({ data: parsed })

            }
            catch (error) {
                Alert.alert(error)
            }
            const data = {
                'order_id': this.state.order_id,
            }
            const header = {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }

            await axios.post(this.state.data.url + "customtrackorder/index&key=" + this.state.data.key + "&token=" + this.state.data.token, data, header).then((resp) => this.setState({ info: resp.data.body })).catch((error) => console.warn(error))

            this.setState({ toggle: true })

            // console.warn(this.state.data.url + "customtrackorder/index&key=" + this.state.data.key + "&token=" + this.state.data.token);
            if(this.state.info == 'Data not available')
            {   
                showMessage({
                    message: 'Data not available',
                    // duration: 4000,
                    type: 'danger',
                    color: 'white',
                    icon: props => <MaterialIcons name="error-outline" size={16} color={'white'} {...props} />,
                    titleStyle: { fontSize: 18 }
                })
            }
            else
            {
                this.setState({item:this.state.info})
                this.state.item.map((val) => {
                    this.setState({  placed_on: val.date_added ,status:val.name})
                })
            }
            
        }  
        else{
             
            showMessage({
                message: "please enter the order id",
                // duration: 4000,
                type: 'danger',
                color: 'white',
                icon: props => <MaterialIcons name="error-outline" size={16} color={'white'} {...props} />,
                titleStyle: { fontSize: 18 }
            })
            this.setState({toggle:true});
        }


    }
    render() {
        return (
            <SafeAreaView style={portraitStyles.screenBackground}>
                <ScrollView style={portraitStyles.container}>

                    <View style={portraitStyles.headerMiddleTextContainer}>
                        <Text style={portraitStyles.profileHeaderMiddleText}>Enter the Order Number for a status update on your Order</Text>
                    </View>
                    {this.state.item.length == false ?
                        <View>
                            <View style={portraitStyles.containLabelAndInput}>
                                <TextInput style={portraitStyles.input} placeholder="Enter your Order ID without using # symbol" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ order_id: text })} />
                            </View>
                            <TouchableOpacity activeOpacity={0.9} style={portraitStyles.logoutButtonContainer} onPress={() => this.submitFrom()} disabled={this.state.toggle == false ? true : false}>

                                <View style={portraitStyles.button} >
                                    {this.state.toggle == false ? <ActivityIndicator size="small" color="#fff" /> : <Text style={portraitStyles.buttonText}>Check Order Status</Text>}
                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={portraitStyles.addressParentContainer} >

                            <View style={portraitStyles.addressChildContainer}  >
                               
                                <Text style={portraitStyles.cartText}>Status: {this.state.status}</Text>
                                <Text style={portraitStyles.cartText}>Placed On :{this.state.placed_on}</Text>
                            </View>

                        </View>
                    }
                </ScrollView>

            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({})

export default TrackOrders;

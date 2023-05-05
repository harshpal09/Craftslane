import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, SafeAreaView, ScrollView, Alert, Image, Dimensions, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { portraitStyles } from '../../Style/globleCss';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { showMessage } from 'react-native-flash-message';
import { DataTable } from 'react-native-paper';
// import UiOrientation from '../UiOrientation';

class TrackOrders extends Component {
    constructor() {
        super();
        this.state = {
            toggle: undefined,
            item: [],
            info: undefined,
            status: "",
            placed_on: "",
            comment: "",
            order_id: undefined
        }

    }

    async submitFrom() {
        this.setState({ toggle: false })

        if (this.state.order_id != undefined) {

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
            if (this.state.info == 'Data not available') {
                showMessage({
                    message: 'Data not available',
                    // duration: 4000,
                    type: 'danger',
                    color: 'white',
                    icon: props => <MaterialIcons name="error-outline" size={16} color={'white'} {...props} />,
                    titleStyle: { fontSize: 18 }
                })
            }
            else {
                this.setState({ item: this.state.info })
                this.state.item.map((val) => {
                    this.setState({ placed_on: val.date_added, status: val.name, comment: val.comment })
                })
            }

        }
        else {

            showMessage({
                message: "please enter the order id",
                // duration: 4000,
                type: 'danger',
                color: 'white',
                icon: props => <MaterialIcons name="error-outline" size={16} color={'white'} {...props} />,
                titleStyle: { fontSize: 18 }
            })
            this.setState({ toggle: true });
        }


    }
    render() {
        return (
            <SafeAreaView style={portraitStyles.screenBackground}>
                <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover"  >
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
                        // <View style={portraitStyles.addressParentContainer} >

                        //     <View style={portraitStyles.addressChildContainer}>
                        //         <View style={{display:'flex',flexDirection:'row'}}>
                        //             <Text style={portraitStyles.orderHeadingText}>
                        //                 Order Id: <Text style={portraitStyles.cartText}>#{this.state.order_id}</Text>
                        //             </Text>
                        //             <Text style={portraitStyles.orderHeadingText}>
                        //                 Status: <Text style={portraitStyles.cartText}>{this.state.status}</Text>
                        //             </Text>
                        //             <Text style={portraitStyles.orderHeadingText}>
                        //                 Date: <Text style={portraitStyles.cartText}>{this.state.placed_on}</Text>
                        //             </Text>
                        //         </View>
                        //         <Text style={portraitStyles.orderHeadingText}>
                        //             Comment: <Text style={portraitStyles.cartText}>{this.state.comment}</Text>
                        //         </Text>
                        //     </View>

                        // </View>


                        <DataTable>
                            <DataTable.Row style={{
                                borderBottomColor: "#BBA890",
                                borderTopColor: '#BBA890',
                                borderTopWidth: 2,
                                borderBottomWidth: 2
                            }} >
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-around'
                                }}
                                >
                                    <Text style={portraitStyles.creditsTableHeaderText}>Order Id</Text>
                                    <Text style={portraitStyles.creditsTableHeaderText}>status</Text>
                                    <Text style={portraitStyles.creditsTableHeaderText}>Comment</Text>
                                    <Text style={portraitStyles.creditsTableHeaderText}>Date Added</Text>
                                </View>
                            </DataTable.Row>

                            <DataTable.Row style={portraitStyles.creditTableRow}>
                                <View style={portraitStyles.creditTableRowView}>         
                                    <Text style={portraitStyles.trackOrderTableText}>#{this.state.order_id}</Text>
                                    <Text style={portraitStyles.trackOrderTableText}>{this.state.status}</Text>
                                    <Text style={portraitStyles.trackOrderTableText}>{this.state.comment}</Text>
                                    <Text style={portraitStyles.trackOrderTableText}>{this.state.placed_on}</Text>

                                </View>
                            </DataTable.Row>

                        </DataTable>

                    }
                </ScrollView>
                </ImageBackground>

            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({})

export default TrackOrders;

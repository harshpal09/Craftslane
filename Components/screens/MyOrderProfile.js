import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, Image, Alert, Text, RefreshControl } from 'react-native';
import { portraitStyles } from '../../Style/globleCss';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoadingComponent from './LoadingComponent';

class MyOrderProfile extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            info: [],
            products: [],
            refreshing: false
        }
    }

    componentDidMount() {

        this.getdata();
    }
    async getdata() {

        const { id } = this.props.route.params;
        // console.warn(item);

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
        // console.log(this.state.data.url + "customorderlist/products&key=" + this.state.data.key + '&token=' + this.state.data.token + "&order_id=" + id);
        let resp2 = await axios.get(this.state.data.url + "customorderlist/products&key=" + this.state.data.key + '&token=' + this.state.token.token + "&order_id=" + id);
        this.setState({ cart: resp2.data.body })

        this.state.cart.map((data) => (
            data.products != undefined ? this.setState({ products: data.products }) : this.setState({ products: [] })
        ))
        // this.setState({ info: resp2.data })

        // console.warn(this.state.data.url +"customaccount/products&key=" + this.state.data.key + '&token=' + this.state.data.token + "&order_id=" + item)

    }
    _onRefresh = () => {

        this.setState({ refreshing: true });
        if (this.state.cart.length > 0) {
            this.setState({ refreshing: false });
        }
    }

    render() { 
        // console.warn(this.state.products)
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundTab} >
                {this.state.cart.length == false ? <LoadingComponent /> :
                    // <SafeAreaView style={portraitStyles.screenBackground}>
                    <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" >
                        <ScrollView style={portraitStyles.profileContainer} showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => this._onRefresh()}
                            />}
                        >

                            <ScrollView nestedScrollEnabled={true} style={portraitStyles.newView}>

                                <View style={portraitStyles.warpContainer} >
                                    {this.state.products.map((item, j) => (
                                        <View style={portraitStyles.cartProductContainer} key={j}>

                                            <View style={portraitStyles.cartImageContainer} >
                                                <Image style={portraitStyles.cartImage} source={{ uri: item.image }}></Image>
                                            </View>

                                            <View style={portraitStyles.contentContainer}>

                                                <View style={portraitStyles.cartTextContainer}>
                                                    <Text style={portraitStyles.cartText}>{item.name}</Text>
                                                </View>

                                                <View style={portraitStyles.cartTextContainer}>
                                                    <Text style={portraitStyles.cartModelText}> Unit Price: {item.price}</Text>
                                                </View>

                                                <View style={portraitStyles.cartTextContainer}>
                                                    <Text style={portraitStyles.cartModelText}> Total Price: {item.subtotal}</Text>
                                                </View>
                                                <View style={portraitStyles.cartTextContainer}>
                                                    <Text style={portraitStyles.cartText}> Quantity: {item.quantity}</Text>
                                                </View>




                                            </View>
                                        </View>
                                    ))}


                                </View>



                                {this.state.cart.map((info, i) => (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <DataTable style={portraitStyles.cartTable} key={i}>
                                            <DataTable.Row style={portraitStyles.tableRow}>
                                                <DataTable.Cell >ORDER ID</DataTable.Cell>
                                                <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.order_id}</Text></View>
                                            </DataTable.Row>
                                            <DataTable.Row style={portraitStyles.tableRow}>
                                                <DataTable.Cell  >Date Added</DataTable.Cell>
                                                <View style={portraitStyles.invoiceTableView} ><Text style={portraitStyles.invoiceTableText}>{info.date_added}</Text></View>
                                            </DataTable.Row>
                                            <DataTable.Row style={portraitStyles.tableRow}>
                                                <DataTable.Cell >Payment Method</DataTable.Cell>
                                                <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.billing_address.payment_method}</Text></View>
                                            </DataTable.Row>
                                            <DataTable.Row style={portraitStyles.tableRow}>
                                                <DataTable.Cell >Shipping Method</DataTable.Cell>
                                                <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.shipping_address.shipping_method}</Text></View>
                                            </DataTable.Row>
                                            <DataTable.Row style={portraitStyles.tableRow}>
                                                <DataTable.Cell >Sub-Total</DataTable.Cell>
                                                <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.order_info.total}</Text></View>
                                            </DataTable.Row>
                                            <DataTable.Row style={portraitStyles.tableRow}>
                                                <DataTable.Cell >Coupon (TEST09)</DataTable.Cell>
                                                <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.total_items}</Text></View>
                                            </DataTable.Row>
                                            <DataTable.Row style={portraitStyles.tableLastRow}>
                                                <DataTable.Cell >Total</DataTable.Cell>
                                                <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.order_total}</Text></View>
                                            </DataTable.Row>
                                            <DataTable.Row style={portraitStyles.tableLastRow}>
                                                <DataTable.Cell >Status</DataTable.Cell>
                                                <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.order_status}</Text></View>
                                            </DataTable.Row>
                                            <DataTable.Row style={portraitStyles.tableLastRow}>
                                                <DataTable.Cell >Comment</DataTable.Cell>
                                                <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.order_info.comment}</Text></View>
                                            </DataTable.Row>
                                        </DataTable>
                                    </View>
                                ))}
                                <View style={portraitStyles.headerTextContainer}>
                                    <Text style={portraitStyles.headerText}>Address</Text>
                                </View>
                                <View style={portraitStyles.addressParentContainer} >
                                    <View style={portraitStyles.addressChildContainer} >

                                        <View style={portraitStyles.addressSubChildContainer} >

                                            <View style={portraitStyles.addressTypeText}>
                                                <Text style={portraitStyles.headerAddressTypeText}>Payment Address</Text>
                                            </View>
                                            {this.state.cart.map((item, i) => (
                                                <View style={{ width: "90%" }} key={i}>
                                                    <Text style={portraitStyles.addressHeaderText}>{item.billing_address.payment_firstname} {item.billing_address.payment_lastname}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.billing_address.payment_address_1}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.billing_address.payment_city} {item.billing_address.payment_postcode}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.billing_address.payment_zone}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.billing_address.payment_country}</Text>

                                                </View>
                                            ))}

                                        </View>
                                        <View style={portraitStyles.addressSubChildContainer} >

                                            <View style={portraitStyles.addressTypeText}>
                                                <Text style={portraitStyles.headerAddressTypeText}>Shipping Address</Text>
                                            </View>
                                            {this.state.cart.map((item, i) => (
                                                <View style={{ width: "90%" }} key={i}>
                                                    <Text style={portraitStyles.addressHeaderText}>{item.shipping_address.shipping_firstname} {item.shipping_address.shipping_lastname}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.shipping_address.shipping_address_1}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.shipping_address.shipping_city} {item.shipping_address.shipping_postcode}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.shipping_address.shipping_zone}</Text>
                                                    <Text style={portraitStyles.addressText}>{item.shipping_address.shipping_country}</Text>

                                                </View>
                                            ))}

                                        </View>

                                    </View>


                                </View>

                                <View style={portraitStyles.logoutButtonContainer}>
                                    <TouchableOpacity activeOpacity={0.9} style={portraitStyles.button} onPress={() => this.initiateWhatsApp()}>
                                        <Text style={portraitStyles.buttonText} >Share </Text>
                                    </TouchableOpacity>
                                </View>



                            </ScrollView>

                            {/* </View> */}
                        </ScrollView>
                    </ImageBackground>

                    // </SafeAreaView>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({})

export default MyOrderProfile;

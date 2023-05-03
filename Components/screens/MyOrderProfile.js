import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView,ImageBackground, ScrollView, TouchableOpacity, Image, Alert, Text ,RefreshControl} from 'react-native';
import { portraitStyles } from '../../Style/globleCss';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class MyOrderProfile extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            info: [],
            products: [],
            refreshing:false
        }
    }

    componentDidMount() {

        this.getdata();
    }
    async getdata() {

        const { item } = this.props.route.params;
        // console.warn(item);

        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed })

            // console.warn(this.state.data)
        }
        catch (error) {
            Alert.alert(error)
        }

        let resp2 = await axios.get(this.state.data.url + "customorderlist/products&key=" + this.state.data.key + '&token=' + this.state.data.token + "&order_id=" + item);
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
                {this.state.cart.length == false ? <View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View> :
                    // <SafeAreaView style={portraitStyles.screenBackground}>
                    <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" >
                    <ScrollView style={portraitStyles.profileContainer} 
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
                                <DataTable style={portraitStyles.cartTable} key={i}>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <DataTable.Cell >ORDER ID</DataTable.Cell>
                                        <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.order_id}</Text></View>
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <DataTable.Cell  >NAME</DataTable.Cell>
                                        <View style={portraitStyles.invoiceTableView} ><Text style={portraitStyles.invoiceTableText}>{info.firstname} {this.state.info.lastname}</Text></View>
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <DataTable.Cell >E-mail</DataTable.Cell>
                                        <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.email}</Text></View>
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <DataTable.Cell >MOBILE</DataTable.Cell>
                                        <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.phone}</Text></View>
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <DataTable.Cell >IP</DataTable.Cell>
                                        <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.ip}</Text></View>
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <DataTable.Cell >TOTAL ITEMS</DataTable.Cell>
                                        <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.total_items}</Text></View>
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableLastRow}>
                                        <DataTable.Cell >TOTAL</DataTable.Cell>
                                        <View style={portraitStyles.invoiceTableView}><Text style={portraitStyles.invoiceTableText}>{info.order_total}</Text></View>
                                    </DataTable.Row>
                                </DataTable>
                            ))}
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

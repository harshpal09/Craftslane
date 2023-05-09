
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, SafeAreaView, Button, ScrollView, Alert, Pressable, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
// import UiOrientation from './UiOrientation';
import { portraitStyles } from "../Style/globleCss";
import axios from 'axios';
import { DataTable } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EmptyCart from './screens/EmptyCart';
import ImageLazyLoading from "react-native-image-lazy-loading";
import LoadingComponent from './screens/LoadingComponent';
// import Image from 'react-native-image-lazy-loading';

class CartScreen extends Component {

  constructor() {
    super();
    this.state = {
      len: 1,
      data: {},
      cart: [],
      cart_total: {},
      refreshing: false,

    }
  }

  componentDidMount() {

    this.getdata();
    //  this.cartItems();
    //  this.displayData();

    this.focusSubscription = this.props.navigation.addListener('focus', () => {
      this.getdata();

    });
  }

  componentWillUnmount() {
    this.focusSubscription();
  }

  cartItems() {

  }




  async getdata() {



    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })
    }
    catch (error) {
      Alert.alert(error)
    }
    // console.warn(this.state.data.url)
    let resp2 = await axios.get(this.state.data.url + "customcart/products&key=" + this.state.data.key + '&token=' + this.state.data.token + '&os_type=android');
    this.setState({ cart: resp2.data.products })
    this.setState({ cart_total: resp2.data })
    this.setState({ len: resp2.data.cart })

    // console.warn(resp2.data);



  }
  deleteConfirmation(id){
    Alert.alert(
        'Delete',
        'Do you really want to delete this address ?',
        [   {text: "Not Now"},
            { text: "Delete", onPress: () => this.deleteCart(id) }
        ],
        { cancelable: false }
    )
}


  deleteCart = async (product_id) => {
    const d = {
      product_id: product_id
    }

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }


    await axios.post(this.state.data.url + "customcart/remove&key=" + this.state.data.key + "&token=" + this.state.data.token + '&os_type=android', d, header).
      then((response) => {
        this.setState({ cart: response.data.products, cart_total: response.data, len: response.data.cart }),

          showMessage({
            message: 'Product deleted successfully',
            duration: 4000,
            type: 'success',
            color: 'white',
            icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
            backgroundColor: 'green',
            titleStyle: { fontSize: 18 }
          })


      })

  }




  async incFunction(product_id, quantity) {
    const d = {
      quantity: quantity + 1,
      product_id: product_id
    }

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }

    await axios.post(this.state.data.url + "customcart/edit&key=" + this.state.data.key + "&token=" + this.state.data.token + '&os_type=android', d, header)
      .then((response) =>
        this.setState({ cart: response.data.products, cart_total: response.data }),

        showMessage({
          message: 'Cart updated successfully',
          type: 'success',
          color: 'white',
          icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
          backgroundColor: 'green',
          titleStyle: { fontSize: 18 }
        })).catch((error) => console.warn(error))



  }


  async decFunction(product_id, quantity) {

    if (quantity > 1) {
      const d = {
        quantity: quantity - 1,
        product_id: product_id
      }
      // console.warn(d.quantity);
      const header = {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      }

      let resp = await axios.post(this.state.data.url + "customcart/edit&key=" + this.state.data.key + "&token=" + this.state.data.token + '&os_type=android', d, header)
        .then((response) =>
          this.setState({ cart: response.data.products, cart_total: response.data }),

          showMessage({
            message: 'Cart updated successfully',
            type: 'success',
            color: 'white',
            icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
            backgroundColor: 'green',
            titleStyle: { fontSize: 18 }
          }))

      // console.warn(resp)

    }
  }
  _onRefresh = () => {
    this.getdata();
    this.setState({ refreshing: true });
    if (this.state.cart.length > 0) {
      this.setState({ refreshing: false });
    }
  }



  render() {
    // console.log(this.state.cart)
    if (this.state.cart_total.total_items == 0) {
      return (
        <EmptyCart />
      )
    }

    return (

      <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
        {this.state.cart.length == false ?<LoadingComponent /> :
          <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover"  >
            <ScrollView showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this._onRefresh()}
              />}
            >
              {/* <View style={portraitStyles.parentContainer}> */}


                
              <View style={portraitStyles.warpContainer} >
                {this.state.cart.map((item, j) => (
                  <View style={portraitStyles.cartProductContainer} key={j}>

                    <View style={portraitStyles.cartImageContainer} >
                      <ImageLazyLoading style={portraitStyles.cartImage} source={{ uri: item.image }} />
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
                      <View style={portraitStyles.incDecButtonContainer}>

                        <View style={portraitStyles.cartIncDecContainer}>
                          <TouchableOpacity style={portraitStyles.decBtn} onPress={() => this.decFunction(item.product_id, item.quantity)}><Text style={portraitStyles.decButton}>-</Text></TouchableOpacity>
                          <Text style={portraitStyles.incDecField} >{item.quantity}</Text>
                          <TouchableOpacity style={portraitStyles.incBtn} onPress={() => this.incFunction(item.product_id, item.quantity)}><Text style={portraitStyles.incButton}>+</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity style={portraitStyles.refDelButton}>
                          <FontAwesome name="trash" size={30} color={'#5A5A5A'} onPress={() => this.deleteConfirmation(item.product_id)} />
                        </TouchableOpacity>
                      </View>


                    </View>
                  </View>
                ))}


              </View>



            <View style={{justifyContent:'center',alignItems:'center'}}>
              <DataTable style={portraitStyles.cartTable}>
                <DataTable.Row style={portraitStyles.tableRow}>
                  <DataTable.Cell >TOTAL ITEMS</DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: 16, fontWeight: 'bold' }} style={{ justifyContent: 'center' }}>{this.state.cart_total.total_items}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={portraitStyles.tableRow}>
                  <DataTable.Cell >SUB-TOTAL</DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: 16, fontWeight: 'bold' }} style={{ justifyContent: 'center', }} >{this.state.cart_total.total}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={portraitStyles.tableLastRow}>
                  <DataTable.Cell >TOTAL</DataTable.Cell>
                  <DataTable.Cell textStyle={{ fontSize: 16, fontWeight: 'bold' }} style={{ justifyContent: 'center' }}>{this.state.cart_total.total}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
             </View>

              <View style={portraitStyles.logoutButtonContainer}>
                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.button} onPress={() => this.props.navigation.navigate('Checkout', { item: this.state.cart_total.total_items, total: this.state.cart_total.total })}>
                  <Text style={portraitStyles.buttonText} >Checkout</Text>
                </TouchableOpacity>
              </View>


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

export default CartScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, Alert, RefreshControl } from 'react-native';
import { portraitStyles } from "../Style/globleCss";
import axios from 'axios';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EmptyCart from './screens/EmptyCart';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import ImageLazyLoading from "react-native-image-lazy-loading";
import LoadingComponent from './screens/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './redux/Actions';

export default function CartScreen({navigation}) {


  const [data, setData] = useState({});
  const [len, setLength] = useState(1);
  const [cart, setCart] = useState([]);
  const [cart_total, setCartTotal] = useState({});
  const [refreshing, setRefresh] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const dispatch = useDispatch();

  const item = useSelector(i => i);

  // console.log(item)
  useEffect(() => {

    getdata();
    isEmpty();

  }, [])



  getdata = async () => {

    let parsed = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

    }

    catch (error) {
      Alert.alert(error)
    }
    console.log("Cart url=>",parsed.url + "customcart/products&key=" + parsed.key + '&token=' + parsed.token + '&os_type=android')
    await axios.get(parsed.url + "customcart/products&key=" + parsed.key + '&token=' + parsed.token + '&os_type=android')
      .then((resp2) => {
        console.log(resp2.data)
        const values = {
          cart_items: resp2.data.total_cart,
          wishlist_items: item.wishlist_items
        }
        // dispatch(addItemToCart(values)),
          setCart(resp2.data.products),
          setCartTotal(resp2.data),
          setLength(resp2.data.cart)
          // console.log(cart)

      }
      ).catch(function (error) {
        console.log("post error: " + error);
      });




  }

  deleteConfirmation = (id) => {
    Alert.alert(
      'Delete',
      'Do you really want to delete this product from cart?',
      [{ text: "Not Now" },
      { text: "Delete", onPress: () => this.deleteCart(id) }
      ],
      { cancelable: false }
    )
  }


  deleteCart = async (product_id) => {
    setOverlay(true);
    let parsed = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

    }

    catch (error) {
      Alert.alert(error)
    }

    const d = {
      product_id: product_id
    }

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }

    console.log("Delete Url =>",parsed.url + "customcart/remove&key=" + parsed.key + "&token=" + parsed.token + '&os_type=android', d, header)
    await axios.post(parsed.url + "customcart/remove&key=" + parsed.key + "&token=" + parsed.token + '&os_type=android', d, header).
      then((response) => {
        console.log(response)
        const values = {
          cart_items: response.data.total_cart,
          wishlist_items: item.wishlist_items
        }
        // dispatch(addItemToCart(values)),

          setCart(response.data.products),
          setCartTotal(response.data),
          setLength(response.data.cart)
      })
    setOverlay(false)

  }




  incFunction = async (product_id, quantity) => {
    setOverlay(true);
    let parsed = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

    }

    catch (error) {
      Alert.alert(error)
    }

    const d = {
      quantity: quantity + 1,
      product_id: product_id
    }

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }

    await axios.post(parsed.url + "customcart/edit&key=" + parsed.key + "&token=" + parsed.token + '&os_type=android', d, header)
      .then((response) => {
        const values = {
          cart_items: response.data.total_cart,
          wishlist_items: item.wishlist_items
        }
        // dispatch(addItemToCart(values)),

          setCart(response.data.products),
          setCartTotal(response.data),
          setLength(response.data.cart),

          // showMessage({
          //   message: 'Cart updated successfully',
          //   type: 'success',
          //   color: 'white',
          //   icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
          //   backgroundColor: 'green',
          //   titleStyle: { fontSize: 18 }
          // })

          setOverlay(false);
      })




  }


  decFunction = async (product_id, quantity) => {

    let parsed = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

    }

    catch (error) {
      Alert.alert(error)
    }


    if (quantity > 1) {
      const d = {
        quantity: quantity - 1,
        product_id: product_id
      }

      const header = {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      }
      setOverlay(true);

      let resp = await axios.post(parsed.url + "customcart/edit&key=" + parsed.key + "&token=" + parsed.token + '&os_type=android', d, header)
        .then((response) => {
          const values = {
            cart_items: response.data.total_cart,
            wishlist_items: item.wishlist_items
          }
          // dispatch(addItemToCart(values)),

            setCart(response.data.products),
            setCartTotal(response.data),
            setLength(response.data.cart)

          setOverlay(false);
        })


    }

    // setOverlay(false);
  }

  _onRefresh = () => {
    getdata();
    setRefresh(true)
    if (cart.length > 0) {
      setRefresh(false)
    }
  }


  isEmpty = () => {
    if (cart_total.total_items == 0) {
      return (
        <EmptyCart />
      )
    }
  }

  return (

    <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
      {cart_total.total_items == 0 ? <EmptyCart /> : <View>
        {cart.length == false ? <LoadingComponent /> :
          <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover"  >
            <ScrollView showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._onRefresh()}
              />}
            >

              <Spinner visible={overlay} size={'large'} overlayColor='rgba(0,0,0,0.30)' textContent='Please wait..' textStyle={{ color: 'white' }} />


              <View style={portraitStyles.warpContainer} >
                {cart.map((item, j) => (
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
                          <FontAwesome name="trash" size={26} color={'grey'} onPress={() => this.deleteConfirmation(item.product_id)} />
                        </TouchableOpacity>
                      </View>


                    </View>
                  </View>
                ))}


              </View>



              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <DataTable style={portraitStyles.cartTable}>
                  <DataTable.Row style={portraitStyles.tableRow}>
                    <DataTable.Cell >TOTAL ITEMS</DataTable.Cell>
                    <DataTable.Cell textStyle={{ fontSize: 16, fontWeight: 'bold' }} style={{ justifyContent: 'center' }}>{cart_total.total_items}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={portraitStyles.tableRow}>
                    <DataTable.Cell >SUB-TOTAL</DataTable.Cell>
                    <DataTable.Cell textStyle={{ fontSize: 16, fontWeight: 'bold' }} style={{ justifyContent: 'center', }} >{cart_total.total}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row style={portraitStyles.tableLastRow}>
                    <DataTable.Cell >TOTAL</DataTable.Cell>
                    <DataTable.Cell textStyle={{ fontSize: 16, fontWeight: 'bold' }} style={{ justifyContent: 'center' }}>{cart_total.total}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>

              <View style={portraitStyles.logoutButtonContainer}>

                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.button} onPress={() =>navigation.navigate('Checkout', { item: cart_total.total_items, total: cart_total.total })}>

                  <Text style={portraitStyles.buttonText} >Checkout</Text>
                </TouchableOpacity>
              </View>




            </ScrollView>
          </ImageBackground>


        }
      </View>
      }
    </SafeAreaView>

  );

}



const styles = StyleSheet.create({})



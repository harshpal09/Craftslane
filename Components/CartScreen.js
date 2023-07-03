
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput,ActivityIndicator, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, Alert, RefreshControl } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import renderIf from './screens/renderIf';

export default function CartScreen({ navigation }) {


  const [data, setData] = useState({});
  // const [data, setAllData] = useState(1);
  const [cart, setCart] = useState([]);
  const [cart_total, setCartTotal] = useState([]);
  const [refreshing, setRefresh] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(undefined);
  const tokenAvailable = useSelector(
    (state) => state.tokenAvailable
  );

  const item = useSelector(i => i);

  // console.log(item)
  useEffect(() => {

    getdata();


  }, [])



  getdata = async () => {

    let parsed = {}
    let parsed2 = {}
    let user = await AsyncStorage.getItem('user');
    parsed = JSON.parse(user);

    if (tokenAvailable) {
      try {
        let token = await AsyncStorage.getItem('token');
        parsed2 = JSON.parse(token);
      }

      catch (error) {
        Alert.alert(error)
      }
    }

    console.log("Get Cart url=>", parsed.url + "customcart/products&key=" + parsed.key + '&token=' + parsed2.token + '&os_type=android')
    await axios.get(parsed.url + "customcart/products&key=" + parsed.key + '&token=' + parsed2.token + '&os_type=android')
      .then((resp2) => {

        // console.log("Data get by Api=>",resp2.data)
        // const values = {
        //   cart_items: resp2.data.total_cart,
        //   wishlist_items: item.wishlist_items
        // }
        // console.log(resp2.data)
        setCart(resp2.data.products),
          setCartTotal(resp2.data.totals),
          setData(resp2.data)
        // console.log("Cart Total=>",cart_total)


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
    let parsed2 = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

      let token = await AsyncStorage.getItem('token');
      parsed2 = JSON.parse(token);

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

    console.log("Delete Url =>", parsed.url + "customcart/remove&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header)
    await axios.post(parsed.url + "customcart/remove&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header).
      then((response) => {
        console.log(response.data)
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
    let parsed2 = {}

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

      let token = await AsyncStorage.getItem('token');
      parsed2 = JSON.parse(token);
    }

    catch (error) {
      Alert.alert(error)
    }
    console.log("Key in storage=>", parsed)
    const d = {
      quantity: quantity + 1,
      product_id: product_id
    }

    // console.log("Params on incresing=>", d)

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }
    console.log(parsed.url + "customcart/edit&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android')
    await axios.post(parsed.url + "customcart/edit&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header)
      .then((response) => {

        // const values = {
        //   cart_items: response.data.total_cart,
        //   wishlist_items: item.wishlist_items
        // }
        // dispatch(addItemToCart(values)),
        console.log("On increasing cart items=>", response.data)
        setCart(response.data.products),
          console.log("On increasing quantity=>", cart)
        // setCartTotal(response.data),
        // console.log("CArt Total=>",cart_total)
        // setLength(response.data.cart),


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
    let parsed2 = {}

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

      let token = await AsyncStorage.getItem('token');
      parsed2 = JSON.parse(token);

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
      console.log("Decrese Cart Api url=>", parsed.url + "customcart/edit&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android')

      let resp = await axios.post(parsed.url + "customcart/edit&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header)
        .then((response) => {
          console.log(response.data)
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
    console.log("On refresh")

    getdata();
    setRefresh(true)

    if (cart.length > 0) {
      setRefresh(false)
    }
  }

  validateCartItems = async () => {
    setToggle(false);
    let parsed = {};
    let parsed2 = {}

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

      let token = await AsyncStorage.getItem('token');
      parsed2 = JSON.parse(token);

    }

    catch (error) {
      Alert.alert(error)
    }

    console.log("Validate URL=>", parsed.url + "customcart/products&key=" + parsed.key + '&token=' + parsed2.token + "&get_error=1")
    await axios.get(parsed.url + "customcart/products&key=" + parsed.key + '&token=' + parsed2.token + "&get_error=1")
      .then((resp2) => {
        // console.log("error_warning=>" ,resp2.data.error_warning)
        // console.log("error_oops=>",resp2.data.error_oops)
        // console.log("error_option =>",resp2.data.error_option)
        setToggle(true);
        if (resp2.data.error_warning == "" && resp2.data.error_oops == "" && resp2.data.error_option == "") {
          getdata();
          navigation.navigate('Checkout')
        }
        else {
          getdata();
        }
      })

      // setToggle(true);
  }





  return (

    <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
      {!tokenAvailable ? <UserAuth />
        :
        <View>

          {data.total_products == undefined ? <EmptyCart /> : <View>
            {cart.length == false ? <LoadingComponent /> :
              <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover"  >
                <ScrollView showsVerticalScrollIndicator={false}
                  refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => _onRefresh()}
                  />}
                >

                  <Spinner visible={overlay} size={'large'} overlayColor='rgba(0,0,0,0.30)' textContent='Please wait..' textStyle={{ color: 'white' }} />


                  <View style={portraitStyles.warpContainer} >
                    {cart.map((item, j) => (
                      <View style={portraitStyles.cartProductContainer} key={j}>

                        <View style={portraitStyles.cartImageContainer} >
                          <ImageLazyLoading style={portraitStyles.cartImage} source={{ uri: item.thumb }} />
                        </View>

                        <View style={portraitStyles.contentContainer}>

                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.cartProductTitle}>{item.name}</Text>
                          </View>

                          {renderIf(item.option.length > 0)(
                            <View>
                              {item.option.map((op, i) => (
                                <View style={portraitStyles.cartTextContainer}>
                                  <Text style={portraitStyles.cartModelText}> {op.name}: {op.value}</Text>
                                </View>
                              ))}
                            </View>
                          )}

                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.cartModelText}> Unit Price: {item.price}</Text>
                          </View>

                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.cartModelText}> Total Price: {item.total}</Text>
                          </View>

                          {/* {item.option.length == 0? <Text></Text>:
                      <Text>COnfrigurations</Text>} */}




                          <View style={portraitStyles.incDecButtonContainer}>

                            <View style={portraitStyles.cartIncDecContainer}>
                              <TouchableOpacity style={portraitStyles.decBtn} onPress={() => this.decFunction(item.product_id, item.quantity)}><Text style={portraitStyles.decButton}>-</Text></TouchableOpacity>
                              <Text style={portraitStyles.incDecField} >{item.quantity}</Text>
                              <TouchableOpacity style={portraitStyles.incBtn} onPress={() => this.incFunction(item.product_id, item.quantity)}><Text style={portraitStyles.incButton}>+</Text></TouchableOpacity>
                            </View>

                            {renderIf(!item.stock)(
                              <View style={{ width: 100 }}>
                                {item.product_stock >= 1 ?
                                  <Text style={{ color: 'red', fontSize: 12, fontStyle:'italic' }}>Oops! We have only {item.product_stock >= 1 ? item.product_stock : ""} unit left in stock </Text>
                                  :
                                  <Text style={{ color: 'red', fontSize: 12,fontStyle:'italic' }}>Oops!We don't have this in the stock at the present time</Text>}
                              </View>
                            )}

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

                      {cart_total.map((item, k) => (
                        <DataTable.Row style={portraitStyles.tableRow} key={k}>
                          <DataTable.Cell >{item.title}</DataTable.Cell>
                          <DataTable.Cell textStyle={{ fontSize: 16, fontWeight: 'bold' }} style={{ justifyContent: 'center' }}>{item.text}</DataTable.Cell>
                        </DataTable.Row>
                      ))}
                    </DataTable>
                  </View>


                  <View style={portraitStyles.logoutButtonContainer}>

                    <TouchableOpacity activeOpacity={0.9} style={portraitStyles.button} onPress={() => validateCartItems()} disabled={toggle == false ? true : false}>
                      <View style={portraitStyles.button}>
                        {toggle == false ? <ActivityIndicator size={'small'} color={'#fff'} /> : <Text style={portraitStyles.buttonText}>Checkout</Text>}
                      </View>
                    </TouchableOpacity>
                  </View>




                </ScrollView>
              </ImageBackground>


            }
          </View>
          }
        </View>
      }
    </SafeAreaView>

  );

}

const UserAuth = ({ }) => {

  const dispatch = useDispatch();
  const [showModel, setModalVisible] = useState(false);
  const [mobile, setNumber] = useState('');
  const navigation = useNavigation();
  // const [showMessage, setShowMessage] = useState(true);


  // const val = useSelector(s => s.checkToken)

  const tokenAvailable = useSelector(
    (state) => state.tokenAvailable
  );
  console.log("User Auth initial val =>", tokenAvailable)

  useEffect(() => {
    // console.log("UseEffect val =>", val)
    isModelVisible();
  }, [])


  const isModelVisible = async () => {

    if (tokenAvailable) {
      setModalVisible(false);
      console.log(showModel)
    } else {
      setModalVisible(true);
      console.log(showModel);
    }
  };



  getCode = async () => {

    // dispatch(checkToken(true))
    setModalVisible(false);
    console.log('After dispatch =>', tokenAvailable)

    let parsed = {}


    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

    }
    catch (error) {
      Alert.alert(error)
    }
    // console.log(data)
    // console.log("Send OTP url=>",parsed.url + "customlogin/send_otp&key=" + parsed.key)
    await axios.get(parsed.url + "customlogin/send_otp&key=" + parsed.key + "&mobile=" + mobile)

    navigation.navigate('otp', { mobile: mobile + "" })

  }

  const closeModal = () => {
    setModalVisible(false);
    // setShowMessage(true); 
  };


  return (
    <View style={{ flex: 1 }}>


      <Modal isVisible={showModel}
        // onBackdropPress={() => setModalVisible(false)}
        style={{ width: '100%', marginLeft: 0, marginBottom: 0 }}
      >
        <View style={portraitStyles.modalContainer}>

          <View style={{ paddingTop: 20 }}>
            <Text style={portraitStyles.loginWelcomeText}>Welcome to Craftslane</Text>
          </View>


          <TouchableOpacity style={portraitStyles.closeContainer} onPress={closeModal} >
            <Text style={portraitStyles.closeIcon}>X</Text>
          </TouchableOpacity>

          <View style={{ padding: 10 }}>
            <Text style={portraitStyles.mobileMessage}>Please enter your mobile number</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>

            <View style={portraitStyles.mobileFieldContainer}>
              <Text style={{ fontSize: 18, padding: 10 }}>+91</Text>
              <TextInput style={{ fontSize: 18, padding: 8, width: '70%' }} placeholder='Enter mobile number'
                onChangeText={(text) => setNumber(text)}
              ></TextInput>
            </View>

            <View style={portraitStyles.otpButtonContainer}>
              <TouchableOpacity style={portraitStyles.otpButton} onPress={() => getCode()}>
                <Text style={{ color: 'white' }} >Get OTP</Text>
              </TouchableOpacity>
            </View>
          </View>



          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 18 }}>OR</Text>
          </View>


          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }} onPress={() => navigation.navigate('Login', setModalVisible(false))}>
            <Text style={{ fontSize: 18, color: '#B48D56', fontWeight: '400', fontFamily: 'Georgia' }}>Login with mobile/email and password</Text>
          </TouchableOpacity>

          <View style={{ padding: 5 }}>
            <Text style={{ fontSize: 18, padding: 5 }}>OR</Text>
          </View>

          <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('signup', setModalVisible(false))}>
            <Text style={{ fontSize: 18, color: '#B48D56', fontWeight: '400', fontFamily: 'Georgia', }}>New Sign up</Text>
          </TouchableOpacity>

          {/* <Button title="Hide modal" onPress={() => { dispatch(checkToken(false)) }} /> */}
        </View>
      </Modal>

      {renderIf(true)(
        <View style={portraitStyles.screenBackgroundStackTab}>
          <Text style={portraitStyles.loginMessageText}>Please login to open this page</Text>
          <TouchableOpacity
            style={portraitStyles.loginButton}
            onPress={() => {
              setModalVisible(true);
              // setShowMessage(false); 
            }}
          >
            <Text style={portraitStyles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}






import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, Alert, RefreshControl,KeyboardAvoidingView } from 'react-native';
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
import { addItemToCart } from './redux/Actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from "@react-navigation/native";

export default function CartScreen({ navigation }) {


  const [data, setData] = useState({});
  const [apply_spinner, setApplySpinner] = useState(undefined);
  const [coupon_code_sign, setCouponCodeSign] = useState("+");
  const [card_code_sign, setCardCodeSign] = useState("+");
  const [cart, setCart] = useState([]);
  const [cart_total, setCartTotal] = useState([]);
  const [refreshing, setRefresh] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(undefined);
  const tokenAvailable = useSelector(
    (state) => state.tokenAvailable
  );
  const isFocused = useIsFocused();

  const item = useSelector(i => i);

  // console.log(item)
  useEffect(() => {
    console.log("Use Effect")

    if (isFocused) {
      getdata();
    }



  }, [isFocused])



  getdata = async () => {

    let parsed = {}
    let parsed2 = {}
    let user = await AsyncStorage.getItem('user');
    parsed = JSON.parse(user);

    // if (tokenAvailable) {
    try {
      let token = await AsyncStorage.getItem('token');
      parsed2 = JSON.parse(token);
    }

    catch (error) {
      Alert.alert(error)
    }
    // }

    console.log("Get Cart url=>", parsed.url + "customcart/products&key=" + parsed.key + '&token=' + parsed2.token + '&os_type=android')
    await axios.get(parsed.url + "customcart/products&key=" + parsed.key + '&token=' + parsed2.token + '&os_type=android')
      .then((resp2) => {

        console.log("Get cart Api response=>", resp2.data)
        dispatch(addItemToCart(resp2.data.total_products));
        setCart(resp2.data.products),
          setCartTotal(resp2.data.totals),
          setData(resp2.data)
      }
      ).catch(function (error) {
        console.log("post error: " + error);
      });




  }

  deleteConfirmation = (id, cart_id) => {
    Alert.alert(
      'Delete',
      'Do you really want to delete this product from cart?',
      [{ text: "Not Now" },
      { text: "Delete", onPress: () => this.deleteCart(id, cart_id) }
      ],
      { cancelable: false }
    )
  }


  deleteCart = async (product_id, cart_id) => {
    // console.log("cart id=>", cart_id)
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
      product_id: product_id,
      cart_id: cart_id
    }

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }

    console.log("Delete Url =>", parsed.url + "customcart/remove&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header)
    await axios.post(parsed.url + "customcart/remove&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header).
      then((response) => {
        console.log("Delete cart response=>", response.data)
        dispatch(addItemToCart(response.data.total_products)),



          setData(response.data)
        setCart(response.data.products),
          setCartTotal(response.data.totals)
        // setLength(response.data.cart)
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
    // console.log("Key in storage=>", parsed)
    const d = {
      quantity: parseInt(quantity) + 1,
      product_id: product_id
    }

    // console.log("Params on incresing=>", d)

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }
    console.log("Increase Cart Url=>", parsed.url + "customcart/edit&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header)
    await axios.post(parsed.url + "customcart/edit&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header)
      .then((response) => {

        console.log("On increasing cart response=>", response.data)
        setCart(response.data.products),
          dispatch(addItemToCart(response.data.total_products)),


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
          console.log("Decrease cart item response=>", response.data)
          dispatch(addItemToCart(response.data.total_products)),
            // dispatch(addItemToCart(values)),

            setCart(response.data.products),
            setCartTotal(response.data.totals),
            // setLength(response.data.cart)

            setOverlay(false);
        })


    }

    // setOverlay(false);
  }

  _onRefresh = () => {
    // console.log("On refresh")

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
        console.log("Validate api response=>", resp2.data)

        setToggle(true);

        const errorMessage =
          resp2.data.error_warning ||
          resp2.data.error_oops ||
          resp2.data.error_option;

        if (resp2.data.error_warning == "" && resp2.data.error_oops == "" && resp2.data.error_option == "") {
          getdata();
          navigation.navigate('Checkout')
        }
        else {
          // console.log("dkjhgfwjhfkjdfhk");
          // console.log(resp2.data.error_warning)
          showMessage({
            message: errorMessage,
            duration: 4000,
            type: 'danger',
            color: 'white',
            icon: props => <MaterialIcons name="error" size={20} color={'white'} {...props} />,
            titleStyle: { fontSize: 18 }
          })
        }
      })

    // setToggle(true);
  }





  return (

    <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
      {!tokenAvailable ? <UserAuth />
        :
        <View>

          {data.total_products == 0 ? <EmptyCart /> : <View>
            {cart.length == false ? <LoadingComponent /> :
              <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover" style={portraitStyles.backgroundImg}  >
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

                          <View style={{ display: 'flex', flexDirection: 'row' }}>
                            {renderIf(item.option.length > 0)(
                              <View>
                                {item.option.map((op, i) => (
                                  <View style={portraitStyles.cartTextContainer}>
                                    <Text style={portraitStyles.cartModelText}> {op.name}: {op.value}</Text>
                                  </View>
                                ))}
                              </View>
                            )}

                            {renderIf(!item.stock)(
                              <View>
                                <Text style={{ color: 'red', fontSize: 18 }}>***</Text>
                              </View>
                            )}
                          </View>





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
                                  <Text style={{ color: 'red', fontSize: 12, fontStyle: 'italic' }}>Oops! We have only {item.product_stock >= 1 ? item.product_stock : ""} unit left in stock </Text>
                                  :
                                  <Text style={{ color: 'red', fontSize: 12, fontStyle: 'italic' }}>Oops!We don't have this in the stock at the present time</Text>}
                              </View>
                            )}

                            <TouchableOpacity style={portraitStyles.refDelButton}>
                              <FontAwesome name="trash" size={26} color={'grey'} onPress={() => this.deleteConfirmation(item.product_id, item.cart_id)} />
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

                  {/* <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }} >
                    <View style={{ borderColor: "#bba890", borderTopWidth: 1, width: '90%', paddingVertical: 20 }}>
                      <TouchableOpacity activeOpacity={0.9} style={portraitStyles.shippingPolicyContainer} onPress={() => {
                        //  coupon_code_sign == "-" ? setCouponCodeSign("+"): setCouponCodeSign("-");
                        if (coupon_code_sign == "+" && card_code_sign == "-") {
                          setCardCodeSign("+");
                          setCouponCodeSign("-");
                        }
                        else if (coupon_code_sign == "-") {
                          setCouponCodeSign("+");
                        }
                        else if (coupon_code_sign == "+") {
                          setCouponCodeSign("-");
                        }
                      }
                      }
                      >
                        <Text style={portraitStyles.overViewText}>Coupon Code</Text>
                        <Text style={portraitStyles.pText}>{coupon_code_sign}</Text>
                      </TouchableOpacity>
                      {renderIf(coupon_code_sign == "-")(
                        <View >
                          <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Enter Code" placeholderTextColor={'grey'} autoCapitalize="none" onChangeText={(text) => { setUserMail(text) }} />
                          </View>
                          <TouchableOpacity activeOpacity={0.9} style={portraitStyles.buttonContainer} onPress={() => { }} disabled={apply_spinner === false ? true : false} >
                            <View style={portraitStyles.button} >
                              {apply_spinner === false ? <ActivityIndicator size={'small'} color={'#fff'} /> : <Text style={portraitStyles.buttonText}>Apply</Text>}
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                      <TouchableOpacity activeOpacity={0.9} style={portraitStyles.shippingPolicyContainer} onPress={() => {
                        if (card_code_sign == "+" && coupon_code_sign == "-") {
                          setCouponCodeSign("+");
                          setCardCodeSign("-");
                        }
                        else if (card_code_sign == "-") {
                          setCardCodeSign("+");
                        }
                        else if (card_code_sign == "+") {
                          setCardCodeSign("-");
                        }
                      }}>
                        <Text style={portraitStyles.overViewText}>E-Gift Card Code</Text>
                        <Text style={portraitStyles.pText}>{card_code_sign}</Text>
                      </TouchableOpacity>
                      {renderIf(card_code_sign == "-")(
                        <View >
                          <View style={portraitStyles.containLabelAndInput}>
                            <TextInput style={portraitStyles.input} placeholder="Enter Code" placeholderTextColor={'grey'} autoCapitalize="none" onChangeText={(text) => { setUserMail(text) }} />
                          </View>
                          <TouchableOpacity activeOpacity={0.9} style={portraitStyles.buttonContainer} onPress={() => { }} disabled={apply_spinner === false ? true : false} >
                            <View style={portraitStyles.button} >
                              {apply_spinner === false ? <ActivityIndicator size={'small'} color={'#fff'} /> : <Text style={portraitStyles.buttonText}>Apply</Text>}
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View> */}



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
    let resp = await axios.get(parsed.url + "customlogin/send_otp&key=" + parsed.key + "&mobile=" + mobile)

    if (resp.data.status == 200) {
      setModalVisible(false)
      navigation.navigate('otp', { mobile: mobile + "" })
    } else {
      Alert.alert('Alert ', resp.data.success, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }

  }

  const closeModal = () => {
    setModalVisible(false);
    // setShowMessage(true); 
  };


  return (
    <View style={{ flex: 1 }}>

{/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
      <Modal isVisible={showModel}
        // onBackdropPress={() => setModalVisible(false)}
        style={{ width: '100%', marginLeft: 0, marginBottom: 0 }}
      >
        <View style={portraitStyles.modalContainer}>

          <View style={{ padding: 20}}>
            <Text style={portraitStyles.loginWelcomeText}>Welcome to Craftslane</Text>
          </View>


          <TouchableOpacity style={portraitStyles.closeContainer} onPress={closeModal} >
            <Text style={portraitStyles.closeIcon}>X</Text>
          </TouchableOpacity>

          <View style={{paddingBottom:20  }}>
            <Text style={portraitStyles.mobileMessage}>Please enter your mobile number</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>

            <View style={portraitStyles.mobileFieldContainer}>
              <Text style={{ fontSize: 18, padding: 10 }}>+91</Text>
              <TextInput style={{ fontSize: 18, padding: 8, width: '70%' }} placeholder='Enter mobile number' keyboardType='numeric'
                onChangeText={(text) => setNumber(text)}
              ></TextInput>
            </View>

            <View style={portraitStyles.otpButtonContainer}>
              <TouchableOpacity style={portraitStyles.otpButton} onPress={() => getCode()}>
                <Text style={{ color: 'white' }} >Get OTP</Text>
              </TouchableOpacity>
            </View>
          </View>



          <View style={{ padding: 15, marginTop:10 }}>
            <Text style={{ fontSize: 18 }}>OR</Text>
          </View>


          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }} onPress={() => navigation.navigate('login', setModalVisible(false))}>
            <Text style={{ fontSize: 18, color: '#B48D56', fontWeight: '400', fontFamily: 'Georgia' }}>Login with mobile/email and password</Text>
          </TouchableOpacity>

          <View style={{ padding: 15,}}>
            <Text style={{ fontSize: 18 }}>OR</Text>
          </View>

          <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('signup', setModalVisible(false))}>
            <Text style={{ fontSize: 18, color: '#B48D56', fontWeight: '400', fontFamily: 'Georgia', }}>New Sign up</Text>
          </TouchableOpacity>

          {/* <Button title="Hide modal" onPress={() => { dispatch(checkToken(false)) }} /> */}
        </View>
      </Modal>
      {/* </KeyboardAvoidingView> */}

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





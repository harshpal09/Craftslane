
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, SafeAreaView, Image, Alert, ScrollView, ImageBackground, TouchableOpacity, RefreshControl } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { portraitStyles } from '../../Style/globleCss';
import axios from 'axios';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import LoadingComponent from './LoadingComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import renderIf from './renderIf';
import { addItemToWishlist } from '../../Components/redux/Actions';

export default function WishList() {
  const [all_Data, setAll_Data] = useState({});
  const [wish_list, setWish_list] = useState([]);
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tokenAvailable = useSelector(
    (state) => state.tokenAvailable
  );
  const item = useSelector(i => i);


  useEffect(() => {

    getdata();

  }, [refreshing])

  const getdata = async () => {

    let parsed = {}
    let parsed2 = {}


    // if (tokenAvailable) {
    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

      let token = await AsyncStorage.getItem('token');
      parsed2 = JSON.parse(token);
    }

    catch (error) {
      Alert.alert(error)
    }

    console.log("Get Wishlist Url=>", parsed.url + "customwishlist/index&key=" + parsed.key + "&token=" + parsed2.token)
    await axios.get(parsed.url + "customwishlist/index&key=" + parsed.key + "&token=" + parsed2.token)
      .then((resp) => {

        // console.log("Get Wishlist Api response=>", resp.data)
        dispatch(addItemToWishlist(resp.data.total));
        setAll_Data(resp.data)
      }).catch((error) => {
        console.log('Error in parsing=>', error)
      })


    // }


  }
  // console.log(all_Data);
  _onRefresh = () => {
    console.log("Wishlist Refresh")
    setOverlay(true);
    setRefreshing(true);
    getdata();
    setRefreshing(false);
    setOverlay(false)
  }

  deleteProduct = async (product_id) => {
    setOverlay(true)

    let parsed = {}
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



    const d = {
      product_id: product_id
    }

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }

    console.log("Delete Wishlist Item url=>", parsed.url + "customwishlist/delete&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header)
    await axios.post(parsed.url + "customwishlist/delete&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header).
      then((response) => {
        // console.log("Delete wishlist response", response.data)
        dispatch(addItemToWishlist(response.data.total));
        setAll_Data(response.data)
      })

    setOverlay(false)

  }

  deleteConfirmation = (id) => {
    setOverlay(true);
    Alert.alert(
      'Delete',
      'Do you really want to Delete this product ?',
      [{ text: "Not Now" },
      { text: "Delete", onPress: () => deleteProduct(id) }
      ],
      { cancelable: false }
    )
    setOverlay(false);
  }


  addTocart = async (id) => {
    setOverlay(true);

    let parsed = {}
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

    const d = {
      product_id: id
    }
    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }

    console.log("Add to cart =>", parsed.url + "customcart/add&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android',)
    await axios.post(parsed.url + "customcart/add&key=" + parsed.key + "&token=" + parsed2.token + '&os_type=android', d, header)
      .then((response) => {
        // const values = {
        //   cart_items: item.cart_items,
        //   wishlist_items : Array.isArray(response.data.body) ? response.data.body.length : 0,
        // }
        // dispatch(addItemToCart(values)),
        console.log(response.data)
        console.log('add to cart')
      })
      .catch((error) => {
        console.warn(error);
      })
    setOverlay(false);


  }



  return (
    <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
      {/* {console.log("Main render =>", tokenAvailable)} */}

      {!tokenAvailable ? <UserAuth />
        :

        // {tokenAvailable && (
        <View>
          {/* {console.log("Token is  available")} */}
          {all_Data.status == undefined ? <LoadingComponent /> :
            <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" style={portraitStyles.backgroundImg} >
              <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => _onRefresh()}
                />}
              >
                <Spinner visible={overlay} size={'large'} overlayColor='rgba(0,0,0,0.30)' textContent='Please wait..' textStyle={{ color: 'white' }} />
                <View>
                  {all_Data.status == 200 ?
                    <View style={portraitStyles.warpProductContainer} >
                      {all_Data.body.map((item, j) => (
                        <View style={portraitStyles.cartProductContainer} key={j}>
                          <View style={portraitStyles.cartImageContainer} >
                            <Image style={portraitStyles.cartImage} source={{ uri: item.image }}></Image>
                          </View>
                          <View style={portraitStyles.contentContainer}>
                            <View style={portraitStyles.cartTextContainer}>
                              <Text style={portraitStyles.cartText}>{item.name}</Text>
                            </View>
                            <View style={portraitStyles.cartTextContainer}>
                              <Text style={portraitStyles.cartModelText}>Model: {item.model}</Text>
                            </View>

                            <View style={portraitStyles.cartTextContainer}>
                              <Text style={portraitStyles.cartText} >{item.stock}</Text>
                            </View>
                            <View style={portraitStyles.incDecButtonContainer}>
                              <View style={portraitStyles.cartIncDecContainer}>
                                <Text style={portraitStyles.wishlistPriceText} >Unit Price: {item.price}</Text>
                              </View>
                              <TouchableOpacity activeOpacity={0.9} style={portraitStyles.refDelButton}>
                              <Image
                        source={require('../../assets/images/black-cart.png')} style={{width:22, height:22}} onPress={() => navigation.navigate("homeaccent", { cat: "", id: item.product_id })} />
                              </TouchableOpacity>
                              <TouchableOpacity activeOpacity={0.9} style={portraitStyles.refDelButton} onPress={() => deleteConfirmation(item.product_id)}>
                                <EvilIcons name="trash" size={28} color={'grey'} />
                              </TouchableOpacity>
                            </View>
                          </View>

                        </View>
                      ))}
                    </View>
                    :
                    <View style={portraitStyles.headerMiddleTextContainer}>
                      <Text style={portraitStyles.headerText}>{all_Data.body}</Text>
                    </View>
                  }
                </View>


              </ScrollView>
            </ImageBackground>
          }

        </View>
        // )
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
    // let resp = await axios.get(parsed.url + "customlogin/send_otp&key=" + parsed.key + "&mobile=" + mobile)

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
            <Text style={{ fontSize: 18,  fontWeight: '400', fontFamily: 'Georgia' }}>Login with mobile/email and password</Text>
          </TouchableOpacity>

          <View style={{ padding: 15,}}>
            <Text style={{ fontSize: 18 }}>OR</Text>
          </View>

          <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('signup', setModalVisible(false))}>
            <Text style={{ fontSize: 18, fontWeight: '400', fontFamily: 'Georgia', }}>New Sign up</Text>
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


import React, {useEffect, useState, useRef, memo} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';

// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import {portraitStyles} from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import ImageLazyLoading from 'react-native-image-lazy-loading';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart, checkToken} from '../redux/Actions';
import renderIf from './renderIf';
import Spinner from 'react-native-loading-spinner-overlay';
// import UserAuth from '../UserAuth';
import Modal from 'react-native-modal';
import {setTokenAvailability} from '../redux/Actions';
import {CHECK_TOKEN} from '../redux/ActionTypes';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {useMemo} from 'react';
import {addItemToWishlist} from '../../Components/redux/Actions';
import LoadingComponent from './LoadingComponent';
import CarouselLoading from './CarouselLoading';

export default function Product({route, navigation}) {

  const {item_name, index, item_id, parent_category_id} = route.params;


  const [categories, setCategories] = useState([]);
  const [item, setItems] = useState([]);
  const [name, setName] = useState('');
  const [response_data, setData] = useState({});
  const [cat_id, setCatId] = useState(undefined);
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(false);
  const [allData, setAllData] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState(item_id);
  const [chidiya, setChidiya] = useState(false);
  const [isFirstTime, setFirstTime] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const [op, setOp] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUserAuth, setShowUserAuth] = useState(false);
  const [diff, setDiff] = useState(0);

  const [index_carousel, setIndexCarousel] = useState(index);

  const badge_value = useSelector(i => i);
  const horizontalScrollviewRef = useRef(null);

  const scrollToHorizontalComponent = () => {
    // console.log("Inside function")
    if (horizontalScrollviewRef.current) {
      console.log("Inside If");
      console.log("Index value =>",index_carousel);
      const xOffset = index_carousel * 134;

      horizontalScrollviewRef.current.scrollTo({x: xOffset, animated: true});
    }
  };

  // console.log("inside main pre fetch");


  useEffect(() => {
    // console.log("inside useeffect 1st pre fetch");
    checkToken();
    setIsLoading(true)
    carouselData();
    // console.log("inside useeffect 1st post fetch");
 
  }, []);
  
  useEffect(() => {

   setChidiya(true);
    getdata(1);

  }, [subCategoryId]);
  useEffect(() => {
    getdata(1);
  }, [page])
  

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setShowUserAuth(true);
    }
  };

  const handleCloseUserAuth = () => {
    setShowUserAuth(false);
  };

  // const handleCarouselClick = (id, title) => {
  //   // console.log('Handle click title =>', title);
  //   // console.log('Handle click id =>', id);
  //   setSubCategoryId(id);
  //   setName(title);
  // };

  const carouselData = async () => {
    let parsed = {};
    console.log("inside carouselData pre fetch");
    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);
    } catch (error) {
      Alert.alert(error);
    }

    let resp = await axios.get(
      parsed.url +
        'customsubcategories/index&key=' +
        parsed.key +
        '&token=' +
        parsed.token +
        '&category_id=' +
        parent_category_id,
    )
    // console.log(
    //   'Carousel Api Url =>',
    //   parsed.url +
    //     'customsubcategories/index&key=' +
    //     parsed.key +
    //     '&token=' +
    //     parsed.token +
    //     '&category_id=' +
    //     parent_category_id,
    // );

    setAllData(resp.data.data);
    // if(isFirstTime){
      // console.log("inside carouselData post fetch");
    //  setTimeout(()=> scrollToHorizontalComponent(),500);
      
    
    // }
    setIsLoading(false)
    setFirstTime(false)
  };

  const getdata = async () => {
    // console.log("inside getdata pre fetch");

    let parsed = {};
    
    const {item_name, item_id, parent_category_id} = route.params;
    setCatId(item_id);
    setName(item_name);

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);
    } catch (error) {
      Alert.alert(error);
    }

    // console.log("Category Products calling url=>",parsed.url + "categoryproducts/index&cat_id=" + subCategoryId + "&key=" + parsed.key + "&page=" + page + "&limit=" + 10 )
    let r = await axios.get(
      parsed.url +
        'categoryproducts/index&cat_id=' +
        subCategoryId +
        '&key=' +
        parsed.key +
        '&page=' +
        page +
        '&limit=' +
        10,
    );
    setIsLoading(false);
    // console.log("Product Page Response =>",r.data)
    setData(r.data);
    // console.log("inside getdata post fetch");


    if (response_data.success == 0) {
      showMessage({
        message: response_data.error,
        duration: 4000,
        type: 'danger',
        color: 'white',
        icon: props => (
          <MaterialIcons name="error" size={20} color={'white'} {...props} />
        ),
        titleStyle: {fontSize: 18},
      });
    } else {
      // setDiff(r.data.categories.length);
      console.log("lenght =>",item.length," page=>",page)
      if (subCategoryId != item_id) {
        setItems(r.data.categories);
      } else {
        setItems(item.concat(r.data.categories));
      }
    }
    // setPage(p);
    // setToggle(false);
    setChidiya(false);
    // console.log("Chidiya =>", chidiya)
  };

  renderItem = ({item}) => {
    return (
      <View style={portraitStyles.productContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('homeaccent', {cat: '' + cat_id, id: item.id})
          }
          style={portraitStyles.productImageContainer}>
          <ImageBackground
            imageStyle={{
              opacity: item.stock == 0 ? 0.5 : 1,
              borderRadius: item.stock == 0 ? 0 : 15,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              width: 149,
              height: 149,
            }}
            source={{uri: item.image}}
          />
          <LikeButton id={item.id} />
        </TouchableOpacity>

        {renderIf(item.stock == 0)(
          <View style={{width: 150}}>
            <View
              style={{
                backgroundColor: '#af0b1f',
                width: '100%',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Out Of Stock
              </Text>
            </View>
          </View>,
        )}

        <TouchableOpacity style={portraitStyles.productTextContainer}>
          <Text
            style={portraitStyles.productText}
            numberOfLines={2}
            onPress={() =>
              navigation.navigate('homeaccent', {
                cat: JSON.stringify(cat_id),
                id: item.id,
              })
            }>
            {item.title}
          </Text>
        </TouchableOpacity>

        <View style={portraitStyles.priceContainer}>
          {item.price_range != '' ? (
            <View style={portraitStyles.priceTextContainer}>
              <Text style={portraitStyles.priceText}>{item.price_range}</Text>
              <Text style={portraitStyles.discountPrice}>{item.MRP_range}</Text>
            </View>
          ) : item.special != false ? (
            <View style={portraitStyles.priceTextContainer}>
              <Text style={portraitStyles.priceText}>{item.special}</Text>
              <Text style={portraitStyles.discountPrice}>
                {item.temp_price}
              </Text>
            </View>
          ) : (
            <View style={portraitStyles.priceTextContainer}>
              <Text style={portraitStyles.priceText}>{item.temp_price}</Text>
            </View>
          )}

          {renderIf(item.stock != 0)(
            <TouchableOpacity
              activeOpacity={0.9}
              style={portraitStyles.addButton}
              onPress={() =>
                navigation.navigate('homeaccent', {
                  cat: JSON.stringify(cat_id),
                  id: item.id,
                })
              }>
              <Image
                source={require('../../assets/images/black-cart.png')}
                style={{width: 22, height: 22}}
              />
            </TouchableOpacity>,
          )}
        </View>
        <View style={portraitStyles.productOptionParentcontainer}>
          {renderIf(item.handcrafted == 1)(
            <View style={portraitStyles.productOptionContainer}>
              <Image
                style={portraitStyles.productOptionIcon}
                source={require('../../assets/images/options_icons/handcrafted_icon.png')}
              />
            </View>,
          )}
          {renderIf(item.sustain == 1)(
            <View style={portraitStyles.productOptionContainer}>
              <Image
                style={portraitStyles.productOptionIcon}
                source={require('../../assets/images/options_icons/sustainably_sourced_icon.png')}
              />
            </View>,
          )}
          {renderIf(item.is_gift_wrap == 1)(
            <View style={portraitStyles.productOptionContainer}>
              <Image
                style={portraitStyles.productOptionIcon}
                source={require('../../assets/images/options_icons/gift.png')}
              />
            </View>,
          )}
        </View>
        {renderIf(item.is_personalized == 1)(
          <View style={portraitStyles.productOptionContainer}>
            <Image
              style={portraitStyles.productOptionIcon}
              source={require('../../assets/images/options_icons/personalize_icon.png')}
            />
            <Text style={portraitStyles.productOptionText}>
              Can be Personalized
            </Text>
          </View>,
        )}
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={portraitStyles.separator} />;
  };

  const memoizedValue = useMemo(() => renderItem, [item]);
  console.log("inside main postr fetch",subCategoryId);

  return (
    <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <ImageBackground
          source={require('../../assets/base-texture.png')}
          resizeMode="cover">
          <View style={{height: 170}}>
            <ScrollView
              ref={horizontalScrollviewRef}
              horizontal={true}
              onLayout={()=>scrollToHorizontalComponent()}
              style={portraitStyles.carosalSlide}
              showsHorizontalScrollIndicator={false}>
              {allData.map((data, idx) => (
                <View style={portraitStyles.carouselImageContainer} key={idx}>
                  {data.sub_category.map((item, ind) => (
                    <View
                      style={portraitStyles.carouselImageTextContainer}
                      key={ind}>
                      {item.sub_sub_category.map((sub_item, sub_idx) => (
                        <View
                          key={sub_idx}
                          style={{
                            padding: 5,
                            display: 'flex',
                            width: 130,
                            // backgroundColor:'red',
                            marginHorizontal: 2,
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                              
                              setSubCategoryId(sub_item.id),
                                setIndexCarousel(sub_idx);
                            }}
                            style={portraitStyles.productCarouselContainer}>
                            <ImageLazyLoading
                              style={{
                                width: 95,
                                height: 95,
                                borderRadius: 50,
                                borderColor:
                                  sub_item.id === subCategoryId
                                    ? '#B48D56'
                                    : '#849e3c',
                                borderWidth: 3,
                              }}
                              source={{uri: sub_item.image}}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.9}
                            style={portraitStyles.textContainer}
                            onPress={() => setSubCategoryId(sub_item.id)}>
                            <Text style={portraitStyles.categoryType}>
                              {sub_item.title}
                            </Text>
                            {/* <Text>{sub_item.title}</Text> */}
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>

          {chidiya ? (
            <CarouselLoading />
          ) : (
            <FlatList
              data={item}
              renderItem={memoizedValue}
              keyExtractor={i => i.id.toString()}
              numColumns={DeviceInfo.isTablet() ? 3 : 2}
              columnWrapperStyle={{
                width: '100%',
                justifyContent: 'space-evenly',
              }}
              onEndReached={() => {
                // if (diff >= 10) {
                  // setIsLoading(true)
                 setPage(page+1);
                // }
              }}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => {
                    if (diff >= 10) {
                      // setIsLoading(true)
                      // getdata(), 
                      console.log('refresh pull  ');
                    }
                  }}
                />
              }
              ListFooterComponent={
                isLoading ? (
                  <View style={styles.loaderStyle}>
                    <ActivityIndicator size="large" color="#aaa" />
                  </View>
                ) : null
              }
              onEndReachedThreshold={0}
              ItemSeparatorComponent={renderSeparator}
            />
          )}
        </ImageBackground>
      )}
    </SafeAreaView>
  );
}

const LikeButton = ({id, tog}) => {
  const dispatch = useDispatch();
  const badgeCount = useSelector(i => i);
  const [liked, setLiked] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const [isTrue, setIsTrue] = useState(false);
  const tokenAvailable = useSelector(state => state.tokenAvailable);

  useEffect(() => {
    setIsTrue(false);
  }, [liked]);

  const addToWishlist = async id => {
    liked ? setLiked(false) : setLiked(true);
    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);

    if (tokenAvailable) {
      setIsTrue(false);

      let token = await AsyncStorage.getItem('token');
      let parsed2 = JSON.parse(token);

      const d = {
        product_id: id,
      };

      const header = {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      };

      // console.log("Add to wishlist url=>", parsed.url + 'customwishlist/add&key=' + parsed.key + '&token=' + parsed2.token + "&os_type=ios", d)
      await axios
        .post(
          parsed.url +
            'customwishlist/add&key=' +
            parsed.key +
            '&token=' +
            parsed2.token +
            '&os_type=ios',
          d,
          header,
        )
        .then(response => {
          dispatch(addItemToWishlist(response.data.total));
        });
    } else {
      setIsTrue(true);
    }

    // setOverlay(false)
  };

  return (
    <Pressable
      onPress={() => addToWishlist(id)}
      style={{
        position: 'absolute',
        padding: 10,
        margin: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 250, 236, 0.5)',
      }}>
      <Spinner
        visible={overlay}
        size={'large'}
        overlayColor="rgba(0,0,0,0.30)"
        textContent="Please wait.."
        textStyle={{color: 'white'}}
      />

      {renderIf(isTrue)(<UserAuth isTrue={isTrue} />)}

      <EvilIcons
        name="heart"
        size={25}
        color={liked && tokenAvailable ? '#e60505' : '#3D3D3D'}
      />
    </Pressable>
  );
};

const UserAuth = ({isTrue}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [toggle, setToggle] = useState(undefined);
  const [mobile, setNumber] = useState('');
  const navigation = useNavigation();

  // const val = useSelector(s => s.tokenAvailable)
  // console.log(val)

  useEffect(() => {
    // console.log("UseEffect =>", val)
    setModalVisible(isTrue);
  }, [isTrue]);

  getCode = async () => {
    setToggle(false);
    dispatch(checkToken(false));
    // console.log('After dispatch =>', val)

    let parsed = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);
    } catch (error) {
      Alert.alert(error);
    }
    // console.log(data)
    // console.log("Send OTP url=>",parsed.url + "customlogin/send_otp&key=" + parsed.key+"&mobile="+mobile)
    let resp = await axios.get(
      parsed.url +
        'customlogin/send_otp&key=' +
        parsed.key +
        '&mobile=' +
        mobile,
    );
    setToggle(true);

    if (resp.data.status == 200) {
      setModalVisible(false);
      navigation.navigate('otp', {mobile: mobile + ''});
    } else {
      Alert.alert('Alert ', resp.data.success, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{width: '100%', marginLeft: 0, marginBottom: 0}}>
        <View style={portraitStyles.modalContainer}>
          <View style={{padding: 20}}>
            <Text style={portraitStyles.loginWelcomeText}>
              Welcome to Craftslane
            </Text>
          </View>

          <TouchableOpacity
            style={portraitStyles.closeContainer}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={portraitStyles.closeIcon}>X</Text>
          </TouchableOpacity>

          <View style={{paddingBottom: 20}}>
            <Text style={portraitStyles.mobileMessage}>
              Please enter your mobile number
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={portraitStyles.mobileFieldContainer}>
              <Text style={{fontSize: 18, padding: 10}}>+91</Text>
              <TextInput
                style={{fontSize: 18, padding: 8, width: '70%'}}
                placeholder="Enter mobile number"
                keyboardType="numeric"
                onChangeText={text => setNumber(text)}></TextInput>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={portraitStyles.otpButtonContainer}
              onPress={getCode}
              disabled={toggle === false ? true : false}>
              <View style={portraitStyles.otpButton}>
                {toggle === false ? (
                  <ActivityIndicator size={'small'} color={'#fff'} />
                ) : (
                  <Text style={{color: 'white'}}>Get OTP</Text>
                )}
              </View>
            </TouchableOpacity>

            {/* <View style={portraitStyles.otpButtonContainer}>
                            <TouchableOpacity style={portraitStyles.otpButton} onPress={() => getCode()}>
                                <Text style={{ color: 'white' }} >Get OTP</Text>
                            </TouchableOpacity>
                        </View> */}
          </View>

          <View style={{padding: 15, marginTop: 10}}>
            <Text style={{fontSize: 18}}>OR</Text>
          </View>

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() =>
              navigation.navigate('login', setModalVisible(false))
            }>
            <Text
              style={{
                fontSize: 18,
                color: '#B48D56',
                fontWeight: '400',
                fontFamily: 'Georgia',
              }}>
              Login with mobile/email and password
            </Text>
          </TouchableOpacity>

          <View style={{padding: 15}}>
            <Text style={{fontSize: 18}}>OR</Text>
          </View>

          <TouchableOpacity
            style={{padding: 5}}
            onPress={() =>
              navigation.navigate('signup', dispatch(checkToken(false)))
            }>
            <Text
              style={{
                fontSize: 18,
                color: '#B48D56',
                fontWeight: '400',
                fontFamily: 'Georgia',
              }}>
              New Sign up
            </Text>
          </TouchableOpacity>

          {/* <Button title="Hide modal" onPress={() => { dispatch(checkToken(false)) }} /> */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

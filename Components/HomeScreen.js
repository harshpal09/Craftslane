import React, { useEffect, useState } from "react";
import { View, Image, TextInput, Text, ScrollView, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Linking, RefreshControl, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/Feather'
import { portraitStyles } from "../Style/globleCss";
import axios from "axios";
import ImageLazyLoading from "react-native-image-lazy-loading";
import LoadingComponent from "./screens/LoadingComponent";
import SearchFilter from './SearchFilter'
import { LogBox } from 'react-native';
import { addItemToWishlist } from './redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './redux/Actions';
// import { addItemToCart } from './redux/Actions';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function HomeScreen({ navigation }) {

  const [refreshing, setRefresh] = useState(false);
  const [alldata, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [input, setInput] = useState("");
  const images = [
    require('../assets/banner_images/banner2.png'),
    require('../assets/banner_images/banner3.png'),
    require('../assets/banner_images/banner1.jpeg')
  ]
  const [imgActive, setimgActive] = useState(0);
  const dispatch = useDispatch();
  const tokenAvailable = useSelector(
    (state) => state.tokenAvailable
  );


  useEffect(() => {

    getData();
    searchArray();
    // setInput("");

  }, [])


  searchArray = async () => {
    let parsed = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

    }

    catch (error) {
      Alert.alert(error)
    }

    let res = await axios.get(parsed.url + "customcateautosuggestion/index&key=" + parsed.key + "&token=" + parsed.token);
    // console.log(parsed.url + "customcateautosuggestion/index&key=" + parsed.key + "&token=" + parsed.token)
    setSearch(res.data.body);

  }

  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != images) {
        setimgActive(slide);
      }
    }
  }


  getData = async () => {
    
   
    let parsed = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);
      // console.log(parsed)

    }

    catch (error) {
      Alert.alert(error)
    }

    let resp = await axios.get(parsed.url + "customhome/index&key=" + parsed.key + "&token=" + parsed.token)
    setData(resp.data.data)

    // if (tokenAvailable) {
    //   console.log("Home screen get data")
    //   await axios.get(parsed.url + "customwishlist/index&key=" + parsed.key + "&token=" + parsed.token).then((resp) => {
    //     console.log(resp.data)
    //     dispatch(addItemToWishlist(resp.data.total));
    //   })

    //   await axios.get(parsed.url + "customcart/products&key=" + parsed.key + '&token=' + parsed.token + '&os_type=android')
    //     .then((resp2) => {
    //       dispatch(addItemToCart(resp2.data.total_products))
    //     }).catch(function (error) {
    //       console.log("post error: " + error);
    //     });


    //   }else{
    //     dispatch(addItemToWishlist(0));
    //   }
   
    


  }


  _onRefresh = () => {
    getData();
    setRefresh(true);
    if (alldata.length > 0) {
      setRefresh(false);
    }
  }



  return (

    <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>

      {alldata.length == false ? <LoadingComponent /> :
        <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover"  >
          <ScrollView style={portraitStyles.container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={() => _onRefresh()}
          />}>


            <View style={portraitStyles.searchBar}>

              <TextInput style={portraitStyles.textField} placeholder='Search' placeholderTextColor={'grey'} onChangeText={(t) => setInput(t)} />
              <TouchableOpacity onPress={() => navigation.navigate('allProducts', { order_by: "" })} style={portraitStyles.searchButton}><Feather name="search" color="#000" size={22} /></TouchableOpacity>

            </View>


            <TouchableOpacity onPress={() => setInput("")} style={portraitStyles.searchBarFilter}>


              <SearchFilter data={search} input={input} />

            </TouchableOpacity>

            <View style={portraitStyles.headerTextContainer}>
              <Text style={portraitStyles.headerText}>Categories</Text>
            </View>

            {/* <View style={{alignItems:'center',justifyContent:'center',padding:5,width:'100%'}}> */}
              <ScrollView horizontal={true} style={portraitStyles.carosalSlide} showsHorizontalScrollIndicator={false}>
                {/* <View style={{alignItems:'center',justifyContent:'space-evenly',backgroundColor:'red',padding:5,width:Dimensions.get('screen').width}}> */}
                {alldata.map((data, idx) => (
                  <View style={portraitStyles.categoryImageContainer} key={idx}>
                    {data.categories.map((item, ind) => {
                      return (
                        <View style={portraitStyles.imageTextContainer} key={ind} >
                          {/* {console.log(item.title)} */}
                          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('categories', { cat_id: item.id })} style={portraitStyles.imageContainer}>
                            <ImageLazyLoading style={portraitStyles.categoryImage} source={{ uri: item.image }} />
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={0.9} style={portraitStyles.textContainer} onPress={() => navigation.navigate('categories', { cat_id: item.id })}>
                            <Text
                              style={portraitStyles.categoryType}
                            >{item.title}</Text>
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                  </View>
                ))}
                {/* </View> */}
              </ScrollView>
            {/* </View> */}

            <View style={{ width: "100%",  }}>
              <View style={portraitStyles.wrap}>
                <ScrollView onScroll={({ nativeEvent }) =>
                  onchange(nativeEvent)}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  scrollEventThrottle={0}
                  horizontal
                  style={portraitStyles.wrap}
                >
                  {
                    images.map((e, index) =>
                      <Image
                        key={e}
                        resizeMethod="auto"
                        style={portraitStyles.wrap}
                        source={ e}
                      />
                    )
                  }

                </ScrollView>
                <View style={portraitStyles.wrapDot}>
                  {
                    images.map((e, index) =>
                      <Text key={e}
                        style={imgActive == index ? portraitStyles.dotActive : portraitStyles.dot}>
                        ●
                      </Text>
                    )
                  }
                </View>
              </View>
            </View>

            <View style={portraitStyles.headerTextContainer}>
              <Text style={portraitStyles.headerText}>New Arrivals</Text>
              <Text style={portraitStyles.allText} onPress={() => navigation.navigate('allProducts', { order_by: 'new_arrivals' })}>See All</Text>
            </View>

            <View>
              <ScrollView horizontal={true} style={portraitStyles.carosalSlide} showsHorizontalScrollIndicator={false}>
                {alldata.map((data, idx) => (
                  <View style={portraitStyles.newArrivalImageContainer} key={idx}>
                    {data.new_arrivals.map((item, ind) => {
                      return (
                        <View style={portraitStyles.imageTextContainer} key={ind} >
                          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('homeaccent', { cat: "", id: item.id })} style={portraitStyles.imageContainer}>
                            <ImageLazyLoading style={portraitStyles.newArrivalImage} source={{ uri: item.image }} />
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('homeaccent', { cat: "", id: item.id })} style={portraitStyles.textContainer}>
                            <Text
                              style={portraitStyles.categoryType}
                              onPress={() => navigation.navigate('categories')}
                            >{item.title}</Text>
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                  </View>
                ))}
              </ScrollView>
            </View>



            <View style={portraitStyles.headerTextContainer}>
              <Text style={portraitStyles.headerText}>Popular Trends</Text>
              <Text style={portraitStyles.allText} onPress={() => navigation.navigate('allProducts', { order_by: 'popular_trends' })}>See All</Text>
            </View>


            <View >
              {alldata.map((data, idx) => (
                <View style={portraitStyles.warpContainer} key={idx}>
                  {data.popular_trends.map((item, ind) => {
                    return (
                      <View style={portraitStyles.warpImageTextContainer} key={ind} >
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('homeaccent', { cat: "", id: item.id })} style={portraitStyles.squareImageContainer}>
                          <ImageLazyLoading style={portraitStyles.popularImage} source={{ uri: item.image }} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('homeaccent', { cat: "", id: item.id })} style={portraitStyles.textContainer}>
                          <Text style={portraitStyles.categoryType}>{item.title}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  })}
                </View>
              ))}
            </View>
            <View style={portraitStyles.headerTextContainer}>
              <Text style={portraitStyles.headerText}>Follow on Facebook & Instagram</Text>
            </View>

            {alldata.map((item, idx) => (
              <View style={portraitStyles.fotter} key={idx}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('https://www.instagram.com/craftslane/?hl=en')}>
                  <ImageLazyLoading style={portraitStyles.bannerImage} source={{ uri: item.footer_banner_1 }} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('https://www.facebook.com/CraftslaneIndia/?hl=en')}>
                  <Image style={portraitStyles.bannerImage} source={{ uri: item.footer_banner_2 }} />
                </TouchableOpacity>
              </View>
            ))}

          </ScrollView>
        </ImageBackground>
      }
    </SafeAreaView>
  );




}

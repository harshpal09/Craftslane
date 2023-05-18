import React, { useEffect, useState } from "react";
import { View, Image, TextInput, Text, ScrollView, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Linking,RefreshControl, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/Feather'
import { portraitStyles } from "../Style/globleCss";
import axios from "axios";
import ImageLazyLoading from "react-native-image-lazy-loading";
import LoadingComponent from "./screens/LoadingComponent";
import SearchFilter from './SearchFilter'
import { LogBox } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItemToCart } from './redux/Actions';
LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();

export default function HomeScreen({navigation}){

  const [refreshing , setRefresh] = useState(false);
  const [alldata , setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [input , setInput] = useState("");

  useEffect(() => {

  getData();
  searchArray();

  }, [])


   searchArray = async() => {
    let parsed = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);
      
  }

  catch (error) {
      Alert.alert(error)
  }

    let res = await axios.get(parsed.url + "customcateautosuggestion/index&key=" + parsed.key + "&token=" + parsed.token);
  
    setSearch(res.data.body);

  }


   getData = async() => {

     let parsed = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);
      
  }
  
  catch (error) {
      Alert.alert(error)
  }

    let resp = await axios.get(parsed.url + "customhome/index&key=" + parsed.key + "&token=" + parsed.token)
    // console.log(resp.data)
    setData(resp.data.data)
  }


  _onRefresh = () => {
   getData();
    setRefresh(true);
    if(alldata.length > 0){
      setRefresh(false);
    }
  }


    
    return (
      <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>

        {alldata.length == false ? <LoadingComponent /> :
          <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover"  >
            <ScrollView style={portraitStyles.container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl
              refreshing={refreshing}
              onRefresh={()=> _onRefresh()}
            />}>


              <View style={portraitStyles.searchBar}>
              
                <TextInput style={portraitStyles.textField}  placeholder='Search' placeholderTextColor={'grey'} onChangeText={(t)=> setInput(t)} />
                <TouchableOpacity onPress={()=> navigation.navigate('allProducts',{order_by:""})} style={portraitStyles.searchButton}><Feather name="search" color="#000" size={22} /></TouchableOpacity>
                
              </View>


              <View style={portraitStyles.searchBarFilter}>


                <SearchFilter data={search} input={input} />

              </View>  

              <View style={portraitStyles.headerTextContainer}>
                <Text style={portraitStyles.headerText}>Categories</Text>
              </View>
              <View>
                <ScrollView horizontal={true} style={portraitStyles.carosalSlide} showsHorizontalScrollIndicator={false}>
                  {alldata.map((data, idx) => (
                    <View style={portraitStyles.categoryImageContainer} key={idx}>
                      {data.categories.map((item, ind) => {
                        return (
                          <View style={portraitStyles.imageTextContainer} key={ind} >
                            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('categories', {cat_id:item.id })} style={portraitStyles.imageContainer}>
                              <ImageLazyLoading style={portraitStyles.categoryImage} source={{ uri: item.image }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={portraitStyles.textContainer} onPress={() => navigation.navigate('categories',{cat_id:item.id })}>
                              <Text
                                style={portraitStyles.categoryType}
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
                <Text style={portraitStyles.headerText}>New Arrivals</Text>
                <Text style={portraitStyles.allText} onPress={() => navigation.navigate('allProducts',{order_by:'new_arrivals'})}>See All</Text>
              </View>

              <View>
                <ScrollView horizontal={true} style={portraitStyles.carosalSlide} showsHorizontalScrollIndicator={false}>
                  {alldata.map((data, idx) => (
                    <View style={portraitStyles.categoryImageContainer} key={idx}>
                      {data.new_arrivals.map((item, ind) => {
                        return (
                          <View style={portraitStyles.imageTextContainer} key={ind} >
                            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('product', )} style={portraitStyles.imageContainer}>
                              <ImageLazyLoading style={portraitStyles.categoryImage} source={{ uri: item.image }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('product')} style={portraitStyles.textContainer}>
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
                <Text style={portraitStyles.allText} onPress={() => navigation.navigate('allProducts',{order_by:'popular_trends'})}>See All</Text>
              </View>


              <View >
                {alldata.map((data, idx) => (
                  <View style={portraitStyles.warpContainer} key={idx}>
                    {data.popular_trends.map((item, ind) => {
                      return (
                        <View style={portraitStyles.warpImageTextContainer} key={ind} >
                          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('product')} style={portraitStyles.squareImageContainer}>
                            <ImageLazyLoading style={portraitStyles.popularImage} source={{ uri: item.image }} />
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('product')} style={portraitStyles.textContainer}>
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
                  <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('https://www.facebook.com/CraftslaneIndia/')}>
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


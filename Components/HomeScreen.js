import React, { Component } from "react";
import { View, Image, TextInput, Text, ScrollView, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Linking,RefreshControl, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import UiOrientation from "./UiOrientation";
import Feather from 'react-native-vector-icons/Feather'
import { portraitStyles } from "../Style/globleCss";
import axios from "axios";
import ImageLazyLoading from "react-native-image-lazy-loading";
import LoadingComponent from "./screens/LoadingComponent";
import SearchFilter from './SearchFilter'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();
class HomeScreen extends Component{

  state = {
    refreshing: false,
    alldata:[],
    search:[],
    input: ""
  };
  componentDidMount(){
    this.getData();
    this.searchArray();
    

    AsyncStorage.setItem('badge', JSON.stringify(1));
 
  }

  async searchArray(){
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })

  }
  catch (error) {
      Alert.alert(error)
  }

    let res = await axios.get(this.state.data.url + "customcateautosuggestion/index&key=" + this.state.data.key + "&token=" + this.state.data.token);
    // console.log(this.state.data.url + "customcateautosuggestion/index&key=" + this.state.data.key + "&token=" + this.state.data.token);
    this.setState({ search: res.data.body})
    // console.log(this.state.search)
  }


  async getData(){

    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })

  }
  catch (error) {
      Alert.alert(error)
  }

    let resp = await axios.get(this.state.data.url + "customhome/index&key=" + this.state.data.key + "&token=" + this.state.data.token)
    // console.log(this.state.data.url + "customhome/index&key=" + this.state.data.key + "&token=" + this.state.data.token)
    this.setState({ alldata: resp.data.data })
    console.log(this.state.alldata)
  }


  _onRefresh = () => {
    this.render();
    this.setState({ refreshing: true });
    if(this.state.alldata.length > 0){
      this.setState({ refreshing: false });
    }
  }

  render() {
    
    return (
      <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>

        {this.state.alldata.length == false ? <LoadingComponent /> :
          <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover"  >
            <ScrollView style={portraitStyles.container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={()=> this._onRefresh()}
            />}>
              {/* <Spinner visible={this.state.categories.length ? false : true} overlayColor="rgba(0, 0, 0, 0.58)" textContent='Loading...' textStyle={portraitStyles.loadingTextStyle} size={50} animation="slide" /> */}

              <View style={portraitStyles.searchBar}>
                {/* <Feather name="search" color="#000" size={18} /> */}
                <TextInput style={portraitStyles.textField}  placeholder='Search' placeholderTextColor={'grey'} onChangeText={(t)=> this.setState({input:t})} />
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('allProducts')} style={portraitStyles.searchButton}><Feather name="search" color="#000" size={22} /></TouchableOpacity>
                
              </View>

              <View style={portraitStyles.searchBarFilter}>
                <SearchFilter data={this.state.search} input={this.state.input} />
              </View>

              <View style={portraitStyles.headerTextContainer}>
                <Text style={portraitStyles.headerText}>Categories</Text>
              </View>
              <View>
                <ScrollView horizontal={true} style={portraitStyles.carosalSlide} showsHorizontalScrollIndicator={false}>
                  {this.state.alldata.map((data, idx) => (
                    <View style={portraitStyles.categoryImageContainer} key={idx}>
                      {data.categories.map((item, ind) => {
                        return (
                          <View style={portraitStyles.imageTextContainer} key={ind} >
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('categories', {cat_id:item.id })} style={portraitStyles.imageContainer}>
                              <ImageLazyLoading style={portraitStyles.categoryImage} source={{ uri: item.image }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={portraitStyles.textContainer} onPress={() => this.props.navigation.navigate('categories',{cat_id:item.id })}>
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
                <Text style={portraitStyles.allText} onPress={() => this.props.navigation.navigate('newarrivals')}>See All</Text>
              </View>

              <View>
                <ScrollView horizontal={true} style={portraitStyles.carosalSlide} showsHorizontalScrollIndicator={false}>
                  {this.state.alldata.map((data, idx) => (
                    <View style={portraitStyles.categoryImageContainer} key={idx}>
                      {data.new_arrivals.map((item, ind) => {
                        return (
                          <View style={portraitStyles.imageTextContainer} key={ind} >
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={portraitStyles.imageContainer}>
                              <ImageLazyLoading style={portraitStyles.categoryImage} source={{ uri: item.image }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={portraitStyles.textContainer}>
                              <Text
                                style={portraitStyles.categoryType}
                                onPress={() => this.props.navigation.navigate('categories')}
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
                <Text style={portraitStyles.allText} onPress={() => this.props.navigation.navigate('populartrends')}>See All</Text>
              </View>


              <View >
                {this.state.alldata.map((data, idx) => (
                  <View style={portraitStyles.warpContainer} key={idx}>
                    {data.popular_trends.map((item, ind) => {
                      return (
                        <View style={portraitStyles.warpImageTextContainer} key={ind} >
                          <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={portraitStyles.squareImageContainer}>
                            <ImageLazyLoading style={portraitStyles.popularImage} source={{ uri: item.image }} />
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={portraitStyles.textContainer}>
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

              {this.state.alldata.map((item, idx) => (
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
}
export default HomeScreen;
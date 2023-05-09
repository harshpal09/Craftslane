import React, { Component } from "react";
import { View, Image, TextInput, Text, ScrollView, ImageBackground, Dimensions, TouchableOpacity, SafeAreaView, Linking,RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import UiOrientation from "./UiOrientation";
import Feather from 'react-native-vector-icons/Feather'
import { portraitStyles } from "../Style/globleCss";
import axios from "axios";
import ImageLazyLoading from "react-native-image-lazy-loading";
import LoadingComponent from "./screens/LoadingComponent";
import SearchFilter from './SearchFilter'
class HomeScreen extends UiOrientation {

  state = {
    refreshing: false,
    alldata:[],
    search:[],
    input: ""
  };
  componentDidMount(){
    this.getData();
    this.searchArray();

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
    let resp = await axios.get('https://echoit.in/craftslane-apis/homepage.php')
    this.setState({ alldata: resp.data.data })
  }


  _onRefresh = () => {
    this.render();
    this.setState({ refreshing: true });
    if(this.state.alldata.length > 0){
      this.setState({ refreshing: false });
    }
  }

  render() {
    // console.warn(this.s )
    return (
      <SafeAreaView style={this.getStyle().screenBackgroundStackTab}>

        {this.state.alldata.length == false ? <LoadingComponent /> :
          <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover" onLayout={this.onLayout.bind(this)} >
            <ScrollView style={portraitStyles.container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={()=> this._onRefresh()}
            />}>
              {/* <Spinner visible={this.state.categories.length ? false : true} overlayColor="rgba(0, 0, 0, 0.58)" textContent='Loading...' textStyle={this.getStyle().loadingTextStyle} size={50} animation="slide" /> */}

              <View style={this.getStyle().searchBar}>
                <Feather name="search" color="#000" size={18} />
                <TextInput style={this.getStyle().textField} placeholder='Search' placeholderTextColor={'grey'} onChangeText={(t)=> this.setState({input:t})} />
              </View>

              <View style={this.getStyle().searchBarFilter}>
                <SearchFilter data={this.state.search} input={this.state.input} />
              </View>

              <View style={this.getStyle().headerTextContainer}>
                <Text style={this.getStyle().headerText}>Categories</Text>
              </View>
              <View>
                <ScrollView horizontal={true} style={this.getStyle().carosalSlide} showsHorizontalScrollIndicator={false}>
                  {this.state.alldata.map((data, idx) => (
                    <View style={this.getStyle().categoryImageContainer} key={idx}>
                      {data.categories.map((item, ind) => {
                        return (
                          <View style={this.getStyle().imageTextContainer} key={ind} >
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('categories')} style={this.getStyle().imageContainer}>
                              <ImageLazyLoading style={this.getStyle().categoryImage} source={{ uri: item.image }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={this.getStyle().textContainer} onPress={() => this.props.navigation.navigate('categories')}>
                              <Text
                                style={this.getStyle().categoryType}
                              >{item.title}</Text>
                            </TouchableOpacity>
                          </View>
                        )
                      })}
                    </View>
                  ))}
                </ScrollView>
              </View>

              <View style={this.getStyle().headerTextContainer}>
                <Text style={this.getStyle().headerText}>New Arrivals</Text>
                <Text style={this.getStyle().allText} onPress={() => this.props.navigation.navigate('newarrivals')}>See All</Text>
              </View>

              <View>
                <ScrollView horizontal={true} style={this.getStyle().carosalSlide} showsHorizontalScrollIndicator={false}>
                  {this.state.alldata.map((data, idx) => (
                    <View style={this.getStyle().categoryImageContainer} key={idx}>
                      {data.new_arrivals.map((item, ind) => {
                        return (
                          <View style={this.getStyle().imageTextContainer} key={ind} >
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={this.getStyle().imageContainer}>
                              <ImageLazyLoading style={this.getStyle().categoryImage} source={{ uri: item.image }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={this.getStyle().textContainer}>
                              <Text
                                style={this.getStyle().categoryType}
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



              <View style={this.getStyle().headerTextContainer}>
                <Text style={this.getStyle().headerText}>Popular Trends</Text>
                <Text style={this.getStyle().allText} onPress={() => this.props.navigation.navigate('populartrends')}>See All</Text>
              </View>


              <View >
                {this.state.alldata.map((data, idx) => (
                  <View style={this.getStyle().warpContainer} key={idx}>
                    {data.popular_trends.map((item, ind) => {
                      return (
                        <View style={this.getStyle().warpImageTextContainer} key={ind} >
                          <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={this.getStyle().squareImageContainer}>
                            <ImageLazyLoading style={this.getStyle().popularImage} source={{ uri: item.image }} />
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={this.getStyle().textContainer}>
                            <Text style={this.getStyle().categoryType}>{item.title}</Text>
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                  </View>
                ))}
              </View>
              <View style={portraitStyles.headerTextContainer}>
                <Text style={this.getStyle().headerText}>Follow on Facebook & Instagram</Text>
              </View>

              {this.state.alldata.map((item, idx) => (
                <View style={this.getStyle().fotter} key={idx}>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('https://www.instagram.com/craftslane/?hl=en')}>
                    <ImageLazyLoading style={this.getStyle().bannerImage} source={{ uri: item.footer_banner_1 }} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('https://www.facebook.com/CraftslaneIndia/')}>
                    <Image style={this.getStyle().bannerImage} source={{ uri: item.footer_banner_2 }} />
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
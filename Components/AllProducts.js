import React, { Component, useState, useMemo } from "react";
import { View, Text, Dimensions, FlatList, TextInput, StyleSheet, ActivityIndicator, RefreshControl, ImageBackground, TouchableOpacity, SafeAreaView } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from './screens/LoadingComponent';
import ImageLazyLoading from "react-native-image-lazy-loading";
import { portraitStyles } from "../Style/globleCss";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import renderIf from "./screens/renderIf";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { showMessage } from 'react-native-flash-message';
import { PureComponent } from "react/cjs/react.production.min";
import RadioGroup from "react-native-radio-buttons-group";


export default class AllProducts extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      result: [],
      currentPage: 0,
      resultPage: 0,
      isLoading: false,
      all_orders: [],
      all_data: {},
      message: '',
      refreshing: false,
      isShowForm: false,
      category: [],
      isFocus: false,
      isTraySelect: false,
      cat_id: 0,
      product: "",
      diff:0,
      isSearch: false,
      order_by: undefined,
      onChange:"",
      radiobuttons: [
        {
          id: '1', // acts as primary key, should be unique and non-empty string
          label: 'New Arrivals',
          value: 'new_arrivals'
        },
        {
          id: '2',
          label: 'Popular Trends',
          value: 'popular_trends',
          // selected:true
        }
      ]
    }
  }

  componentDidMount() {
    this.getUsers();
    this.categoryArray();
  }

  onRefresh() {
    this.getUsers();
  }

  searchProduct = async (val) => {

    val ? this.setState({ resultPage: this.state.resultPage, result: this.state.result }) : this.setState({ resultPage: 0, result: [] })

    // console.log(this.state.order_by)

    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })

    }
    catch (error) {
      Alert.alert(error)
    }


    this.setState({ resultPage: this.state.resultPage + 1 })

    this.setState({ isLoading: true });

    console.log(this.state.data.url + "customadvsearch/index&key=" + this.state.data.key + "&token=" + this.state.data.token + "&category_id=" + this.state.cat_id + "&title=" + this.state.product + "&page=" + this.state.resultPage+"&order="+this.state.order_by)
    let res = await axios.get(this.state.data.url + "customadvsearch/index&key=" + this.state.data.key + "&token=" + this.state.data.token + "&category_id=" + this.state.cat_id + "&title=" + this.state.product + "&page=" + this.state.resultPage+"&order="+this.state.order_by)
      .then(res => {

        this.setState({ all_data: res.data })
        console.log(this.state.all_data)


      })
      this.setState({diff:this.state.all_data.products.length })

    if (this.state.all_data.status == 200) {

      console.log(this.state.all_data.status);
      
      // console.log("Diff value =>",this.state.diff);

      this.setState({ result: this.state.result.concat(this.state.all_data.products) })

    }
    else {

      showMessage({
        message: this.state.all_data.error,
        type: 'danger',
        color: 'white',
        icon: props => <MaterialIcons name="error-outline" size={16} color={'white'} {...props} />,
        titleStyle: { fontSize: 18 }
      })
    }

    setTimeout(() => this.setState({ isLoading: false }), 1000)


  }

  async categoryArray() {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })

    }
    catch (error) {
      Alert.alert(error)
    }

    let res = await axios.get(this.state.data.url + "customcateautosuggestion/index&key=" + this.state.data.key + "&token=" + this.state.data.token);

    this.setState({ category: res.data.body })

  }

  async getUsers() {
   const { order_by } = this.props.route.params;
  //  console.log(order_by)
  
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })
    }
    catch (error) {
      Alert.alert(error)
    }

    this.setState({ currentPage: this.state.currentPage + 1 })

    this.setState({ isLoading: true });
    console.log(this.state.data.url + "customadvsearch/index&key=" + this.state.data.key + "&token=" + this.state.data.token + "&page=" + this.state.currentPage+"&order="+order_by)
    await axios.get(this.state.data.url + "customadvsearch/index&key=" + this.state.data.key + "&token=" + this.state.data.token + "&page=" + this.state.currentPage+"&order="+order_by)
      .then(res => {
        this.setState({ all_data: res.data })
      });
    if (this.state.all_data.status == 200) {

      this.setState({ users: this.state.users.concat(this.state.all_data.products) })

    }
    else {

      this.setState({ message: this.state.all_data.error })
    }
    setTimeout(() => this.setState({ isLoading: false }), 1000)
  };


  renderItem = ({ item }) => {
    return (
      
      <TouchableOpacity activeOpacity={0.9} style={portraitStyles.cartProductContainer} onPress={() => this.props.navigation.push('homeaccent', { cat: "", id: item.id })}  >
        <View style={portraitStyles.cartImageContainer} >
          {/* {console.log(item)} */}

          <ImageLazyLoading style={portraitStyles.cartImage} source={{ uri: item.image }} />


        </View>
        <View style={portraitStyles.navParentContainer}>
          <View style={portraitStyles.navContainer}>
            <View style={portraitStyles.cartTextContainer}>
              <Text style={portraitStyles.orderHeadingText}>
                <Text style={portraitStyles.cartText}>{item.title} </Text>
              </Text>
            </View>
            <View style={portraitStyles.cartTextContainer}>
              <Text style={portraitStyles.orderHeadingText}>
                Model: <Text style={portraitStyles.cartText}>{item.model}</Text>
              </Text>
            </View>

            <View style={portraitStyles.cartTextContainer}>
              <Text style={portraitStyles.orderHeadingText}>Status:<Text style={{ color: 'green' }}> {item.status}</Text></Text>
            </View>
            <View style={portraitStyles.cartTextContainer}>
              <Text style={portraitStyles.orderHeadingText}>
                Price: <Text style={portraitStyles.cartText}>{item.price}</Text>
              </Text>
            </View>

          </View>
          <View>
            <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={35} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderLoader() {
    return (
      this.state.isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };

  render() {
    return (
      <>
        <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
          {this.state.users.length == false ? <LoadingComponent /> :
            <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover" >



              <View>

                <TouchableOpacity onPress={() => this.setState(this.state.isShowForm ? { isShowForm: false } : { isShowForm: true })} style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 20, paddingTop: 10, }} >
                  <View style={{ display: 'flex', marginTop: 10, flexDirection: 'row', borderRadius: 7, padding: 5, backgroundColor: '#B48D56', alignItems:'center'}} >
                    <MaterialCommunityIcons style={{ padding: 3 }} name="filter-menu-outline" size={18} color={'white'} />
                    <Text style={{ fontSize: 18, padding: 3, color:'white' }}  >Filter</Text>
                  </View>
                </TouchableOpacity>

                {renderIf(this.state.isShowForm)(<SafeAreaView style={portraitStyles.screenBackground}>
                  <View style={portraitStyles.filterFormInput}>
                    <TextInput style={portraitStyles.input} placeholder="Product Title" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ product: text , onChange:text})} />
                  </View>

                  <View style={{ padding: 10 }}>

                    <Dropdown
                      style={[styles.dropdown, this.state.isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={this.state.category}
                      search
                      itemTextStyle={{ color: 'black' }}
                      maxHeight={300}
                      labelField="name"
                      valueField="category_id"
                      placeholder={!this.state.isFocus ? 'Select category' : '...'}
                      searchPlaceholder="Search..."
                      // value={value}
                      onFocus={() => this.setState({ isfocus: true })}
                      onBlur={() => this.setState({ isfocus: false })}
                      onChange={item => {

                        this.setState({ cat_id: item.category_id })
                        this.setState({ isfocus: false });
                      }}
                      renderLeftIcon={() => (
                        <AntDesign
                          style={styles.icon}
                          color={this.state.isFocus ? 'blue' : 'black'}
                          name="Safety"
                          size={20}
                        />
                      )}
                    />



                  </View>

                  <RadioGroup
                    containerStyle={{display: 'flex', flexDirection: 'row'}}
                    radioButtons={this.state.radiobuttons}
                    onPress={(item) => item.map((data)=>(
                      data.selected == true? this.setState({order_by: data.value, onChange: data.value}): ""
                      
                    ))}

                  />


                  <TouchableOpacity onPress={() => this.searchProduct(false)} activeOpacity={0.9} style={portraitStyles.buttonContainer}>
                    <View style={portraitStyles.button} >
                      <Text style={portraitStyles.buttonText}>Search</Text>
                    </View>
                  </TouchableOpacity>
                </SafeAreaView>
                )}
                <FlatList
                  data={this.state.onChange ? this.state.result : this.state.users}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id + Math.random()}
                  ListFooterComponent={this.renderLoader()}
                  showsVerticalScrollIndicator={false}
                  onEndReached={() => {
                    console.log("on end reach") 
                  if(  this.state.diff >= 10){ this.state.product ? this.searchProduct(true) : this.getUsers()}}}
                  onEndReachedThreshold={0}
                  extraData={this.state.onChange}
                  refreshControl={<RefreshControl refreshing={false} onRefresh={() => { 
                    console.log("on refresh") 
                    if (this.state.diff >= 10) this.onRefresh()}} />}
                />
              </View>

            </ImageBackground >
          }
        </SafeAreaView >
      </>
    );
  };
}


const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: "#777",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "black"
  },
  placeholderStyle: {
    fontSize: 16,
    color: "black"
  },
  selectedTextStyle: {
    fontSize: 16,
    // backgroundColor:"red",
    color: "black"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "black"
  }
});


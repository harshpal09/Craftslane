import React, { Component, Fragment, useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, ImageBackground, TextInput, TouchableOpacity, RefreshControl, TouchableOpacityComponent, ActivityIndicator, useColorScheme, SafeAreaView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import ImageLazyLoading from "react-native-image-lazy-loading";
import DatePicker from 'react-native-date-picker';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import UiOrientation from '../UiOrientation';
import Icon from 'react-native-ionicons';
import FavouriteScreen from '../FavouriteScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Spinner from 'react-native-loading-spinner-overlay';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Spinner from 'react-native-loading-spinner-overlay';


import { Axios } from 'axios';
import axios from 'axios';
import UseNet from './UseNet';
import { portraitStyles } from '../../Style/globleCss';
import LoadingComponent from './LoadingComponent';
import renderIf from './renderIf';
// import * as Animatable from 'react-native-animatable';

// MyCustomComponent = Animatable.createAnimatableComponent(MyCustomComponent);


// const Tab = createBottomTabNavigator();


var items = [
  {
    id: 1,
    value: 'Anniversary',
  },
  {
    id: 2,
    value: 'Birthday',
  },
  {
    id: 3,
    value: 'Father’s Day',
  },
  {
    id: 4,
    value: 'Host & Hostess',
  },
  {
    id: 5,
    value: 'Monogram',
  },
  {
    id: 6,
    value: 'Housewarming',
  },
  {
    id: 7,
    value: 'Season’s Greetings',
  },
  {
    id: 8,
    value: 'Valentine’s Day',
  },
  {
    id: 9,
    value: 'Wedding',
  },


];


class HomeAccent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      traystyle: [],
      date: new Date(),
      open: false,
      border_color: 'lightgrey',
      flag: false,
      costumer_name: '',
      cnt: 100,
      subcnt: 99,
      value: '',
      arrayname: props,
      image: 'https://www.craftslane.com/image/cache/catalog/home-accents/DGRDE0716L_7/DGRDE0716L_7-1000x1000.png',
      price: 'Rs. 850.00 - 2850.00',
      name: '',
      size: '',
      showDesign: false,
      showPersonalization: false,
      isFocus: false,
      item: {},
      itemcnt: 1,
      isTraySelect: false,
      focused: false,
      o_plus_minus: '+',
      sp_plus_minus: '+',
      activity_indicator: true,
      product_option_value: [],
      style_in: {
        borderWidth: 1, borderRadius: 15, marginVertical: 4,
        marginHorizontal: 1, width: 147,
        height: 30, borderColor: '#EAD3B9', justifyContent: 'center',
        alignItems: 'center', backgroundColor: "#EAD3B9"
      },
      style: {
        borderWidth: 0.5, borderRadius: 15, marginVertical: 4,
        marginHorizontal: 1, width: 147,
        height: 30, borderColor: '#EAD3B9', justifyContent: 'center',
        alignItems: 'center',
      },
      size_style_in: {
        color: 'black',
        fontSize: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
        width: 95,
        height: 30,
        margin: 2,
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: '#EAD3B9',
        backgroundColor: '#EAD3B9'
      },
      size_style: {
        color: 'black',
        fontSize: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
        width: 95,
        height: 30,
        margin: 2,
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: '#EAD3B9',
      },
      selected_id: 0,
      size_id: 0,
      liked: false,
      isLoading: false,
      countries: [
        {

        }
      ],
      tray_styles: [
        { label: 'Rectangle Curved Handle', value: '1' },
        { label: 'Rectangle Straight Edge', value: '2' },
        { label: 'Rectangle Decorative Edge', value: '3' },
        { label: 'Square Straight Edge', value: '4' },
      ],
      tray_sizes: [
        { label: 'Extra small', value: '1' },
        { label: 'Small', value: '2' },
        { label: 'Large', value: '3' },
      ],
      occasion: [
        {
          id: 0,
          value: 'Anniversary',
        },
        {
          id: 1,
          value: 'Birthday',
        },
        {
          id: 2,
          value: 'Father’s Day',
        },
        {
          id: 3,
          value: 'Host & Hostess',
        },
        {
          id: 4,
          value: 'Monogram',
        },
        {
          id: 5,
          value: 'Housewarming',
        },
        {
          id: 6,
          value: 'Season’s Greetings',
        },
        {
          id: 7,
          value: 'Valentine’s Day',
        },
        {
          id: 8,
          value: 'Wedding',
        },
      ],



      select_color: [
        {
          id: 0,
          value: 'green',
        },
        {
          id: 1,
          value: 'red',
        },
        {
          id: 2,
          value: 'grey',
        },
      ],
      index: 0,
      items_image: [
        [
          {
            id: 0,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/DGRDE0716L_7/DGRDE0716L_7-200x200.png',
          },
          {
            id: 1,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/HHMRCH0002L_1/HHMRCH0002L_1-400x400.png',
          },
          {
            id: 2,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/HJCRSE0007L_4/HJCRSE0007L_4-400x400.png',
          },
          {
            id: 3,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/HLRSE0006AG_1/HLRSE0006AG_2-400x400.png',
          },

        ],
        [
          {
            id: 0,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/0991C3EBPR/0991C3EBPR_1-400x400.png',
          },
          {
            id: 1,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/0187C3EBPR/0187C3EBPR-400x400.png',
          },
          {
            id: 2,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/0963ISFBPD/0963ISFBPD_1-400x400.png',
          }
        ],
        [
          {
            id: 0,
            value: 'https://www.craftslane.com/image/cache/catalog/gifting/80022532/80022532-400x400.png',
          },
          {
            id: 1,
            value: 'https://www.craftslane.com/image/cache/catalog/gifting/80043621/80043621-400x400.png',
          },
          {
            id: 2,
            value: 'https://www.craftslane.com/image/cache/catalog/gifting/80007692/80007692-400x400.png',
          }
        ],
        [
          {
            id: 0,
            value: 'https://www.craftslane.com/image/cache/catalog/gifting/80022532/80022532-400x400.png',
          },
          {
            id: 1,
            value: 'https://www.craftslane.com/image/cache/catalog/gifting/80043621/80043621-400x400.png',
          },
          {
            id: 2,
            value: 'https://www.craftslane.com/image/cache/catalog/gifting/80007692/80007692-400x400.png',
          }
        ],
        [
          {
            id: 0,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/0991C3EBPR/0991C3EBPR_1-400x400.png',
          },
          {
            id: 1,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/0187C3EBPR/0187C3EBPR-400x400.png',
          },
          {
            id: 2,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/0963ISFBPD/0963ISFBPD_1-400x400.png',
          }
        ],

      ],
      design_image: [
        [
          {
            id: 0,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/anniversary/AN_1B-240x150.png',
          },
          {
            id: 1,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/anniversary/AN_3B-240x150.png',
          },
          {
            id: 2,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/anniversary/AN_4B-240x150.png',
          },
          {
            id: 3,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/anniversary/AN_5B-240x150.png',
          },
          {
            id: 4,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/anniversary/AN_3B-240x150.png',
          },
          {
            id: 5,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/anniversary/AN_3B-240x150.png',
          },

        ],
        [
          {
            id: 0,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/anniversary/AN_5B-240x150.png',
          },
          {
            id: 1,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/happy_birthday/HB_2B-240x150.png',
          },
          {
            id: 2,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/happy_birthday/HB_3B-240x150.png',
          },
          {
            id: 3,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/happy_birthday/HB_4B-240x150.png',
          }
        ],
        [
          {
            id: 0,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/fathers_day/FD_1B-240x150.png',
          },
          {
            id: 1,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/fathers_day/FD_2B-240x150.png',
          },
          {
            id: 2,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/fathers_day/FD_3B-240x150.png',
          },
          {
            id: 3,
            value: 'https://www.craftslane.com/image/cache/catalog/etching/big/fathers_day/FD_4B-240x150.png',
          }
        ],
        [
          {
            id: 0,
            value: 'https://www.craftslane.com/image/cache/catalog/gifting/80022532/80022532-400x400.png',
          },
          {
            id: 1,
            value: 'https://www.craftslane.com/image/cache/catalog/gifting/80043621/80043621-400x400.png',
          },
          {
            id: 2,
            value: 'https://www.craftslane.com/image/cache/catalog/gifting/80007692/80007692-400x400.png',
          }
        ],
        [
          {
            id: 0,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/0991C3EBPR/0991C3EBPR_1-400x400.png',
          },
          {
            id: 1,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/0187C3EBPR/0187C3EBPR-400x400.png',
          },
          {
            id: 2,
            value: 'https://www.craftslane.com/image/cache/catalog/home-accents/0963ISFBPD/0963ISFBPD_1-400x400.png',
          }
        ],

      ]
    };


  }

  async addToCart() {
    const data = {
      product_id: 100,
    }
    // console.warn(data);
    const resp = await axios({
      method: 'POST',
      url: 'https://staging.shivikaspottery.com/index.php?route=api/customcart/remove&key=U9XLFvnjCiOTIf3JIhPntVuhhAwpjczjuVvTpbs3cxNzUOq7ph9XCt3OfxuiUvCpFiNB8EHsvrfcfZ8uESKeJNazqaDosjVXz7DmJvksWp8yBIJMGFHX3agUTVByMS3IURBcYLMUyf8bNnIm4Xtu5vOKyPgVTDWXiS13IfdP4E3bMt79GXT1lnFXvYqkfvcv1PbGLlIJ6K4otiJ8O5rE7mW7KixetI2MHUHctmlpK6uCCLMIphE0mBndSWroyWEX&token=AVvNm9fK8WZRKoflqoMprjR8iNovWWGP',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: data

    });
    console.warn(resp);
  }
  isLoaded() {
    if (this.state.traystyle == []) {
      this.setState({ activity_indicator: true })
    }
    else {
      this.setState({ activity_indicator: false })
    }
  }

  isOPlus() {
    if (this.state.o_plus_minus == '+') {
      this.setState({ o_plus_minus: '-' })
    }
    else
      this.setState({ o_plus_minus: '+' })

  }
  isSpPlus() {
    if (this.state.sp_plus_minus == '+') {
      this.setState({ sp_plus_minus: '-' })
    }
    else
      this.setState({ sp_plus_minus: '+' })

  }
  accordianOverview() {
    if (this.state.o_plus_minus == '-') {
      return (
        <View style={portraitStyles.accordianContainer}>
          <Text style={portraitStyles.accordianParagraph}>Paisley Garden! Enjoy your coffee in these beautiful coffee mugs which blend together the timeless paisley design with the signature Noritake white porcelain and 24K gold lining, creating a look of elegant sophistication.</Text>
          <Text style={portraitStyles.accordianParagraph}>Noritake, now a valued international brand name, has its origins back in a little village near Nagoya in Japan, and has been bringing beauty and quality to dining tables around the world since 1904.</Text>
          <Text style={portraitStyles.accordianText}>:- Crafted out of fine, white porcelain</Text>
          <Text style={portraitStyles.accordianText}>:- Embellished with a 24K Gold trim</Text>
          <Text style={portraitStyles.accordianText}>:- Sold Individually</Text>
          <Text style={portraitStyles.accordianText}>:- 250 ml Capacity</Text>
          <Text style={portraitStyles.accordianText}>:- 3.5 inch Height</Text>
          <Text style={portraitStyles.accordianText}>:- Dishwasher safe</Text>
          <Text style={portraitStyles.accordianText}>:- Not Microwaveable</Text>
          <Text style={portraitStyles.accordianText}>:- Country of Origin: Sri Lanka</Text>
          <Text style={portraitStyles.accordianText}>:- Due to the differences in displays on tech devices, the colours of the product you receive may vary marginally from the colours seen on our website</Text>
          <Text style={portraitStyles.accordianText}>:- SKU: M574</Text>
        </View>
      )
    }

  }
  accordianShippingPolicy() {
    if (this.state.sp_plus_minus == '-') {
      return (
        <View style={portraitStyles.accordianContainer}>
          <Text style={portraitStyles.accordianParagraph}>Paisley Garden! Enjoy your coffee in these beautiful coffee mugs which blend together the timeless paisley design with the signature Noritake white porcelain and 24K gold lining, creating a look of elegant sophistication.</Text>
          <Text style={portraitStyles.accordianParagraph}>Noritake, now a valued international brand name, has its origins back in a little village near Nagoya in Japan, and has been bringing beauty and quality to dining tables around the world since 1904.</Text>
          <Text style={portraitStyles.accordianText}>:- Crafted out of fine, white porcelain</Text>
          <Text style={portraitStyles.accordianText}>:- Embellished with a 24K Gold trim</Text>
          <Text style={portraitStyles.accordianText}>:- Sold Individually</Text>
          <Text style={portraitStyles.accordianText}>:- 250 ml Capacity</Text>
          <Text style={portraitStyles.accordianText}>:- 3.5 inch Height</Text>
          <Text style={portraitStyles.accordianText}>:- Dishwasher safe</Text>
          <Text style={portraitStyles.accordianText}>:- Not Microwaveable</Text>
          <Text style={portraitStyles.accordianText}>:- Country of Origin: Sri Lanka</Text>
          <Text style={portraitStyles.accordianText}>:- Due to the differences in displays on tech devices, the colours of the product you receive may vary marginally from the colours seen on our website</Text>
          <Text style={portraitStyles.accordianText}>:- SKU: M574</Text>
        </View>
      )
    }

  }



  isFocusedHeart() {
    if (this.state.focused) {
      this.setState({ focused: false })
    }
    else
      this.setState({ focused: true })

  }

  incFunction() {
    this.setState({ itemcnt: this.state.itemcnt + 1 })
  }
  decFunction() {
    if (this.state.itemcnt > 1)
      this.setState({ itemcnt: this.state.itemcnt - 1 })
  }


  functionName(props, props1, arrname3) {
    this.setState({ cnt: props });
    this.setState({ value: props1 });
    this.setState({ selected_id: props });

  }
  functionName2(p, img, rs, size) {
    this.setState({ subcnt: p });
    this.setState({ image: img });
    this.setState({ price: rs });
    this.setState({ size: size });
    this.setState({ size_id: p });


  }

  function1() {
    if (this.state.cnt == 1) {
      return (
        this.state.traystyle.map((data, i) => (
          <View key={i}>
            {data.traystyle.map((item, j) => (
              <View style={portraitStyles.trayStyleChildContainer} key={j}>
                {item.rectangle_curved_handle.map((val, k) => (
                  <View style={portraitStyles.trayStyleChild} key={k}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.functionName2(val.id_1, val.image_1, val.price_1, val.size_1)}>
                      <View>
                        <Text style={this.state.size_id == 1 ? this.state.size_style_in : this.state.size_style}>{val.title_1}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.functionName2(val.id_2, val.image_2, val.price_2, val.size_2)}>
                      <View>
                        <Text style={this.state.size_id == 2 ? this.state.size_style_in : this.state.size_style}>{val.title_2}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.functionName2(val.id_3, val.image_3, val.price_3, val.size_3)}>
                      <View>
                        <Text style={this.state.size_id == 3 ? this.state.size_style_in : this.state.size_style}   >{val.title_3}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))
      )
    }
    else if (this.state.cnt == 2) {
      return (
        this.state.traystyle.map((data, i) => (
          <View key={i}>
            {data.traystyle.map((item, j) => (
              <View style={portraitStyles.trayStyleChildContainer} key={j}>
                {item.rectangle_straight_edge.map((val, k) => (
                  <View style={portraitStyles.trayStyleChild} key={k}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.functionName2(val.id_1, val.image_1, val.price_1, val.size_1)}>
                      <View>
                        <Text style={this.state.size_id == 1 ? this.state.size_style_in : this.state.size_style}   >{val.title_1}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.functionName2(val.id_2, val.image_2, val.price_2, val.size_2)}>
                      <View>
                        <Text style={this.state.size_id == 2 ? this.state.size_style_in : this.state.size_style}   >{val.title_2}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.functionName2(val.id_3, val.image_3, val.price_3, val.size_3)}>
                      <View>
                        <Text style={this.state.size_id == 3 ? this.state.size_style_in : this.state.size_style}   >{val.title_3}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))
      )
    }
    else if (this.state.cnt == 3) {
      return (
        this.state.traystyle.map((data, i) => (
          <View key={i}>
            {data.traystyle.map((item, j) => (
              <View style={portraitStyles.trayStyleChildContainer} key={j}>
                {item.rectangle_decorative_edge.map((val, k) => (
                  <View style={portraitStyles.trayStyleChild} key={k}>
                    <TouchableOpacity onPress={() => this.functionName2(val.id_1, val.image_1, val.price_1, val.size_1)}>
                      <View>
                        <Text style={this.state.size_id == 1 ? this.state.size_style_in : this.state.size_style}   >{val.title_1}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.functionName2(val.id_2, val.image_2, val.price_2, val.size_2)}>
                      <View>
                        <Text style={this.state.size_id == 2 ? this.state.size_style_in : this.state.size_style}   >{val.title_2}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.functionName2(val.id_3, val.image_3, val.price_3, val.size_3)}>
                      <View>
                        <Text style={this.state.size_id == 3 ? this.state.size_style_in : this.state.size_style}   >{val.title_3}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))
      )
    }
    else if (this.state.cnt == 4) {
      return (
        this.state.traystyle.map((data, i) => (
          <View key={i}>
            {data.traystyle.map((item, j) => (
              <View style={portraitStyles.trayStyleChildContainer} key={j}>
                {item.square_straight_edge.map((val, k) => (
                  <View style={portraitStyles.trayStyleChild} key={k}>
                    <TouchableOpacity onPress={() => this.functionName2(val.id_1, val.image_1, val.price_1, val.size_1)}>
                      <View>
                        <Text style={this.state.size_id == 1 ? this.state.size_style_in : this.state.size_style}   >{val.title_1}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.functionName2(val.id_2, val.image_2, val.price_2, val.size_2)}>
                      <View>
                        <Text style={this.state.size_id == 2 ? this.state.size_style_in : this.state.size_style}   >{val.title_2}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.functionName2(val.id_3, val.image_3, val.price_3, val.size_3)}>
                      <View>
                        <Text style={this.state.size_id == 3 ? this.state.size_style_in : this.state.size_style}   >{val.title_3}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))
      )
    }
  }

  function2() {
    if (1 == this.state.subcnt) {
      return (
        <Text>this is Ractangle curved handle</Text>
      )
    }
    else if (2 == this.state.subcnt) {
      return (
        <Text>this is Ractangle straight edge</Text>
      )
    }
  }
  imageCalling(id) {
    // console.warn(id);
    this.setState({ image: this.state.items_image[this.state.index][id - 1].value })
  }

  selected() {
    this.state = {
      select: "",
    }
    this.setState({ select: "" })
  }
  isLiked(flag) {
    flag ? this.setState({ liked: false }) : this.setState({ liked: true });
  }
  onRefresh() {
    this.getData();
  }
  onLoadMore() {
    this.setState({ isLoading: true });
    this.getData();
  }
  componentDidMount() {
    this.getData()
  }
  async getData() {

    let parsed = {}
    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);
    }
    catch (error) {
      Alert.alert(error)
    }
    const { image, name, config_type, id } = this.props.route.params;
    this.setState({ name: name })
    await axios.get(parsed.url + "customproductprofile/index&key=" + parsed.key + "&token=" + parsed.token + "&product_id=" + id)
      .then((resp) => this.setState({ item: resp.data, image: resp.data.data.big_image, price: resp.data.data.price, product_option_value: resp.data.data.options.length > 0 ? resp.data.data.options[0].product_option_value : []}))
  }


  render() {
    // console.log(this.state.product_option_value);
    return (
      <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
        {console.log(this.state.item.success)}
        {this.state.item.success == undefined ? <LoadingComponent /> :
          <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover"  >
            <ScrollView style={portraitStyles.container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>


              <View style={portraitStyles.homeAccentContainer}>
                <View style={portraitStyles.productProfileContainer} >
                  <TouchableOpacity>
                    <View style={portraitStyles.homeAccentImageContainer}>
                      <ImageLazyLoading style={portraitStyles.homeAccentImage} source={{ uri: this.state.image }} />
                    </View>
                  </TouchableOpacity>
                  {renderIf(false)(
                    <ScrollView horizontal={true}>
                      {
                        this.state.select_color.map((data, i) => (
                          <TouchableOpacity key={i} style={{ width: 50, height: 50, margin: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: data.value }} onPress={() => this.setState({ image: this.state.items_image[data.id][0].value, index: data.id })} >
                            <Text style={{ color: 'white', fontWeight: '500', textAlign: 'center', textAlignVertical: 'center' }}>{data.value}</Text>
                          </TouchableOpacity>
                        ))
                      }
                    </ScrollView>
                  )}
                  {renderIf(false)(
                    <ScrollView horizontal={true} style={{ width: "80%" }}>
                      {this.state.items_image[this.state.index].map((data, i) => (
                        <TouchableOpacity onPress={() => this.setState({ image: this.state.items_image[this.state.index][data.id].value })} key={i}>
                          <Image style={{ height: 100, width: 100, margin: 10 }} source={{ uri: data.value }}></Image>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                  <View style={portraitStyles.homeAccentTextContainer}>
                    <Text style={portraitStyles.homeAccentText}>{this.state.name}</Text>
                    <Text style={portraitStyles.productProfilePrice} >{this.state.price}</Text>
                    {/* <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'red'}}>
                      <Image style={{width:100,height:100,backgroundColor:'green'}} source={require('../../assets/images/gift.svg')} />
                      <Text >Gift Wrapped</Text>
                    </View> */}
                  </View>
                </View>
                {renderIf(false)(
                  <View style={{ padding: 10 }}>
                    <Dropdown
                      style={[styles.dropdown, this.state.isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={this.state.tray_styles}
                      // search
                      itemTextStyle={{ color: 'black' }}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"

                      // itemContainerStyle={{backgroundColor:'grey'}}
                      placeholder={!this.state.isFocus ? 'Select Tray Styles' : '...'}
                      searchPlaceholder="Search..."
                      // value={value}
                      onFocus={() => this.setState({ isfocus: true })}
                      onBlur={() => this.setState({ isfocus: false })}
                      onChange={item => {
                        console.log(item)
                        this.setState({ isfocus: false, isTraySelect: true });
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
                )}
                {renderIf(this.state.isTraySelect)(
                  <View style={{ padding: 10 }}>
                    <Dropdown
                      style={[styles.dropdown, this.state.isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={this.state.tray_sizes}
                      // search
                      itemTextStyle={{ color: 'black' }}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"

                      // itemContainerStyle={{backgroundColor:'grey'}}
                      placeholder={!this.state.isFocus ? 'Select a Size' : '...'}
                      searchPlaceholder="Search..."
                      // value={value}
                      onFocus={() => this.setState({ isfocus: true })}
                      onBlur={() => this.setState({ isfocus: false })}
                      onChange={item => {
                        console.log(item)
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
                )}
                {renderIf(this.state.product_option_value.length)(
                  <View style={portraitStyles.trayStyleContainer}>
                    <Text style={portraitStyles.headerTrayStyle}>Select a Color</Text>
                    <View style={portraitStyles.trayStyleChild}>
                      {this.state.product_option_value.map((data,i)=>(
                      <Image style={{ height: 20, width: 20, borderRadius: 10, margin: 20 }} source={{uri: data.image}} />
                      ))}
                    </View>
                  </View>
                )}
                {renderIf(false)(
                  <View style={{ padding: 10 }}>
                    <Text style={{ color: 'black', padding: 10, fontSize: 16 }}>How would you like us to Personalize it for you?</Text>
                    <Dropdown
                      style={[styles.dropdown, this.state.isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={this.state.occasion}
                      // search
                      itemTextStyle={{ color: 'black' }}
                      maxHeight={300}
                      labelField="value"
                      valueField="id"

                      // itemContainerStyle={{backgroundColor:'grey'}}
                      placeholder={!this.state.isFocus ? 'Select an Occasion' : '...'}
                      searchPlaceholder="Search..."
                      // value={value}
                      onFocus={() => this.setState({ isfocus: true })}
                      onBlur={() => this.setState({ isfocus: false })}
                      onChange={item => {
                        this.setState({ index: item.id, showDesign: true });
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
                )}
                {renderIf(this.state.showDesign)(
                  <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', padding: 10, display: 'flex', flexDirection: 'row' }}>
                    <View>
                      <MaterialIcons name='navigate-before' color={'#6D6D6D'} size={35} />
                    </View>
                    <ScrollView horizontal={true} style={{ width: "80%" }} >
                      {this.state.design_image[this.state.index].map((data, i) => (
                        <TouchableOpacity style={{ height: 110, width: 110, borderWidth: 1, justifyContent: "center", alignItems: 'center', borderColor: this.state.image == data.value ? "black" : "lightgrey", margin: 5 }} onPress={() => this.setState({ image: this.state.design_image[this.state.index][data.id].value, showPersonalization: true, border_color: 'black' })} key={i}>
                          <Image style={{ height: 100, width: 100, }} source={{ uri: data.value }}></Image>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <View>
                      <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={35} />
                    </View>
                  </View>
                )}
                {renderIf(this.state.showPersonalization)(
                  <View style={portraitStyles.trayStyleContainer}>
                    <Text style={portraitStyles.headerTrayStyle}>Add Your Personalization</Text>
                    <View style={portraitStyles.trayStyleChild}>
                      <View style={portraitStyles.containLabelAndInput}>
                        <TextInput style={portraitStyles.input} placeholder="Name" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ costumer_name: text })} />
                      </View>
                      <View style={portraitStyles.containLabelAndInput}>
                        <TextInput showSoftInputOnFocus={false} onPressIn={() => this.setState({ open: true })} style={portraitStyles.input} placeholder="Date of Birth" placeholderTextColor={'grey'} defaultValue={this.state.flag ? JSON.stringify(this.state.date).substring(1, 11) : ""} onChangeText={(date) => this.setState({ date: date })} />
                        <DatePicker
                          modal
                          open={this.state.open}
                          date={this.state.date}
                          androidVariant={'iosClone'}
                          onConfirm={(date) => {
                            this.setState({ open: false })
                            this.setState({ date: date })
                            this.setState({ flag: true })
                          }}
                          fadeToColor={'none'}
                          mode='date'
                          onCancel={() => {
                            this.setState({ open: false })
                          }}
                        />
                      </View>
                    </View>
                  </View>
                )}


                {/* <Spinner visible={true} overlayColor='rgba(0, 0, 0, 0.25)' color='#6d6d6d' size='large'  /> */}

                {/* {this.state.traystyle.map((data, i) => (
                <View style={portraitStyles.trayStyleContainer} key={i}>
                  <Text style={portraitStyles.headerTrayStyle}>Select tray style: {this.state.value}</Text>
                  {data.traystyle.map((item, j) => (
                    <View style={portraitStyles.trayStyleChildContainer} key={j}>
                      <View style={portraitStyles.trayStyleChild} >
                        <TouchableOpacity style={this.state.selected_id == 1 ? this.state.style_in : this.state.style} onPress={() => this.functionName(item.id_1, item.title_1, item.arrayname_1)}>
                          <Text style={portraitStyles.trayStyleChildText} >{item.title_1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.selected_id == 2 ? this.state.style_in : this.state.style} onPress={() => this.functionName(item.id_2, item.title_2, item.arrayname_2)}>
                          <Text style={portraitStyles.trayStyleChildText}>{item.title_2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.selected_id == 3 ? this.state.style_in : this.state.style} onPress={() => this.functionName(item.id_3, item.title_3, item.arrayname_3)}>
                          <Text style={portraitStyles.trayStyleChildText} >{item.title_3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.selected_id == 4 ? this.state.style_in : this.state.style} onPress={() => this.functionName(item.id_4, item.title_4, item.arrayname_4)}>
                          <Text style={portraitStyles.trayStyleChildText} >{item.title_4}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                  <Text style={portraitStyles.headerTrayStyle}>Select a Size: {this.state.size}</Text>
                  {this.function1()}
                </View>
              ))} */}
              </View>
              {/* <View style={portraitStyles.selectContainer}>
                <Text style={portraitStyles.selectListHeader}>How would you like us to Personalize it for you?</Text>
                <SelectList data={items} setSelected={() => this.props.selected} style={portraitStyles.selectList} />
              </View> */}
              {/* <View style={portraitStyles.quantityAndIncDecContainer}>
                <Text style={portraitStyles.quantityText}>Quantity:</Text>
                <View style={portraitStyles.incDecContainer}>
                  <Pressable style={portraitStyles.decPress} onPress={() => this.decFunction()}><Text style={portraitStyles.decButton}>-</Text></Pressable>
                  <Text style={portraitStyles.incDecArea} >{this.state.itemcnt}</Text>
                  <Pressable style={portraitStyles.incPress} onPress={() => this.incFunction()}><Text style={portraitStyles.incButton}>+</Text></Pressable>
                </View>
              </View> */}
              <View style={portraitStyles.incDecButtonContainerProfile}>
                <Text style={portraitStyles.quantityText}>Quantity:</Text>
                <View style={portraitStyles.cartIncDecContainer}>
                  <TouchableOpacity activeOpacity={0.9} style={portraitStyles.decBtn} onPress={() => this.decFunction()}><Text style={portraitStyles.decButton}>-</Text></TouchableOpacity>
                  <Text style={portraitStyles.incDecField} >{this.state.itemcnt}</Text>
                  <TouchableOpacity activeOpacity={0.9} style={portraitStyles.incBtn} onPress={() => this.incFunction()}><Text style={portraitStyles.incButton}>+</Text></TouchableOpacity>
                </View>
              </View>
              <View style={portraitStyles.cartButtonContainer}>
                <Pressable style={portraitStyles.cartbutton} onPress={() => this.addToCart()}>
                  <Text style={portraitStyles.buttonText}>Add to Basket</Text>
                </Pressable>
                <Pressable onPress={() => this.isLiked(this.state.liked)}>
                  <MaterialCommunityIcons
                    name={this.state.liked ? "heart" : "heart-outline"}
                    size={32}
                    color={this.state.liked ? "red" : "black"}
                  />
                </Pressable>
                <Pressable >
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={32}
                    color="black"
                  />
                </Pressable>
              </View>
              <View style={portraitStyles.overViewAndShippingPolicyContainer}>
                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.overViewContainer} onPress={() => this.isOPlus()}>
                  <Text style={portraitStyles.overViewText}>Overview</Text>
                  <Text style={portraitStyles.pText}>{this.state.o_plus_minus}</Text>
                </TouchableOpacity>
                {this.accordianOverview()}
                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.shippingPolicyContainer} onPress={() => this.isSpPlus()}>
                  <Text style={portraitStyles.overViewText}>Shipping Policy</Text>
                  <Text style={portraitStyles.pText}>{this.state.sp_plus_minus}</Text>
                </TouchableOpacity>
                {this.accordianShippingPolicy()}
              </View>
              <View style={portraitStyles.noteContainer}>

                <Text style={portraitStyles.noteText}>
                  Note: {this.state.item.data.additional_line}
                </Text>
              </View>
              {/* </View> */}
            </ScrollView>
          </ImageBackground>
        }
      </SafeAreaView>
    );
  }
}



export default HomeAccent;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
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
  },
});
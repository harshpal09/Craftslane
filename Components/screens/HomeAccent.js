import React, { Component, Fragment, useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TextInput, ViewComponent, TouchableOpacity,ImageBackground ,TouchableOpacityComponent, ActivityIndicator, useColorScheme, SafeAreaView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import UiOrientation from '../UiOrientation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';
import { portraitStyles } from '../../Style/globleCss';


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


class HomeAccent extends UiOrientation {

  constructor(props) {
    super(props);
    this.state = {
      traystyle: [],
      cnt: 100,
      subcnt: 99,
      value: '',
      arrayname: props,
      image: 'https://www.craftslane.com/image/cache/catalog/home-accents/DGRDE0716L_7/DGRDE0716L_7-1000x1000.png',
      price: 'Rs. 850.00 - 2850.00',
      name: 's. 850.00 - 2850.00',
      size: '',
      item: [],
      itemcnt: 1,
      focused: false,
      o_plus_minus: '+',
      sp_plus_minus: '+',
      activity_indicator: true,
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
      select_color:[
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
      index:0,
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
        ]

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
    // console.warn(resp);
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
        <View style={this.getStyle().accordianContainer}>
          <Text style={this.getStyle().accordianParagraph}>Paisley Garden! Enjoy your coffee in these beautiful coffee mugs which blend together the timeless paisley design with the signature Noritake white porcelain and 24K gold lining, creating a look of elegant sophistication.</Text>
          <Text style={this.getStyle().accordianParagraph}>Noritake, now a valued international brand name, has its origins back in a little village near Nagoya in Japan, and has been bringing beauty and quality to dining tables around the world since 1904.</Text>
          <Text style={this.getStyle().accordianText}>:- Crafted out of fine, white porcelain</Text>
          <Text style={this.getStyle().accordianText}>:- Embellished with a 24K Gold trim</Text>
          <Text style={this.getStyle().accordianText}>:- Sold Individually</Text>
          <Text style={this.getStyle().accordianText}>:- 250 ml Capacity</Text>
          <Text style={this.getStyle().accordianText}>:- 3.5 inch Height</Text>
          <Text style={this.getStyle().accordianText}>:- Dishwasher safe</Text>
          <Text style={this.getStyle().accordianText}>:- Not Microwaveable</Text>
          <Text style={this.getStyle().accordianText}>:- Country of Origin: Sri Lanka</Text>
          <Text style={this.getStyle().accordianText}>:- Due to the differences in displays on tech devices, the colours of the product you receive may vary marginally from the colours seen on our website</Text>
          <Text style={this.getStyle().accordianText}>:- SKU: M574</Text>
        </View>
      )
    }

  }
  accordianShippingPolicy() {
    if (this.state.sp_plus_minus == '-') {
      return (
        <View style={this.getStyle().accordianContainer}>
          <Text style={this.getStyle().accordianParagraph}>Paisley Garden! Enjoy your coffee in these beautiful coffee mugs which blend together the timeless paisley design with the signature Noritake white porcelain and 24K gold lining, creating a look of elegant sophistication.</Text>
          <Text style={this.getStyle().accordianParagraph}>Noritake, now a valued international brand name, has its origins back in a little village near Nagoya in Japan, and has been bringing beauty and quality to dining tables around the world since 1904.</Text>
          <Text style={this.getStyle().accordianText}>:- Crafted out of fine, white porcelain</Text>
          <Text style={this.getStyle().accordianText}>:- Embellished with a 24K Gold trim</Text>
          <Text style={this.getStyle().accordianText}>:- Sold Individually</Text>
          <Text style={this.getStyle().accordianText}>:- 250 ml Capacity</Text>
          <Text style={this.getStyle().accordianText}>:- 3.5 inch Height</Text>
          <Text style={this.getStyle().accordianText}>:- Dishwasher safe</Text>
          <Text style={this.getStyle().accordianText}>:- Not Microwaveable</Text>
          <Text style={this.getStyle().accordianText}>:- Country of Origin: Sri Lanka</Text>
          <Text style={this.getStyle().accordianText}>:- Due to the differences in displays on tech devices, the colours of the product you receive may vary marginally from the colours seen on our website</Text>
          <Text style={this.getStyle().accordianText}>:- SKU: M574</Text>
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
              <View style={this.getStyle().trayStyleChildContainer} key={j}>
                {item.rectangle_curved_handle.map((val, k) => (
                  <View style={this.getStyle().trayStyleChild} key={k}>
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
              <View style={this.getStyle().trayStyleChildContainer} key={j}>
                {item.rectangle_straight_edge.map((val, k) => (
                  <View style={this.getStyle().trayStyleChild} key={k}>
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
              <View style={this.getStyle().trayStyleChildContainer} key={j}>
                {item.rectangle_decorative_edge.map((val, k) => (
                  <View style={this.getStyle().trayStyleChild} key={k}>
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
              <View style={this.getStyle().trayStyleChildContainer} key={j}>
                {item.square_straight_edge.map((val, k) => (
                  <View style={this.getStyle().trayStyleChild} key={k}>
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


  render() {
    // console.warn(this.state.traystyle);
    // console.log(this.state.index,this.state.image)
    return (
      <SafeAreaView style={this.getStyle().screenBackgroundStackTab}>

        {this.state.traystyle.length == false ? <View style={this.getStyle().loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={this.getStyle().cartImage} /></View> :
        <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" onLayout={this.onLayout.bind(this)} >
          <ScrollView style={this.getStyle().profileContainer} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>


            <View style={this.getStyle().homeAccentContainer}>
              {this.state.traystyle.map((data, idx) => (
                <View key={idx}>
                  {data.traystyle.map((item, idx) => (
                    <View key={idx}>
                      {item.coffemugs.map((val, i) => (
                        <View key={i}>
                          {val.small.map((small, ind) => (
                            <View style={this.getStyle().productProfileContainer} key={ind}>
                              <TouchableOpacity>
                                <View style={this.getStyle().homeAccentImageContainer}>
                                  <Image style={this.getStyle().homeAccentImage} source={{ uri: this.state.image }} />
                                </View>
                              </TouchableOpacity>
                              <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false}>
                                {
                                  this.state.select_color.map((data,i)=>(
                                    <TouchableOpacity key={i} style={{width:50,height:50,margin:20,justifyContent:'center',alignItems:'center',borderRadius:50,backgroundColor:data.value}} onPress={()=> this.setState({ image: this.state.items_image[data.id][0].value,index: data.id})} >
                                      <Text style={{color:'white',fontWeight:'500',textAlign:'center',textAlignVertical:'center'}}>{data.value}</Text>
                                    </TouchableOpacity>
                                  ))
                                }
                              </ScrollView>
                              <ScrollView horizontal={true} style={{ width: "100%" }}  showsHorizontalScrollIndicator={false}>
                                {this.state.items_image[this.state.index].map((data, i) => (
                                  <TouchableOpacity onPress={() => this.setState({image: this.state.items_image[this.state.index][data.id].value })} key={i}>
                                    <Image style={{ height: 100, width: 100, margin: 10 }} source={{ uri: data.value }}></Image>
                                  </TouchableOpacity>
                                ))}
                              </ScrollView>
                              <View style={this.getStyle().homeAccentTextContainer}>
                                <Text style={this.getStyle().homeAccentText} onPress={() => this.props.navigation.navigate('')}>{small.title}</Text>
                                <Text style={this.getStyle().productProfilePrice} >{this.state.price}</Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              ))}

              {this.state.traystyle.map((data, i) => (
                <View style={this.getStyle().trayStyleContainer} key={i}>
                  <Text style={this.getStyle().headerTrayStyle}>Select tray style: {this.state.value}</Text>
                  {data.traystyle.map((item, j) => (
                    <View style={this.getStyle().trayStyleChildContainer} key={j}>
                      <View style={this.getStyle().trayStyleChild} >
                        <TouchableOpacity style={this.state.selected_id == 1 ? this.state.style_in : this.state.style} onPress={() => this.functionName(item.id_1, item.title_1, item.arrayname_1)}>
                          <Text style={this.getStyle().trayStyleChildText} >{item.title_1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.selected_id == 2 ? this.state.style_in : this.state.style} onPress={() => this.functionName(item.id_2, item.title_2, item.arrayname_2)}>
                          <Text style={this.getStyle().trayStyleChildText}>{item.title_2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.selected_id == 3 ? this.state.style_in : this.state.style} onPress={() => this.functionName(item.id_3, item.title_3, item.arrayname_3)}>
                          <Text style={this.getStyle().trayStyleChildText} >{item.title_3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.selected_id == 4 ? this.state.style_in : this.state.style} onPress={() => this.functionName(item.id_4, item.title_4, item.arrayname_4)}>
                          <Text style={this.getStyle().trayStyleChildText} >{item.title_4}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                  <Text style={this.getStyle().headerTrayStyle}>Select a Size: {this.state.size}</Text>
                  {this.function1()}
                </View>
              ))}
            </View>
            {/* <View style={this.getStyle().selectContainer}>
                <Text style={this.getStyle().selectListHeader}>How would you like us to Personalize it for you?</Text>
                <SelectList data={items} setSelected={() => this.props.selected} style={this.getStyle().selectList} />
              </View> */}
            {/* <View style={this.getStyle().quantityAndIncDecContainer}>
                <Text style={this.getStyle().quantityText}>Quantity:</Text>
                <View style={this.getStyle().incDecContainer}>
                  <Pressable style={this.getStyle().decPress} onPress={() => this.decFunction()}><Text style={this.getStyle().decButton}>-</Text></Pressable>
                  <Text style={this.getStyle().incDecArea} >{this.state.itemcnt}</Text>
                  <Pressable style={this.getStyle().incPress} onPress={() => this.incFunction()}><Text style={this.getStyle().incButton}>+</Text></Pressable>
                </View>
              </View> */}
            <View style={portraitStyles.incDecButtonContainerProfile}>
              <Text style={this.getStyle().quantityText}>Quantity:</Text>
              <View style={portraitStyles.cartIncDecContainer}>
                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.decBtn} onPress={() => this.decFunction()}><Text style={portraitStyles.decButton}>-</Text></TouchableOpacity>
                <Text style={portraitStyles.incDecField} >{this.state.itemcnt}</Text>
                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.incBtn} onPress={() => this.incFunction()}><Text style={portraitStyles.incButton}>+</Text></TouchableOpacity>
              </View>
            </View>
            <View style={this.getStyle().cartButtonContainer}>
              <Pressable style={this.getStyle().cartbutton} onPress={() => this.addToCart()}>
                <Text style={this.getStyle().buttonText}>Add to Basket</Text>
              </Pressable>
              <Pressable style={{padding:5}} onPress={() => this.isLiked(this.state.liked)}>
                <MaterialCommunityIcons
                  name={this.state.liked ? "heart" : "heart-outline"}
                  size={32}
                  color={this.state.liked ? "red" : "black"}
                />
              </Pressable>
              <Pressable style={{padding:5}} >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={32}
                  color="black"
                />
              </Pressable>
            </View>
            <View style={this.getStyle().overViewAndShippingPolicyContainer}>
              <TouchableOpacity activeOpacity={0.9} style={this.getStyle().overViewContainer} onPress={() => this.isOPlus()}>
                <Text style={this.getStyle().overViewText}>Overview</Text>
                <Text style={this.getStyle().pText}>{this.state.o_plus_minus}</Text>
              </TouchableOpacity>
              {this.accordianOverview()}
              <TouchableOpacity activeOpacity={0.9} style={this.getStyle().shippingPolicyContainer} onPress={() => this.isSpPlus()}>
                <Text style={this.getStyle().overViewText}>Shipping Policy</Text>
                <Text style={this.getStyle().pText}>{this.state.sp_plus_minus}</Text>
              </TouchableOpacity>
              {this.accordianShippingPolicy()}
            </View>
            <View style={this.getStyle().noteContainer}>

              <Text style={this.getStyle().noteText}>
                Note: If you are shipping this to an address other than your own, and would like to send a message to your friends or loved ones, then please enter your personalized message at the point of checkout.
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

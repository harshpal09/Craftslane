// import React, { Component, Fragment, useState, useEffect } from 'react';
// import { View, StyleSheet, Text, ScrollView, Image, ImageBackground, TextInput, TouchableOpacity, RefreshControl, TouchableOpacityComponent, ActivityIndicator, useColorScheme, SafeAreaView } from 'react-native';
// import { SelectList } from 'react-native-dropdown-select-list';
// import ImageLazyLoading from "react-native-image-lazy-loading";
// import DatePicker from 'react-native-date-picker';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
// import UiOrientation from '../UiOrientation';
// import Icon from 'react-native-ionicons';
// import FavouriteScreen from '../FavouriteScreen';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Axios } from 'axios';
// import axios from 'axios';
// import UseNet from './UseNet';
// import { portraitStyles } from '../../Style/globleCss';
// import LoadingComponent from './LoadingComponent';
// import renderIf from './renderIf';





// class HomeAccent extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       options: [],
//       product_id: '',
//       date: new Date(),
//       body: {},
//       open: false,
//       border_color: 'lightgrey',
//       flag: false,
//       costumer_name: '',
//       sets_view_type_5: [],
//       sku: "",
//       image: '',
//       price: 'Rs. 850.00 - 2850.00',
//       size: '',
//       showDesign: false,
//       showPersonalization: false,
//       item: {},
//       itemcnt: 1,
//       is_Select: false,
//       sp_plus_minus: '+',
//       is_Select_color: false,
//       product_option_value: [],
//       product_option_value_2: [],
//       product_option_value_3: [],
//       liked: false,
//       ShowDescription: false,
//       plus_minus: "+",
//       tray_sizes: [],
//       cat_id: 0,
//       design_image: []
//     };


//   }

//   addToCart = async (id) => {


//     let parsed = {}
//     try {
//       let user = await AsyncStorage.getItem('user');
//       parsed = JSON.parse(user);

//     }
//     catch (error) {
//       Alert.alert(error)
//     }

//     const d = {
//       product_id: id,
//     }

//     const header = {
//       headers: { 'content-type': 'application/x-www-form-urlencoded' }
//     }
//     await axios.post(parsed.url + "customcart/add&key=" + parsed.key + "&token=" + parsed.token + '&os_type=android', d, header)
//       .then((response) => {
//         console.log(response.data)
//       })
//       .catch((error) => {
//         console.warn(error);
//       })


//     this.props.navigation.navigate('Cart')
//   }

//   componentDidMount() {
//     this.getData()
//   }
//   async getData() {
//     // console.log("get data=>", this.state.body)
//     let parsed = {}
//     try {
//       let user = await AsyncStorage.getItem('user');
//       parsed = JSON.parse(user);
//     }
//     catch (error) {
//       Alert.alert(error)
//     }
//     const { cat, id } = this.props.route.params;
//     let b = cat.substring(1, 3);
//     this.setState({ cat_id: parseInt(b), product_id: id })
//     console.log("product_id=> ", id);
//     await axios.get(parsed.url + "customproductprofile/index&key=" + parsed.key + "&token=" + parsed.token + "&product_id=" + id)
//       .then((resp) => this.setState({ item: resp.data, body: resp.data.body, sku: resp.data.body.sku, image: resp.data.body.thumb, price: resp.data.body.price, product_option_value: resp.data.body.options.length > 0 ? resp.data.body.options[0].product_option_value : [], name: resp.data.body.heading_title, items_image: resp.data.body.images, product_option_value_2: resp.data.body.options.length > 1 ? resp.data.body.options[1].product_option_value : [], product_option_value_3: resp.data.body.options.length > 2 ? resp.data.body.options[2].product_option_value : [], options: resp.data.body.options }))

//     if (this.state.body.view_type == 1) {
//       this.setState({ product_option_value: this.getImageObject(this.state.product_option_value) })
//     }
//     else if (this.state.body.view_type == 2) {
//       if (this.state.options.length == 1) {
//         this.setState({ product_option_value: this.getImageObject(this.state.options[0].product_option_value) })
//       }
//       else if (this.state.options.length == 2) {
//         // console.log("set")
//         this.setState({ product_option_value: this.getImageObject(this.state.options[0].product_option_value) })
//         // console.log("product_option_value=> ",this.state.product_option_value);
//       }
//     }
//     else if (this.state.body.view_type == 3) {
//       this.setState({ product_option_value_2: this.getImageObject(this.state.options[1].product_option_value) })
//     }
//     else if (this.state.body.view_type == 5) {
//       if (this.state.options.length >= 3) {
//         this.setState({ product_option_value: this.state.item.body.options[2].product_option_value })
//         this.setState({ product_option_value_2: this.state.item.body.options[0].product_option_value })
//       }
//     }
//   }
//   selectColor(item) {
//     // console.log('click on view type 2')
//     let arr = [];
//     if (this.state.options.length == 2) {
//       arr = this.state.options[1].product_option_value;
//     }
//     else if (this.state.options.length == 3) {
//       arr = this.state.options[2].product_option_value;
//     }


//     let temp = [];
//     // console.log("arr initial value =>", temp);
//     arr.map((data, i) => {
//       // arr[i].image = { uri: data.image }
//       if (data.parent_id == item.option_value_id) {
//         temp.push(arr[i]);
//       }
//     })
//     // temp.map((data, i) => {
//     //   temp[i].image = { uri: data.image }
//     // })
//     // console.log("temp after =>", temp);
//     let pov = this.getImageObject(temp)
//     this.setState({ product_option_value_3: pov });
//     // console.log("product opriton 3 =>", this.state.product_option_value_3);
//     this.setState({ is_Select_color: true });
//     // this.setState({ tray_sizes: this.state.body.options[2].product_option_value, price: item.price })

//   }
//   getImageObject(array) {
//     let arr = array;
//     arr.map((data, i) => {
//       arr[i].image = { uri: data.image }
//     }
//     )
//     return arr;
//   }
//   viewTypeSelect(item) {
//     // console.log("click on => ",this.state.options.length)
//     if (this.state.options.length == 1) {
//       // console.log("click on => ",1)
//     }
//     else if (this.state.options.length == 2) {
//       // console.log("click on => ",this.state.image)
//       // console.log(item.option_image_name.split('.')[0])
//       let string = this.state.image.split(this.state.sku + "-")
//       let img = string[0] + item.option_image_name.split('.')[0] + "-" + string[1];
//       // console.log("row => ",img);
//       this.setState({ tray_sizes: this.state.body.options[1].product_option_value_data_child[item.option_value_id], price: item.price != false ? item.price : this.state.price, image: img, sku: item.option_image_name.split('.')[0] })
//       this.setState({ is_Select: true });

//     }
//     else if (this.state.options.length == 5) {
//       // console.log("click on design")
//       this.setState({ design_image: this.state.body.options[1].product_option_value_data_child[item.option_value_id], price: item.price != false ? item.price : this.state.price })
//       this.setState({ showDesign: true });
//     }
//     // console.log("state => ",this.state.image)
//   }
//   render() {
//     return (
//       <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
//         {this.state.item.success == undefined ? <LoadingComponent /> :
//           <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover"  >
//             <ScrollView style={portraitStyles.container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
//               <View style={portraitStyles.homeAccentContainer}>
//                 <View style={portraitStyles.productProfileContainer} >
//                   <TouchableOpacity>
//                     <View style={portraitStyles.homeAccentImageContainer}>
//                       <ImageLazyLoading style={portraitStyles.homeAccentImage} source={{ uri: this.state.image }} />
//                     </View>
//                   </TouchableOpacity>
//                   {renderIf(this.state.items_image.length > 0)(
//                     <ScrollView horizontal={true} style={{ width: "100%" }}>
//                       {this.state.items_image.map((data, i) => (
//                         <View style={{ flexDirection: 'row' }} key={i}>
//                           <TouchableOpacity onPress={() => this.setState({ image: this.state.items_image[i].popup })} >
//                             <Image style={{ height: 100, width: 100, margin: 10 }} source={{ uri: data.popup }}></Image>
//                           </TouchableOpacity>
//                         </View>
//                       ))}
//                     </ScrollView>
//                   )}
//                   <View style={portraitStyles.homeAccentTextContainer}>
//                     <Text style={portraitStyles.homeAccentText}>{this.state.name}</Text>
//                     <Text style={portraitStyles.productProfilePrice} >{this.state.price}</Text>
//                   </View>
//                   <View style={portraitStyles.optionParentcontainer}>
//                     {renderIf(this, this.state.body.is_gift_wrap == 1)(
//                       <View style={portraitStyles.optionContainer}>
//                         <Image style={portraitStyles.optionIcon} source={require('../../assets/images/options_icons/gift.png')} />
//                         <Text style={portraitStyles.optionText}>Gift Wrapped</Text>
//                       </View>
//                     )}
//                     {renderIf(this.state.body.handcrafted == 1)(
//                       <View style={portraitStyles.optionContainer}>
//                         <Image style={portraitStyles.optionIcon} source={require('../../assets/images/options_icons/handcrafted_icon.png')} />
//                         <Text style={portraitStyles.optionText}>Handcrafted with Love</Text>
//                       </View>
//                     )}
//                     {renderIf(this.state.body.sustain == 1)(
//                       <View style={portraitStyles.optionContainer}>
//                         <Image style={portraitStyles.optionIcon} source={require('../../assets/images/options_icons/sustainably_sourced_icon.png')} />
//                         <Text style={portraitStyles.optionText}>Sustainably Sourced</Text>
//                       </View>
//                     )}
//                   </View>
//                 </View>
//                 {this.state.body.view_type == 2 ?
//                   <View style={{ padding: 10 }}>
//                     <SelectCountry
//                       style={styles.dropdown}
//                       selectedTextStyle={styles.selectedTextStyle}
//                       placeholderStyle={styles.placeholderStyle}

//                       imageStyle={styles.imageStyle}
//                       inputSearchStyle={styles.inputSearchStyle}
//                       iconStyle={styles.iconStyle}
//                       maxHeight={200}
//                       data={this.state.product_option_value}
//                       valueField="product_option_value_id"
//                       labelField="name"
//                       imageField="image"
//                       placeholder={"Select a " + this.state.body.options[0].name}
//                       searchPlaceholder="Search..."
//                       onChange={item => {
//                         this.state.cat_id === 47 ? this.selectColor(item) : this.viewTypeSelect(item);
//                       }}
//                     />
//                   </View>
//                   :
//                   <></>
//                 }
//                 {this.state.body.view_type == 3 ?
//                   <View>
//                     {/* {this.state.options.length == 3} */}
//                     <View style={{ padding: 10 }}>
//                       <SelectCountry
//                         style={styles.dropdown}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         placeholderStyle={styles.placeholderStyle}

//                         imageStyle={styles.imageStyle}
//                         inputSearchStyle={styles.inputSearchStyle}
//                         iconStyle={styles.iconStyle}
//                         maxHeight={200}
//                         data={this.state.product_option_value}
//                         valueField="product_option_value_id"
//                         labelField="name"
//                         imageField="image"
//                         placeholder={"Select a " + this.state.body.options[0].name}
//                         searchPlaceholder="Search..."
//                         onChange={item => {
//                           // this.selectColor(item)
//                           // this.setState({ is_Select_color: true });
//                         }}
//                       />
//                     </View>
//                     <View style={{ padding: 10 }}>
//                       <SelectCountry
//                         style={styles.dropdown}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         placeholderStyle={styles.placeholderStyle}

//                         imageStyle={styles.imageStyle}
//                         inputSearchStyle={styles.inputSearchStyle}
//                         iconStyle={styles.iconStyle}
//                         maxHeight={200}
//                         data={this.state.product_option_value_2}
//                         valueField="product_option_value_id"
//                         labelField="name"
//                         imageField="image"
//                         placeholder={"Select a " + this.state.body.options[1].name}
//                         searchPlaceholder="Search..."
//                         onChange={item => {
//                           this.selectColor(item)
//                           this.setState({ is_Select_color: true });
//                         }}
//                       />
//                     </View>
//                   </View>
//                   :
//                   <></>
//                 }
//                 {this.state.is_Select_color ?
//                   <View style={{ padding: 10 }}>
//                     <SelectCountry
//                       style={styles.dropdown}
//                       selectedTextStyle={styles.selectedTextStyle}
//                       placeholderStyle={styles.placeholderStyle}
//                       imageStyle={styles.imageStyle}
//                       inputSearchStyle={styles.inputSearchStyle}
//                       iconStyle={styles.iconStyle}
//                       maxHeight={200}
//                       data={this.state.product_option_value_3}
//                       valueField="product_option_value_id"
//                       labelField="name"
//                       imageField="image"
//                       placeholder={"Select a " + this.state.options.length != 3 ? this.state.body.options[1].name : this.state.body.options[2].name}
//                       searchPlaceholder="Search..."
//                       onChange={item => {

//                       }}
//                     />
//                   </View>
//                   :
//                   <></>
//                 }
//                 {this.state.is_Select ?
//                   <View style={{ padding: 10 }}>
//                     <SelectCountry
//                       style={styles.dropdown}
//                       selectedTextStyle={styles.selectedTextStyle}
//                       placeholderStyle={styles.placeholderStyle}
//                       imageStyle={styles.imageStyle}
//                       inputSearchStyle={styles.inputSearchStyle}
//                       iconStyle={styles.iconStyle}
//                       maxHeight={200}
//                       data={this.state.tray_sizes}
//                       valueField="product_option_value_id"
//                       labelField="name"
//                       imageField="image"
//                       placeholder={"Select a " + this.state.body.options[1].name}
//                       searchPlaceholder="Search..."
//                       onChange={item => {
//                         this.setState({ price: item.price })
//                       }}
//                     />
//                   </View>
//                   :
//                   <></>
//                 }

//                 {this.state.body.view_type == 1 && this.state.options.length > 0 ?
//                   <View style={{ padding: 10 }}>
//                     <SelectCountry
//                       style={styles.dropdown}
//                       selectedTextStyle={styles.selectedTextStyle}
//                       placeholderStyle={styles.placeholderStyle}
//                       imageStyle={styles.imageStyle}
//                       inputSearchStyle={styles.inputSearchStyle}
//                       iconStyle={styles.iconStyle}
//                       maxHeight={200}
//                       data={this.state.product_option_value}
//                       valueField="product_option_value_id"
//                       labelField="name"
//                       imageField="image"
//                       placeholder={"Select a " + this.state.body.options[0].name}
//                       searchPlaceholder="Search..."
//                       onChange={item => {

//                       }}
//                     />
//                   </View>
//                   :
//                   <></>
//                 }
//                 {renderIf(false)(
//                   <View style={{ padding: 10 }}>
//                     <Text style={{ color: 'black', padding: 10, fontSize: 16 }}>How would you like us to Personalize it for you?</Text>
//                   </View>
//                 )}
//                 {renderIf(false)(
//                   <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', padding: 10, display: 'flex', flexDirection: 'row' }}>
//                     <View>
//                       <MaterialIcons name='navigate-before' color={'#6D6D6D'} size={35} />
//                     </View>
//                     <ScrollView horizontal={true} style={{ width: "80%" }} >
//                       {this.state.design_image.map((data, i) => (
//                         <TouchableOpacity style={{ height: 110, width: 110, borderWidth: 1, justifyContent: "center", alignItems: 'center', borderColor: this.state.image == data.image ? "black" : "lightgrey", margin: 5 }} onPress={() => this.setState({ image: this.state.design_image[i].image, showPersonalization: true, border_color: 'black' })} key={i}>
//                           <Image style={{ height: 100, width: 100, }} source={{ uri: data.image }}></Image>
//                         </TouchableOpacity>
//                       ))}
//                     </ScrollView>
//                     <View>
//                       <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={35} />
//                     </View>
//                   </View>
//                 )}


//                 {this.state.body.view_type == 5 ?
//                   <View style={{ padding: 10 }}>
//                     <View>
//                       <SelectCountry
//                         style={styles.dropdown}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         placeholderStyle={styles.placeholderStyle}

//                         imageStyle={styles.imageStyle}
//                         inputSearchStyle={styles.inputSearchStyle}
//                         iconStyle={styles.iconStyle}
//                         maxHeight={200}
//                         data={this.state.product_option_value}
//                         valueField="product_option_value_id"
//                         labelField="name"
//                         imageField="image"
//                         placeholder={"Select a " + this.state.body.options[2].name}
//                         searchPlaceholder="Search..."
//                         onChange={item => {
//                           this.setState({ price: item.price })
//                         }}
//                       />
//                     </View>
//                     <View style={{ padding: 10 }}>
//                       <Text style={{ color: 'black', padding: 10, fontSize: 16 }}>How would you like us to Personalize it for you?</Text>
//                     </View>
//                     <View>
//                       <SelectCountry
//                         style={styles.dropdown}
//                         selectedTextStyle={styles.selectedTextStyle}
//                         placeholderStyle={styles.placeholderStyle}

//                         imageStyle={styles.imageStyle}
//                         inputSearchStyle={styles.inputSearchStyle}
//                         iconStyle={styles.iconStyle}
//                         maxHeight={200}
//                         data={this.state.product_option_value_2}
//                         valueField="product_option_value_id"
//                         labelField="name"
//                         imageField="image"
//                         placeholder={"Select a " + this.state.body.options[0].name}
//                         searchPlaceholder="Search..."
//                         onChange={item => {
//                           this.viewTypeSelect(item)
//                           // console.log("click")
//                         }}
//                       />
//                     </View>
//                   </View>
//                   :
//                   <></>
//                 }
//                 {renderIf(this.state.showDesign)(
//                   <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', padding: 10, display: 'flex', flexDirection: 'row' }}>
//                     <View>
//                       <MaterialIcons name='navigate-before' color={'#6D6D6D'} size={35} />
//                     </View>
//                     <ScrollView horizontal={true} style={{ width: "80%" }} >
//                       {this.state.design_image.map((data, i) => (
//                         <TouchableOpacity style={{ height: 110, width: 110, borderWidth: 1, justifyContent: "center", alignItems: 'center', borderColor: this.state.image == data.image ? "black" : "lightgrey", margin: 5 }} onPress={() => this.setState({ image: this.state.design_image[i].image, showPersonalization: true, border_color: 'black' })} key={i}>
//                           <Image style={{ height: 100, width: 100, }} source={{ uri: data.image }}></Image>
//                         </TouchableOpacity>
//                       ))}
//                     </ScrollView>
//                     <View>
//                       <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={35} />
//                     </View>
//                   </View>
//                 )}
//                 {renderIf(this.state.showPersonalization)(
//                   <View style={portraitStyles.trayStyleContainer}>
//                     <Text style={portraitStyles.headerTrayStyle}>Add Your Personalization</Text>
//                     <View style={portraitStyles.trayStyleChild}>
//                       <View style={portraitStyles.containLabelAndInput}>
//                         <TextInput style={portraitStyles.input} placeholder="Name" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ costumer_name: text })} />
//                       </View>
//                       <View style={portraitStyles.containLabelAndInput}>
//                         <TextInput showSoftInputOnFocus={false} onPressIn={() => this.setState({ open: true })} style={portraitStyles.input} placeholder="Date of Birth" placeholderTextColor={'grey'} defaultValue={this.state.flag ? JSON.stringify(this.state.date).substring(1, 11) : ""} onChangeText={(date) => this.setState({ date: date })} />
//                         <DatePicker
//                           modal
//                           open={this.state.open}
//                           date={this.state.date}
//                           androidVariant={'iosClone'}
//                           onConfirm={(date) => {
//                             this.setState({ open: false })
//                             this.setState({ date: date })
//                             this.setState({ flag: true })
//                           }}
//                           fadeToColor={'none'}
//                           mode='date'
//                           onCancel={() => {
//                             this.setState({ open: false })
//                           }}
//                         />
//                       </View>
//                     </View>
//                   </View>
//                 )}
//               </View>
//               <View style={portraitStyles.incDecButtonContainerProfile}>
//                 <Text style={portraitStyles.quantityText}>Quantity:</Text>
//                 <View style={portraitStyles.cartIncDecContainer}>
//                   <TouchableOpacity activeOpacity={0.9} style={portraitStyles.decBtn} onPress={() => this.state.itemcnt > 1 ? this.setState({ itemcnt: this.state.itemcnt - 1 }) : ""}>
//                   <Text style={portraitStyles.decButton}>-</Text></TouchableOpacity>
//                   <Text style={portraitStyles.incDecField} >{this.state.itemcnt}</Text>
//                   <TouchableOpacity activeOpacity={0.9} style={portraitStyles.incBtn} onPress={() => this.setState({ itemcnt: this.state.itemcnt + 1 })
//                   }><Text style={portraitStyles.incButton}>+</Text></TouchableOpacity>
//                 </View>
//               </View>
//               <View style={portraitStyles.cartButtonContainer}>
//                 <Pressable style={portraitStyles.cartbutton} onPress={() => this.addToCart(this.state.product_id)}>
//                   <Text style={portraitStyles.buttonText}>Add to Basket</Text>
//                 </Pressable>
//                 <Pressable onPress={() => this.state.liked ? this.setState({ liked: false }) : this.setState({ liked: true })}>
//                   <MaterialCommunityIcons
//                     name={this.state.liked ? "heart" : "heart-outline"}
//                     size={32}
//                     color={this.state.liked ? "red" : "black"}
//                   />
//                 </Pressable>
//                 <Pressable >
//                   <MaterialCommunityIcons
//                     name="share-variant"
//                     size={32}
//                     color="black"
//                   />
//                 </Pressable>
//               </View>
//               <View style={portraitStyles.overViewAndShippingPolicyContainer}>
//                 <TouchableOpacity activeOpacity={0.9} style={portraitStyles.overViewContainer} onPress={() => this.setState({ plus_minus: this.state.plus_minus == "-" ? "+" : "-" })}>
//                   <Text style={portraitStyles.overViewText}>Overview</Text>
//                   <Text style={portraitStyles.pText}>{this.state.plus_minus}</Text>
//                 </TouchableOpacity>
//                 {renderIf(this.state.plus_minus == '-')(
//                   <View style={portraitStyles.accordianContainer}>
//                     <Text style={portraitStyles.accordianParagraph}>{this.state.body.description}</Text>
//                   </View>
//                 )}
//                 <TouchableOpacity activeOpacity={0.9} style={portraitStyles.shippingPolicyContainer} onPress={() => this.setState({ sp_plus_minus: this.state.sp_plus_minus == "-" ? "+" : "-" })}>
//                   <Text style={portraitStyles.overViewText}>Shipping Policy</Text>
//                   <Text style={portraitStyles.pText}>{this.state.sp_plus_minus}</Text>
//                 </TouchableOpacity>
//                 {renderIf(this.state.sp_plus_minus == '-')(
//                   <View style={portraitStyles.accordianContainer}>
//                     <Text style={portraitStyles.accordianParagraph}>{this.state.body.description}</Text>
//                   </View>
//                 )}
//               </View>
//               <View style={portraitStyles.noteContainer}>

//                 <Text style={portraitStyles.noteText}>
//                   Note: {this.state.item.body.additional_line}
//                 </Text>
//               </View>
//               {/* </View> */}
//             </ScrollView>
//           </ImageBackground>
//         }
//       </SafeAreaView>
//     );
//   }
// }
// export default HomeAccent;
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     color: 'black',
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 22,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//     color: "black"
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color: "black"
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     // backgroundColor:"red",
//     color: "black"
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//     color: "black"
//   },
// });
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
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Axios } from 'axios';
import axios from 'axios';
import UseNet from './UseNet';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/Actions';
import { portraitStyles } from '../../Style/globleCss';
import LoadingComponent from './LoadingComponent';
import renderIf from './renderIf';
const HomeAccent = ({ route, navigation }) => {

  const [options, setOptions] = useState([]);
  const [product_id, setProductId] = useState('');
  const [date, setDate] = useState(new Date());
  const [body, setBody] = useState({});
  const [open, setOpen] = useState(false);
  const [border_color, setBorderColor] = useState('lightgrey');
  const [flag, setFlag] = useState(false);
  const [costumer_name, setCustomerName] = useState("")
  const [sets_view_type_5, setSetsViewType5] = useState([]);
  const [sku, setSku] = useState("");
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('Rs. 850.00 - 2850.00');
  const [size, setSize] = useState("");
  const [showDesign, setShowDesign] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [item, setItem] = useState({});
  const [itemcnt, setItemcnt] = useState(1);
  const [is_Select, setIsSelect] = useState(false);
  const [sp_plus_minus, setSpPlusMinus] = useState('+');
  const [is_Select_color, setIsSelectColor] = useState(false);
  const [product_option_value, setProductOptionValue] = useState([]);
  const [product_option_value_2, setProductOptionValue2] = useState([]);
  const [product_option_value_3, setProductOptionValue3] = useState([]);
  const [liked, setLiked] = useState(false);
  const [ShowDescription, setShowDescription] = useState(false);
  const [plus_minus, setPlusMinus] = useState('+');
  const [tray_sizes, setTraySizes] = useState([]);
  const [cat_id, setCatId] = useState(0);
  const [design_image, setDesignImage] = useState([]);
  const [name, setName] = useState('');
  const [items_image, setItemsImage] = useState([]);
  const [occasions, setOccasions] = useState(
    [
      "Anniversary",
      "Birthday",
      "Graduation",
      "Host & Hostess",
      "Housewarming",
      "Monogram",
      "Mother's Day",
      "Father's Day",
      "Season's Greetings",
      "Valentine's Day",
      "Wedding"
    ]
  );
  const [occasions_type, setOccasionsType] = useState(
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1]
  );
  const [show_date, setShowDate] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const dispatch = useDispatch();
  const badgeCount = useSelector(i => i);

  useEffect(() => {
    getData();

  }, [])
  // let a = "craftslane1";
  // let b = a.includes("_") ? a.split("_")[0]:a;
  // console.log(b);
  getData = async () => {
    let parsed = {}
    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);
    }
    catch (error) {
      Alert.alert(error)
    }
    const { cat, id } = route.params;
    let b = cat.substring(1, 3);
    setCatId(parseInt(b));
    setProductId(id)

    await axios.get(parsed.url + "customproductprofile/index&key=" + parsed.key + "&token=" + parsed.token + "&product_id=" + id)
      .then((resp) => {
        setItem(resp.data);
        setBody(resp.data.body);
        setSku(resp.data.body.sku);
        setImage(resp.data.body.thumb);
        setPrice(resp.data.body.range_price == "" ? resp.data.body.price : resp.data.body.range_price);
        setProductOptionValue(resp.data.body.options.length > 0 ? resp.data.body.options[0].product_option_value : []);
        setName(resp.data.body.heading_title);
        setItemsImage(resp.data.body.images);
        setProductOptionValue2(resp.data.body.options.length > 1 ? resp.data.body.options[1].product_option_value : []);
        setProductOptionValue3(resp.data.body.options.length > 1 ? resp.data.body.options[1].product_option_value : []);
        setOptions(resp.data.body.options);
      })

    // console.log("view type = ",body.view_type);
    setStates();
  }
  setStates = () => {
    if (body.view_type == 1) {
      setProductOptionValue(getImageObject(product_option_value))
    }
    else if (body.view_type == 2) {
      if (options.length == 1) {
        setProductOptionValue(getImageObject(options[0].product_option_value))
      }
      else if (options.length == 2) {
        setProductOptionValue(getImageObject(options[0].product_option_value))
      }
    }
    else if (body.view_type == 3) {
      setProductOptionValue2(getImageObject(options[1].product_option_value))
    }
    else if (body.view_type == 5) {

      if (options.length >= 3) {
        if (cat_id == 16) {
          setProductOptionValue(item.body.options[1].product_option_value)
          setProductOptionValue2(item.body.options[0].product_option_value)
        }
        else {
          setProductOptionValue(item.body.options[2].product_option_value)
          setProductOptionValue2(item.body.options[0].product_option_value)
        }
      }
    }
  }

  selectColor = (item) => {
    let arr = [];

    if (options.length == 2) {
      arr = options[1].product_option_value;
    }
    else if (options.length == 3) {
      arr = options[2].product_option_value;
    }

    let temp = [];

    arr.map((data, i) => {
      if (data.parent_id == item.option_value_id) {
        temp.push(arr[i]);
      }
    })

    let pov = getImageObject(temp)
    setProductOptionValue3(pov)
    setIsSelectColor(true)
  }
  getImageObject = (array) => {
    let arr = array;
    arr.map((data, i) => {
      arr[i].image = { uri: data.image }
    }
    )
    return arr;
  }
  viewTypeSelect = (item) => {

    if (options.length == 1) {

    }
    else if (options.length == 2) {

      let string = image.split(sku + "-")
      let img = string[0] + item.option_image_name.split('.')[0] + "-" + string[1];

      if (body.options[1].product_option_value_data_child.length == undefined) {
        setTraySizes(body.options[1].product_option_value_data_child[item.option_value_id]);
        setIsSelect(true);
      }
      setPrice(item.price != false ? item.price : price);
      setImage(img);
      setSku(item.option_image_name.split('.')[0]);

    }
    else if (options.length == 5) {
      occasions_type[occasions.indexOf(item.name)] == 1 ? setShowDate(true) : setShowDate(false);
      if (cat_id == 16) {
        setDesignImage(body.options[2].product_option_value_data_child[item.option_value_id]);
        setImage(body.options[2].product_option_value_data_child[item.option_value_id][0].original_image)

      }
      else {
        setDesignImage(body.options[1].product_option_value_data_child[item.option_value_id]);
        setImage(body.options[1].product_option_value_data_child[item.option_value_id][0].original_image)
      }
      setPrice(item.price != false ? item.price : price)
      setShowDesign(true);

    }

  }
  console.log(product_id);
  addToCart = async (id) => {

    setOverlay(true);
    let parsed = {}
    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

    }
    catch (error) {
      Alert.alert(error)
    }

    const d = {
      product_id: id,
    }

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }
    await axios.post(parsed.url + "customcart/add&key=" + parsed.key + "&token=" + parsed.token + '&os_type=android', d, header)
      .then((response) => {
        const values = {
          cart_items: response.data.total_cart,
          wishlist_items: badgeCount.wishlist_items
        }
        console.log(response.data)
        dispatch(addItemToCart(values))
      })
      .catch((error) => {
        console.warn(error);
      })
    setOverlay(false);

    navigation.navigate('Cart')
  }
  const addToWishlist = async (id) => {
    liked ? setLiked(false) : setLiked(true);
    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    setOverlay(true);
    // console.log("asdfghjk")
    const d = {
      product_id: id,

    }
    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }
    console.log("url = ",parsed.url + 'customwishlist/add&key=' + parsed.key + '&token=' + parsed.token + "&os_type=ios")
    await axios.post(parsed.url + 'customwishlist/add&key=' + parsed.key + '&token=' + parsed.token + "&os_type=ios", d, header).
      then((response) => {
        const values = {
          cart_items: badgeCount.cart_items,
          wishlist_items: response.data.total
        }
        console.log("zxcvnm=>", response.data)
        dispatch(addItemToCart(values))
      })
    setOverlay(false);
  }
  // console.log(body.uu)
  return (
    <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
      {item.success == undefined ? <LoadingComponent /> :
        <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover"  >
          <ScrollView style={portraitStyles.container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
            <Spinner visible={overlay} size={'large'} overlayColor='rgba(0,0,0,0.30)' textContent='Please wait..' textStyle={{ color: 'white' }} />
            <View style={portraitStyles.homeAccentContainer}>
              <View style={portraitStyles.productProfileContainer} >
                <TouchableOpacity>
                  <View style={portraitStyles.homeAccentImageContainer}>
                    <ImageLazyLoading style={portraitStyles.homeAccentImage} source={{ uri: image }} />
                  </View>
                </TouchableOpacity>
                {renderIf(items_image.length > 0)(
                  <ScrollView horizontal={true} style={{ width: "100%" }}>
                    {items_image.map((data, i) => (
                      <View style={{ flexDirection: 'row' }} key={i}>
                        <TouchableOpacity onPress={() => {
                          setImage(items_image[i].popup)
                          let temp = items_image[i].popup.split("/");
                          let new_sku = temp[temp.length - 1].replace("-1000x1000.png", "");
                          setSku(new_sku);
                        }} >
                          <Image style={{ height: 100, width: 100, margin: 10 }} source={{ uri: data.popup }}></Image>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                )}
                <View style={portraitStyles.homeAccentTextContainer}>
                  <Text style={portraitStyles.homeAccentText}>{name}</Text>
                  <Text style={portraitStyles.productProfilePrice} >{price}</Text>
                </View>
                <View style={portraitStyles.optionParentcontainer}>
                  {renderIf(body.is_gift == 1)(
                    <View style={portraitStyles.optionContainer}>
                      <Image style={portraitStyles.optionIcon} source={require('../../assets/images/options_icons/gift.png')} />
                      <Text style={portraitStyles.optionText}>Gift Wrapped</Text>
                    </View>
                  )}
                  {renderIf(body.handcrafted == 1)(
                    <View style={portraitStyles.optionContainer}>
                      <Image style={portraitStyles.optionIcon} source={require('../../assets/images/options_icons/handcrafted_icon.png')} />
                      <Text style={portraitStyles.optionText}>Handcrafted with Love</Text>
                    </View>
                  )}
                  {renderIf(body.sustain == 1)(
                    <View style={portraitStyles.optionContainer}>
                      <Image style={portraitStyles.optionIcon} source={require('../../assets/images/options_icons/sustainably_sourced_icon.png')} />
                      <Text style={portraitStyles.optionText}>Sustainably Sourced</Text>
                    </View>
                  )}
                </View>
              </View>
              {body.view_type == 2 && options.length > 0 ?
                <View style={{ padding: 10 }}>
                  <SelectCountry
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
                    placeholderStyle={styles.placeholderStyle}

                    imageStyle={styles.imageStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    maxHeight={200}
                    data={product_option_value}
                    valueField="product_option_value_id"
                    labelField="name"
                    imageField="image"
                    placeholder={"Select a " + body.options[0].name}
                    searchPlaceholder="Search..."
                    onChange={item => {
                      cat_id === 47 ? selectColor(item) : viewTypeSelect(item);
                    }}
                  />
                </View>
                :
                <></>
              }
              {body.view_type == 3 ?
                <View>
                  {/* {options.length == 3} */}
                  <View style={{ padding: 10 }}>
                    <SelectCountry
                      style={styles.dropdown}
                      selectedTextStyle={styles.selectedTextStyle}
                      placeholderStyle={styles.placeholderStyle}

                      imageStyle={styles.imageStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      maxHeight={200}
                      data={product_option_value}
                      valueField="product_option_value_id"
                      labelField="name"
                      imageField="image"
                      placeholder={"Select a " + body.options[0].name}
                      searchPlaceholder="Search..."
                      onChange={item => {
                        // selectColor(item)
                        // setState({ is_Select_color: true });
                      }}
                    />
                  </View>
                  <View style={{ padding: 10 }}>
                    <SelectCountry
                      style={styles.dropdown}
                      selectedTextStyle={styles.selectedTextStyle}
                      placeholderStyle={styles.placeholderStyle}

                      imageStyle={styles.imageStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      maxHeight={200}
                      data={product_option_value_2}
                      valueField="product_option_value_id"
                      labelField="name"
                      imageField="image"
                      placeholder={"Select a " + body.options[1].name}
                      searchPlaceholder="Search..."
                      onChange={item => {
                        selectColor(item)
                        setIsSelectColor(true)
                      }}
                    />
                  </View>
                </View>
                :
                <></>
              }
              {is_Select_color ?
                <View style={{ padding: 10 }}>
                  <SelectCountry
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
                    placeholderStyle={styles.placeholderStyle}
                    imageStyle={styles.imageStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    maxHeight={200}
                    data={product_option_value_3}
                    valueField="product_option_value_id"
                    labelField="name"
                    imageField="image"
                    placeholder={"Select a " + options.length != 3 ? body.options[1].name : body.options[2].name}
                    searchPlaceholder="Search..."
                    onChange={item => {

                    }}
                  />
                </View>
                :
                <></>
              }
              {is_Select ?
                <View style={{ padding: 10 }}>
                  <SelectCountry
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
                    placeholderStyle={styles.placeholderStyle}
                    imageStyle={styles.imageStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    maxHeight={200}
                    data={tray_sizes}
                    valueField="product_option_value_id"
                    labelField="name"
                    imageField="image"
                    placeholder={"Select a " + body.options[1].name}
                    searchPlaceholder="Search..."
                    onChange={item => {
                      setPrice(item.price)
                      let string = image.split(sku + "-")
                      let img = string[0] + item.option_image_name.split('.')[0] + "-" + string[1];
                      setImage(img);
                      setSku(item.option_image_name.split('.')[0]);
                    }}
                  />
                </View>
                :
                <></>
              }

              {body.view_type == 1 && options.length > 0 ?
                <View style={{ padding: 10 }}>
                  <SelectCountry
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
                    placeholderStyle={styles.placeholderStyle}
                    imageStyle={styles.imageStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    maxHeight={200}
                    data={product_option_value}
                    valueField="product_option_value_id"
                    labelField="name"
                    imageField="image"
                    placeholder={"Select a " + body.options[0].name}
                    searchPlaceholder="Search..."
                    onChange={item => {

                    }}
                  />
                </View>
                :
                <></>
              }

              {
                body.view_type == 5 ?
                  <View style={{ padding: 10 }}>
                    {product_option_value.length != false ?
                      <View>
                        <SelectCountry
                          style={styles.dropdown}
                          selectedTextStyle={styles.selectedTextStyle}
                          placeholderStyle={styles.placeholderStyle}

                          imageStyle={styles.imageStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          maxHeight={200}
                          data={product_option_value}
                          valueField="product_option_value_id"
                          labelField="name"
                          imageField="image"
                          placeholder={cat_id == 16 ? "Select a " + body.options[1].name : "Select a " + body.options[2].name}
                          searchPlaceholder="Search..."
                          onChange={item => {
                            setPrice(item.price)
                          }}
                        />
                      </View>
                      : <></>
                    }
                    <View style={{ padding: 10 }}>
                      <Text style={{ color: 'black', padding: 10, fontSize: 16 }}>How would you like us to Personalize it for you?</Text>
                    </View>
                    <View>
                      <SelectCountry
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}

                        imageStyle={styles.imageStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        maxHeight={200}
                        data={product_option_value_2}
                        valueField="product_option_value_id"
                        labelField="name"
                        imageField="image"
                        placeholder={"Select a " + body.options[0].name}
                        searchPlaceholder="Search..."
                        onChange={item => {
                          viewTypeSelect(item)
                          // console.log("click")
                        }}
                      />
                    </View>
                  </View>
                  :
                  <></>


              }
              {renderIf(showDesign)(
                <View style={{ width: "100%", justifyContent: "center", alignItems: 'center', padding: 10, display: 'flex', flexDirection: 'row' }}>
                  <View>
                    <MaterialIcons name='navigate-before' color={'#6D6D6D'} size={35} />
                  </View>
                  <ScrollView horizontal={true} style={{ width: "80%" }} >
                    {design_image.map((data, i) => (
                      <TouchableOpacity style={{ height: 110, width: 110, borderWidth: 1, justifyContent: "center", alignItems: 'center', borderColor: image == data.image ? "black" : "lightgrey", margin: 5 }} onPress={() => {
                        setImage(design_image[i].original_image);
                        setShowPersonalization(true);
                        setBorderColor('black');
                      }} key={i}>
                        <Image style={{ height: 100, width: 100, }} source={{ uri: data.image }}></Image>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <View>
                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={35} />
                  </View>
                </View>
              )}
              {renderIf(showPersonalization)(
                <View style={portraitStyles.trayStyleContainer}>
                  <Text style={portraitStyles.headerTrayStyle}>Add Your Personalization</Text>
                  <View style={portraitStyles.trayStyleChild}>
                    <View style={portraitStyles.containLabelAndInput}>
                      <TextInput style={portraitStyles.input} placeholder="Name" placeholderTextColor={'grey'} onChangeText={(text) => setCustomerName(text)} />
                    </View>
                    {renderIf(show_date)(
                      <View style={portraitStyles.containLabelAndInput}>
                        <TextInput showSoftInputOnFocus={false} onPressIn={() => setOpen(true)} style={portraitStyles.input} placeholder="Date" placeholderTextColor={'grey'} defaultValue={flag ? JSON.stringify(date).substring(1, 11) : ""} onChangeText={(date) => setDate(date)} />
                        <DatePicker
                          modal
                          open={open}
                          date={date}
                          androidVariant={'iosClone'}
                          onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                            setFlag(true)
                          }}
                          fadeToColor={'none'}
                          mode='date'
                          onCancel={() => {
                            setOpen(false)
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
            <View style={portraitStyles.incDecButtonContainerProfile}>
              <Text style={portraitStyles.quantityText}>Quantity:</Text>
              <View style={portraitStyles.cartIncDecContainer}>
                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.decBtn} onPress={() => itemcnt > 1 ? setItemcnt(itemcnt - 1) : ""}>
                  <Text style={portraitStyles.decButton}>-</Text></TouchableOpacity>
                <Text style={portraitStyles.incDecField} >{itemcnt}</Text>
                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.incBtn} onPress={() => setItemcnt(itemcnt + 1)
                }><Text style={portraitStyles.incButton}>+</Text></TouchableOpacity>
              </View>
            </View>
            <View style={portraitStyles.cartButtonContainer}>
              <Pressable style={portraitStyles.cartbutton} onPress={() => addToCart(product_id)}>
                <Text style={portraitStyles.buttonText}>Add to Basket</Text>
              </Pressable>
              <Pressable onPress={() => addToWishlist(product_id)}>
                <MaterialCommunityIcons
                  name={liked ? "heart" : "heart-outline"}
                  size={32}
                  color={liked ? "red" : "black"}
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
              <TouchableOpacity activeOpacity={0.9} style={portraitStyles.overViewContainer} onPress={() => setPlusMinus(plus_minus == "-" ? "+" : "-")}>
                <Text style={portraitStyles.overViewText}>Overview</Text>
                <Text style={portraitStyles.pText}>{plus_minus}</Text>
              </TouchableOpacity>
              {plus_minus == '-' ?
                <View style={portraitStyles.accordianContainer}>
                  <Text style={portraitStyles.accordianParagraph}>{body.description.split("+++").length >= 0 ? body.description.split("+++")[0] : ""}</Text>
                  <Text style={portraitStyles.accordianParagraph}>{body.description.split("+++").length > 1 ? body.description.split("+++")[1] : ""}</Text>
                  <Text style={portraitStyles.accordianParagraph}>{body.description.split("+++").length > 2 ? body.description.split("+++")[2] : ""}</Text>
                  <Text style={portraitStyles.accordianText}>:- Handcrafted out of high quality MDF</Text>
                  <Text style={portraitStyles.accordianText}>:- Embellished with a 24K Gold trim</Text>
                  <Text style={portraitStyles.accordianText}>:- Eco-friendly and sustainably sourced</Text>
                  <Text style={portraitStyles.accordianText}>:- Sold Individually</Text>
                  <Text style={portraitStyles.accordianText}>:- Do not rinse under water, wipe clean with a soft damp cloth</Text>
                  <Text style={portraitStyles.accordianText}>:- Dishwasher safe</Text>
                  <Text style={portraitStyles.accordianText}>:- Not Microwaveable</Text>
                  <Text style={portraitStyles.accordianText}>:- Country of Origin: Sri Lanka</Text>
                  <Text style={portraitStyles.accordianText}>:- Due to the differences in displays on tech devices, the colours of the product you receive may vary marginally from the colours seen on our website</Text>
                  <Text style={portraitStyles.accordianText}>:- SKU: {body.sku}</Text>
                </View>
                :
                <></>
              }
              <TouchableOpacity activeOpacity={0.9} style={portraitStyles.shippingPolicyContainer} onPress={() => setSpPlusMinus(sp_plus_minus == "-" ? "+" : "-")}>
                <Text style={portraitStyles.overViewText}>Shipping Policy</Text>
                <Text style={portraitStyles.pText}>{sp_plus_minus}</Text>
              </TouchableOpacity>
              {sp_plus_minus == '-' ?
                <View style={portraitStyles.accordianContainer}>
                  <Text style={portraitStyles.shippingHeadings}>Shipping Policy</Text>
                  <Text style={portraitStyles.accordianText}>Shipping within mainland India is Free!</Text>
                  <Text style={portraitStyles.shippingHeadings}>Shipping</Text>
                  <Text style={portraitStyles.accordianText}>We generally ship within 1 or 2 days after the payment has been received</Text>
                  <Text style={portraitStyles.accordianText}>Application of a coat of Primer takes 2 days and Orders will be dispatched within 3 - 4 days after the Order has been placed</Text>
                  <Text style={portraitStyles.accordianText}>For Painted products kindly budget at least 4 - 5 days extra, and Orders will be dispatched 5 - 6 days after the Order has been placed</Text>
                  <Text style={portraitStyles.accordianText}>For Personalized products kindly budget 7 days extra, and Orders will be dispatched 7 - 8 days after the Order has been placed</Text>
                  <Text style={portraitStyles.accordianText}>Dispatches for the day are boxed by 5.00 p.m. and are picked up at 6.00 p.m.</Text>
                  <Text style={portraitStyles.accordianText}>There are no dispatches on the weekends or public holidays</Text>
                  <Text style={portraitStyles.accordianText}>Orders once placed cannot be cancelled under any circumstance</Text>
                  <Text style={portraitStyles.shippingHeadings}>Handling</Text>
                  <Text style={portraitStyles.accordianText}>
                    There is a small Handling Charge of Rs.99 on Orders less than Rs.250 (excluding GST)
                  </Text>
                  <Text style={portraitStyles.shippingHeadings}>Delivery</Text>
                  <Text style={portraitStyles.accordianText}>Delivery generally takes 5 – 6 working days, once we ship, based on the delivery locations</Text>
                  <Text style={portraitStyles.accordianText}>There is an extra charge for Expedited Delivery which can only be assessed once the goods are ready for dispatch</Text>
                  <Text style={portraitStyles.accordianText}>In the event that Expedited Delivery is required, the extra amount payable will be communicated, and goods dispatched once the extra amount has been credited into our Bank Account</Text>
                  <Text style={portraitStyles.accordianText}>Our logistics partners are FedEx and Speed Post</Text>
                  <Text style={portraitStyles.accordianText}>You may track your shipments on www.fedex.com/in and www.indiapost.gov.in</Text>
                  <Text style={portraitStyles.shippingHeadings}>International Shipping</Text>
                  <Text style={portraitStyles.accordianText}>For International Shipping, the Product Prices will be as displayed on the Website
                  </Text>
                  <Text style={portraitStyles.accordianText}>The Prices will be visible in USD, Pound Sterling and Euro based on your IP address
                  </Text>
                  <Text style={portraitStyles.accordianText}>There are no GST (Local Sales Taxes) applicable on International Orders
                  </Text>
                  <Text style={portraitStyles.accordianText}>The Currency is dynamically computed on a daily basis
                  </Text>
                  <Text style={portraitStyles.accordianText}>The minimum Order Value is INR 1,500 or approximately USD 20
                  </Text>
                  <Text style={portraitStyles.accordianText}>The Freight will be computed once the order has been Boxed
                  </Text>
                  <Text style={portraitStyles.accordianText}>An Invoice for the Freight amount will be raised and emailed separately through our secure Payment Gateway CCAvenue
                  </Text>
                  <Text style={portraitStyles.accordianText}>The Order will be dispatched once we have received the Freight payment
                  </Text>
                  <Text style={portraitStyles.accordianText}>On Orders with a value over INR 1,00,000, we would request you to please email us at customercare@craftslane.com
                  </Text>
                </View>
                :
                <></>
              }
            </View>
            <View style={portraitStyles.noteContainer}>

              <Text style={portraitStyles.noteText}>
                Note: {item.body.additional_line}
              </Text>
            </View>
            {/* </View> */}
          </ScrollView>
        </ImageBackground>
      }
    </SafeAreaView>
  );
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


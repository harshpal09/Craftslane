import React, { Component, useEffect,useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Image, RefreshControl, TouchableOpacity, SafeAreaView, ActivityIndicator, Pressable } from 'react-native';
// import UiOrientation from './UiOrientation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import ImageLazyLoading from "react-native-image-lazy-loading";
import { LogBox } from 'react-native';







export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            item: [],
            arr: [],
            name: '',
            response_data: {},
            liked: false,
        }
    }

    componentDidMount() {
        this.getdata();
    }

    async getdata() {
        const { item_name, item_id } = this.props.route.params;
        this.setState({ name: item_name })
        let id = ""
        item_id != null ? id = item_id : id = "";
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed })

            // console.warn(this.state.data)
        }
        catch (error) {
            Alert.alert(error)
        }

        //   console.warn(this.state.data)

        let r = await axios.get(this.state.data.url + "categoryproducts/index&cat_id=" + id + "&key=" + this.state.data.key);

        this.setState({ response_data: r.data })

        if (this.state.response_data.success == 0) {
            showMessage({
                message: this.state.response_data.error,
                duration: 4000,
                type: 'danger',
                color: 'white',
                icon: props => <Entypo name="circle-with-cross" size={20} color={'white'} {...props} />,
                titleStyle: { fontSize: 18 }
            })
        }
        else {
            this.setState({ item: r.data.categories })
        }

    }
    async addTocart(id) {
        // const{ item } = this.props.route.params;
        const d = {
            product_id: id,
            quantity: this.state.itemcnt
        }

        const header = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }
        let rsp = await axios.post(this.state.data.url + "customcart/add&key=" + this.state.data.key + "&token=" + this.state.data.token + '&os_type=android', d, header)
            .then((response) => showMessage({
                message: 'Product added successfully',
                type: 'success',
                color: 'white',
                icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
                backgroundColor: 'green',
                titleStyle: { fontSize: 18 }
            }))
            .catch((error) => {
                console.warn(error);
            })


        // console.warn(this.state.data.url + "customcart/add&key=" + this.state.data.key + "&token=" + this.state.data.token,"pro=> ",d)
        return this.props.navigation.navigate('Cart')
    }




    render() {
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
                {this.state.item.length == false ? <View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View> :
                    <ScrollView style={portraitStyles.container} >
                        {/* <Spinner visible={this.state.categories.length ? false : true} overlayColor="rgba(0, 0, 0, 0.58)" textContent='Loading...' size={50} animation="slide" textStyle={portraitStyles.loadingTextStyle} /> */}
                        {/* <View style={portraitStyles.parentContainer}> */}

                        <View style={portraitStyles.categoryHeaderContainer} >
                            <Text style={portraitStyles.productHeaderText} >{this.state.name}</Text>
                        </View>


                        <View style={portraitStyles.underline}></View>

                        <View >

                            <View style={portraitStyles.warpProductContainer}>
                                {this.state.item.map((val, i) => (
                                    <View style={portraitStyles.productContainer} key={i}>
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('homeaccent')} style={portraitStyles.productImageContainer}>
                                            <ImageLazyLoading style={portraitStyles.productImage} source={{ uri: val.image }} />
                                            <LikeButton  isLiked={this.state.liked} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={portraitStyles.productTextContainer}>
                                            <Text style={portraitStyles.productText} onPress={() => this.props.navigation.navigate('homeaccent')}>{val.title}</Text>
                                        </TouchableOpacity>
                                        <View style={portraitStyles.priceContainer}>
                                            <Text style={portraitStyles.priceText}>Rs. {val.price}</Text>
                                            <TouchableOpacity activeOpacity={0.9} style={portraitStyles.addButton} onPress={() => this.addTocart(val.id)} ><Text style={portraitStyles.addButtonText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>

                        </View>

                        {/* </View> */}

                    </ScrollView>
                }
            </SafeAreaView>
        );
    }
}

const LikeButton = ({isLiked}) => {
    const [liked, setLiked] = useState(isLiked);
    // console.warn(liked);
    return (
      <Pressable onPress={() => setLiked((isLiked) => !isLiked)} style={{position:'absolute',padding:10}}>
        <MaterialCommunityIcons
          name={liked ? "heart" : "heart-outline"}
          size={25}
          color={liked ? "red" : "black"}
        />
      </Pressable>
    );
  };




import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import ImageLazyLoading from "react-native-image-lazy-loading";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/Actions';







export default function Product({ route, navigation }) {

    const [categories, setCategories] = useState([]);
    const [item, setItems] = useState([]);
    const [name, setName] = useState("");
    const [response_data, setData] = useState({});
    const dispatch = useDispatch();


    useEffect(() => {

        getdata();
    }, [])




    getdata = async () => {

        let parsed = {}

        const { item_name, item_id } = route.params;

        setName(item_name);


        let id = ""
        item_id != null ? id = item_id : id = "";
        try {
            let user = await AsyncStorage.getItem('user');
            parsed = JSON.parse(user);

        }
        catch (error) {
            Alert.alert(error)
        }


        let r = await axios.get(parsed.url + "categoryproducts/index&cat_id=" + id + "&key=" + parsed.key);
        console.log(parsed.url + "categoryproducts/index&cat_id=" + id + "&key=" + parsed.key);

        setData(r.data);

        if (response_data.success == 0) {
            showMessage({
                message: response_data.error,
                duration: 4000,
                type: 'danger',
                color: 'white',
                icon: props => <MaterialIcons name="error" size={20} color={'white'} {...props} />,
                titleStyle: { fontSize: 18 }
            })
        }
        else {

            setItems(r.data.categories)
        }

    }

    addTocart = async (id) => {


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
        let rsp = await axios.post(parsed.url + "customcart/add&key=" + parsed.key + "&token=" + parsed.token + '&os_type=android', d, header)
            .then((response) => {
                dispatch(addItemToCart(response.data.total_cart)),

                    showMessage({
                        message: 'Product added successfully',
                        type: 'success',
                        color: 'white',
                        icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
                        backgroundColor: 'green',
                        titleStyle: { fontSize: 18 }
                    })
            })
            .catch((error) => {
                console.warn(error);
            })


        navigation.navigate('Cart')
    }



    return (
        <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
            {item.length == false ? <View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View> :
                <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" >
                    <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false} >


                        <View style={portraitStyles.categoryHeaderContainer} >
                            <Text style={portraitStyles.productHeaderText} >{name}</Text>
                        </View>


                        <View style={portraitStyles.underline}></View>

                        <View >

                            <View style={portraitStyles.warpProductContainer}>
                                {item.map((val, i) => (
                                    <View style={portraitStyles.productContainer} key={i}>
                                        {console.log(val.id)}
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('homeaccent', { image: val.image, name: val.title, config_type: 'color',id : val.id })} style={portraitStyles.productImageContainer}>
                                            <ImageLazyLoading style={portraitStyles.productImage} source={{ uri: val.image }} />
                                            <LikeButton id={val.id} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={portraitStyles.productTextContainer}>
                                            <Text style={portraitStyles.productText} onPress={() => navigation.navigate('homeaccent', { image: val.image, name: val.title, config_type: 'color',id : val.id })}>{val.title}</Text>
                                        </TouchableOpacity>
                                        <View style={portraitStyles.priceContainer}>
                                            <Text style={portraitStyles.priceText}>Rs. {val.price}</Text>
                                            <TouchableOpacity activeOpacity={0.9} style={portraitStyles.addButton} onPress={() => this.addTocart(val.id)} ><MaterialCommunityIcons name='cart-variant' size={25} color={'white'} /></TouchableOpacity>

                                        </View>
                                    </View>
                                ))}
                            </View>

                        </View>



                    </ScrollView>
                </ImageBackground>
            }
        </SafeAreaView>
    );

}

const LikeButton = ({ id }) => {
    const [liked, setLiked] = useState(false);

    const addToWishlist = async (id) => {
        liked ? setLiked(false) : setLiked(true);
        let user = await AsyncStorage.getItem('user');
        let parsed = JSON.parse(user);


        const d = {
            product_id: id,
        }
        const header = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }

        await axios.post(parsed.url + 'customwishlist/add&key=' + parsed.key + '&token=' + parsed.token + "&os_type=android", d, header)
            .then((resp) => {
                if (resp.data.success == 1) {
                    showMessage({
                        message: "Success",
                        duration: 4000,
                        type: 'success',
                        color: 'white',
                        icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
                        titleStyle: { fontSize: 18 }
                    })
                }
            })

    }

    return (
        <Pressable onPress={() => addToWishlist(id)} style={{ position: 'absolute', padding: 10 }}>
            <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={25}
                color={liked ? "red" : "black"}
            />
        </Pressable>
    );
};




import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import ImageLazyLoading from "react-native-image-lazy-loading";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../redux/Actions';
import renderIf from './renderIf';

export default function Product({ route, navigation }) {

    const [categories, setCategories] = useState([]);
    const [item, setItems] = useState([]);
    const [name, setName] = useState("");
    const [response_data, setData] = useState({});
    const [cat_id, setCatId] = useState(undefined);

    const dispatch = useDispatch();
    const [actualPrice, setPrice] = useState(0);
    const [discountPrice, setDiscount] = useState('');
    const [op, setOp] = useState(1);

    const badge_value = useSelector(i => i);

    // console.log(badge_value)
    useEffect(() => {

        getdata();
    }, [])




    getdata = async () => {

        let parsed = {}

        const { item_name, item_id } = route.params;
        setCatId(item_id);
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


        // console.log(parsed.url + "categoryproducts/index&cat_id=" + id + "&key=" + parsed.key)
        // console.log(r.data)

        if (r.price_range != '') {
            setPrice(r.price_range);
            setDiscount(r.MRP_range)
        }

        else if (r.special != '') {
            setPrice(r.special);
            setDiscount(r.temp_price)
        }
        else {
            setPrice(r.temp_price)
            setDiscount('');
        }


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





    return (
        <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
            {item.length == false ? <View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View> :
                <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" >
                    <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false} onTouchEnd={() => console.log("chal raha hai")} onMomentumScrollEnd={() => console.log("momentum")} onScroll={()=> console.log("on scroll")} onScrollEndDrag={()=> console.log("on end")} >


                        <View style={portraitStyles.categoryHeaderContainer} >
                            <Text style={portraitStyles.productHeaderText} >{name}</Text>
                        </View>


                        <View style={portraitStyles.underline}></View>

                        <View >

                            <View style={portraitStyles.warpProductContainer}>
                                {item.map((val, i) => (
                                    <View style={portraitStyles.productContainer} key={i}>

                                        {/* {console.log("cat-id on product => ",cat_id)} */}
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('homeaccent', { cat: "" + cat_id, id: val.id })} style={portraitStyles.productImageContainer}>
                                            <ImageBackground  imageStyle={{ opacity: val.stock == 0 ? 0.5 : 1, borderRadius: val.stock == 0 ? 0 : 15, borderTopLeftRadius:18, borderTopRightRadius: 18,width:149,height:149 }} source={{ uri: val.image }} />
                                            <LikeButton id={val.id} />
                                        </TouchableOpacity>

                                        {renderIf(val.stock == 0)(
                                            <View style={{ width: 150 }}>
                                                <View style={{ backgroundColor: '#af0b1f', width: '100%', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Out Of Stock</Text>
                                                </View>
                                            </View>

                                        )}


                                        <TouchableOpacity style={portraitStyles.productTextContainer}>

                                            <Text style={portraitStyles.productText} onPress={() => navigation.navigate('homeaccent', { cat: JSON.stringify(cat_id), id: val.id })}>{val.title}</Text>

                                        </TouchableOpacity>


                                        <View style={portraitStyles.priceContainer}>
                                            {val.price_range != '' ?
                                                <View>
                                                    <Text style={portraitStyles.priceText}>{val.price_range}</Text>
                                                    <Text style={portraitStyles.discountPrice}>{val.MRP_range}</Text>
                                                </View>
                                                : val.special != false ?
                                                    <View>
                                                        <Text style={portraitStyles.priceText}>{val.special}</Text>
                                                        <Text style={portraitStyles.discountPrice}> {val.temp_price}</Text>
                                                    </View> :
                                                    <Text style={portraitStyles.priceText}>{val.temp_price}</Text>

                                            }

                                            {renderIf(val.stock != 0)(
                                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.addButton} onPress={() => navigation.navigate('homeaccent', { cat: "" + cat_id, id: val.id })} ><MaterialCommunityIcons name='cart-variant' size={25} color={'white'} /></TouchableOpacity>
                                            )}
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
    const dispatch = useDispatch();
    const badgeCount = useSelector(i => i);
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
        // console.log(parsed.url + 'customwishlist/add&key=' + parsed.key + '&token=' + parsed.token + "&os_type=ios",)
        await axios.post(parsed.url + 'customwishlist/add&key=' + parsed.key + '&token=' + parsed.token + "&os_type=ios", d, header).
            then((response) => {
                const values = {
                    cart_items: badgeCount.cart_items,
                    wishlist_items: response.data.total
                }
                console.log(response.data)
                dispatch(addItemToCart(values))
            })
        // dispatch(addItemToCart(values))
        // .then((resp) => {
        //     if (resp.data.success == 1) {
        //         showMessage({
        //             message: "Success",
        //             duration: 4000,
        //             type: 'success',
        //             color: 'white',
        //             icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
        //             titleStyle: { fontSize: 18 }
        //         })
        //     }
        // })

    }

    return (
        <Pressable onPress={() => addToWishlist(id)} style={{ position: 'absolute', padding: 10, margin: 10, borderRadius: 50, backgroundColor: "rgba(255, 250, 236, 0.5)" }}>

            <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={25}
                color={liked ? "#e60505" : "#3D3D3D"}
            />
        </Pressable>
    );
};



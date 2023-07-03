
import React, { useEffect, useState, memo } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Image, ImageBackground, RefreshControl, TouchableOpacity, SafeAreaView, Pressable, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import ImageLazyLoading from "react-native-image-lazy-loading";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, checkToken } from '../redux/Actions';
import renderIf from './renderIf';

import { BottomSheet } from '@gorhom/bottom-sheet';
import Spinner from 'react-native-loading-spinner-overlay';
// import UserAuth from '../UserAuth';
import Modal from "react-native-modal";
import { CHECK_TOKEN } from '../redux/ActionTypes';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { useMemo } from 'react';
// import { addItemToCart } from '../redux/Actions';


export default function Product({ route, navigation }) {

    const [categories, setCategories] = useState([]);
    const [item, setItems] = useState([]);
    const [name, setName] = useState("");
    const [response_data, setData] = useState({});
    const [cat_id, setCatId] = useState(undefined);
    const [page, setPage] = useState(1);
    const [toggle, setToggle] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


    const dispatch = useDispatch();
    const [actualPrice, setPrice] = useState(0);
    const [discountPrice, setDiscount] = useState('');
    const [op, setOp] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showUserAuth, setShowUserAuth] = useState(false);

    const badge_value = useSelector(i => i);

    // console.log(badge_value)
    useEffect(() => {

        getdata(1);
        checkToken();
    }, [])

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setShowUserAuth(true);
        }
    };



    const handleCloseUserAuth = () => {
        setShowUserAuth(false);
    };


    getdata = async (p) => {

        setIsLoading(true)

        console.log("product.......")
        let parsed = {}
        setToggle(true);
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
        let r = await axios.get(parsed.url + "categoryproducts/index&cat_id=" + id + "&key=" + parsed.key + "&page=" + p + "&limit=" + 10);
        setIsLoading(false);


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

            setItems(item.concat(r.data.categories))
        }
        setPage(p)
        setToggle(false);

    }
  

    renderItem = ({ item }) => {
        return (
            <View style={portraitStyles.productContainer} >
                <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('homeaccent', { cat: "" + cat_id, id: item.id })} style={portraitStyles.productImageContainer}>
                    <ImageBackground imageStyle={{ opacity: item.stock == 0 ? 0.5 : 1, borderRadius: item.stock == 0 ? 0 : 15, borderTopLeftRadius: 18, borderTopRightRadius: 18, width: 149, height: 149 }} source={{ uri: item.image }} />
                    <LikeButton id={item.id} />
                </TouchableOpacity>

                {renderIf(item.stock == 0)(
                    <View style={{ width: 150 }}>
                        <View style={{ backgroundColor: '#af0b1f', width: '100%', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Out Of Stock</Text>
                        </View>
                    </View>

                )}


                <TouchableOpacity style={portraitStyles.productTextContainer}>

                    <Text style={portraitStyles.productText} onPress={() => navigation.navigate('homeaccent', { cat: JSON.stringify(cat_id), id: item.id })}>{item.title}</Text>

                </TouchableOpacity>


                <View style={portraitStyles.priceContainer}>
                    {item.price_range != '' ?
                        <View>
                            <Text style={portraitStyles.priceText}>{item.price_range}</Text>
                            <Text style={portraitStyles.discountPrice}>{item.MRP_range}</Text>
                        </View>
                        : item.special != false ?
                            <View>
                                <Text style={portraitStyles.priceText}>{item.special}</Text>
                                <Text style={portraitStyles.discountPrice}> {item.temp_price}</Text>
                            </View> :
                            <Text style={portraitStyles.priceText}>{item.temp_price}</Text>

                    }

                    {renderIf(item.stock != 0)(

                        <TouchableOpacity activeOpacity={0.9} style={portraitStyles.addButton} onPress={() => navigation.navigate('homeaccent', { cat: JSON.stringify(cat_id), id: item.id })} ><MaterialCommunityIcons name='cart-variant' size={25} color={'white'} /></TouchableOpacity>

                    )}
                </View>
            </View>
        );
    };



    // console.log("all data => ", item.length);
    const memoizedValue = useMemo(() => renderItem, [item]);
    return (
        <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
            {item.length == false ? <View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View> :
                <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" >
                    <View style={portraitStyles.categoryHeaderContainer} >
                        <Text style={portraitStyles.productHeaderText}>{name}</Text>
                    </View>
                    <View style={portraitStyles.underline}></View>
                    <FlatList
                        data={item}
                        renderItem={memoizedValue}
                        keyExtractor={i => i.id}
                        numColumns={DeviceInfo.isTablet() ? 3 : 2}
                        columnWrapperStyle={{ width: '100%', justifyContent: 'space-around' }}
                        onEndReached={() => { if(item.length >= 10){ getdata(page + 1),console.log("end")} }}
                        refreshControl={<RefreshControl refreshing={false} onRefresh={() => { if(item.length >= 10){ getdata(),console.log("refresh pull  ")} }} />}
                        ListFooterComponent={isLoading ? <View style={styles.loaderStyle}>
                            <ActivityIndicator size="large" color="#aaa" />
                        </View> : null}
                        onEndReachedThreshold={0}
                    />
                </ImageBackground>
            }


        </SafeAreaView>
    );

}

const LikeButton = ({ id, tog }) => {
    const dispatch = useDispatch();
    const badgeCount = useSelector(i => i);
    const [liked, setLiked] = useState(false);
    const [overlay, setOverlay] = useState(false)

    useEffect(() => {
        setReduxValue();
    }, [liked])

    const setReduxValue = () => {
        dispatch(checkToken(liked));
    }



    const addToWishlist = async (id) => {
        liked ? setLiked(false) : setLiked(true);
        let user = await AsyncStorage.getItem('user');
        let parsed = JSON.parse(user);
        setIsTrue(true);
        // setOverlay(true);



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
                // console.log(response.data)
                dispatch(addItemToCart(values))
            })

        // setOverlay(false)

    }

    return (
        <Pressable onPress={() => addToWishlist(id)} style={{ position: 'absolute', padding: 10, margin: 10, borderRadius: 50, backgroundColor: "rgba(255, 250, 236, 0.5)" }}>
            <Spinner visible={overlay} size={'large'} overlayColor='rgba(0,0,0,0.30)' textContent='Please wait..' textStyle={{ color: 'white' }} />
            <UserAuth />
            <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={25}
                color={liked ? "#e60505" : "#3D3D3D"}
            />
        </Pressable>
    );
};

const UserAuth = ({ }) => {

    const dispatch = useDispatch();
    const [mobile, setNumber] = useState('');
    const navigation = useNavigation();

    const val = useSelector(s => s)

    getCode = async () => {
        // console.log("it's working")
        // console.log("Mobile number",mobile)
        let parsed = {}
        //  console.log(mobile)
        const data = {
            mobile: mobile,

        }

        try {
            let user = await AsyncStorage.getItem('user');
            parsed = JSON.parse(user);

        }
        catch (error) {
            Alert.alert(error)
        }
        // console.log(data)
        // console.log("Send OTP url=>",parsed.url + "customlogin/send_otp&key=" + parsed.key)
        await axios.post(parsed.url + "customlogin/send_otp&key=" + parsed.key,

            data, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((response) => { }
                // console.log(response.data)


            )

        navigation.navigate('otp', { mobile: mobile }, dispatch(checkToken(false)))

    }


    return (
        <View style={{ flex: 1 }}>
            {/* <Button title="Show modal" onPress={toggleModal} /> */}

            <Modal isVisible={val}
                style={{ width: '100%', marginLeft: 0, marginBottom: 0 }}
            >
                <View style={portraitStyles.modalContainer}>

                    <View style={{ paddingTop: 20 }}>
                        <Text style={portraitStyles.loginWelcomeText}>Welcome to Craftslane</Text>
                    </View>


                    <TouchableOpacity style={portraitStyles.closeContainer} onPress={() => { dispatch(checkToken(false)) }} >
                        <Text style={portraitStyles.closeIcon}>X</Text>
                    </TouchableOpacity>

                    <View style={{ padding: 10 }}>
                        <Text style={portraitStyles.mobileMessage}>Please enter your mobile number</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <View style={portraitStyles.mobileFieldContainer}>
                            <Text style={{ fontSize: 18, padding: 10 }}>+91</Text>
                            <TextInput style={{ fontSize: 18, padding: 8, width: '70%' }} placeholder='Enter mobile number'
                                onChangeText={(text) => setNumber(text)}
                            ></TextInput>
                        </View>

                        <View style={portraitStyles.otpButtonContainer}>
                            <TouchableOpacity style={portraitStyles.otpButton} onPress={() => getCode()}>
                                <Text style={{ color: 'white' }} >Get OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 18 }}>OR</Text>
                    </View>


                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }} onPress={() => navigation.navigate('login', dispatch(checkToken(false)))}>
                        <Text style={{ fontSize: 18, color: '#B48D56', fontWeight: '400', fontFamily: 'Georgia' }}>Login with mobile/email and password</Text>
                    </TouchableOpacity>

                    <View style={{ padding: 5 }}>
                        <Text style={{ fontSize: 18, padding: 5 }}>OR</Text>
                    </View>

                    <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('signup', dispatch(checkToken(false)))}>
                        <Text style={{ fontSize: 18, color: '#B48D56', fontWeight: '400', fontFamily: 'Georgia', }}>New Sign up</Text>
                    </TouchableOpacity>

                    {/* <Button title="Hide modal" onPress={() => { dispatch(checkToken(false)) }} /> */}
                </View>
            </Modal>
        </View>
    );
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
});


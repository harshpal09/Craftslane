import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ImageBackground, FlatList, RefreshControl, TouchableOpacity, SafeAreaView, ActivityIndicator, Pressable } from 'react-native';
// import UiOrientation from './UiOrientation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import ImageLazyLoading from "react-native-image-lazy-loading";
import { LogBox } from 'react-native';
import LoadingComponent from './LoadingComponent';



export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            currentPage: 0,
            isLoading: false,
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

        }
        catch (error) {
            Alert.alert(error)
        }

        this.setState({ currentPage: this.state.currentPage + 1 })
        this.setState({ isLoading: true });
        let r = await axios.get(this.state.data.url + "categoryproducts/index&cat_id=" + id + "&key=" + this.state.data.key + "&page=" + this.state.currentPage);



        this.setState({ response_data: r.data })

        if (this.state.response_data.success == 0 && flag == 0) {
            showMessage({
                message: this.state.response_data.error,
                duration: 4000,
                type: 'danger',
                color: 'white',
                icon: props => <MaterialIcons name="error" size={20} color={'white'} {...props} />,
                titleStyle: { fontSize: 18 }
            })
        }
        else {
            this.setState({ users: this.state.users.concat(this.state.response_data.categories) });

        }

    }


    async addTocart(id) {

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



        return this.props.navigation.navigate('Cart')
    }




    renderItem = ({ item }) => {
        return (
            
                <View style={portraitStyles.productContainer} >
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('homeaccent')} style={portraitStyles.productImageContainer}>
                        <ImageLazyLoading style={portraitStyles.productImage} source={{ uri: item.image }} />
                        <LikeButton isLiked={this.state.liked} />
                    </TouchableOpacity>
                    <TouchableOpacity style={portraitStyles.productTextContainer}>
                        <Text style={portraitStyles.productText} onPress={() => this.props.navigation.navigate('homeaccent')}>{item.title}</Text>
                    </TouchableOpacity>
                    <View style={portraitStyles.priceContainer}>
                        <Text style={portraitStyles.priceText}>Rs. {item.price}</Text>
                        <TouchableOpacity activeOpacity={0.9} style={portraitStyles.addButton} onPress={() => this.addTocart(item.id)} ><MaterialCommunityIcons name='cart-variant' size={25} color={'white'} /></TouchableOpacity>
                    </View>
                </View>
             
        );
    }

    renderLoader() {
        return (
            this.state.isLoading ?
                <View style={styles.loaderStyle}>
                    <ActivityIndicator size="large" color="#aaa" />
                </View> : null
        );
    };

    onRefresh() {
        this.getdata();
    }


    render() {

        return (
            <>
                <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" >
                {/* <View style={portraitStyles.warpProductContainer} > */}
                    <FlatList
                        data={this.state.users}
                        style={portraitStyles.warpFlatlistContainer}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.product_id}
                        ListFooterComponent={this.renderLoader()}
                        showsVerticalScrollIndicator={false}
                        onEndReached={() => this.getdata()}
                        onEndReachedThreshold={0}
                        refreshControl={<RefreshControl refreshing={false} onRefresh={() => this.onRefresh()} />}
                    />
                {/* </View> */}

                </ImageBackground>
            </>
        );
    };
}

const Item = ({ item }) => {
    return (
        
            <View style={portraitStyles.productContainer} >
                <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('homeaccent')} style={portraitStyles.productImageContainer}>
                    <ImageLazyLoading style={portraitStyles.productImage} source={{ uri: item.image }} />
                    {/* <LikeButton isLiked={this.state.liked} /> */}
                </TouchableOpacity>
                <TouchableOpacity style={portraitStyles.productTextContainer}>
                    <Text style={portraitStyles.productText} onPress={() => this.props.navigation.navigate('homeaccent')}>{item.title}</Text>
                </TouchableOpacity>
                <View style={portraitStyles.priceContainer}>
                    <Text style={portraitStyles.priceText}>Rs. {item.price}</Text>
                    <TouchableOpacity activeOpacity={0.9} style={portraitStyles.addButton} onPress={() => this.addTocart(item.id)} ><MaterialCommunityIcons name='cart-variant' size={25} color={'white'} /></TouchableOpacity>
                </View>
            </View>
         
    );
}

const LikeButton = ({ isLiked }) => {
    const [liked, setLiked] = useState(isLiked);
    // console.warn(liked);
    return (
        <Pressable onPress={() => setLiked((isLiked) => !isLiked)} style={{ position: 'absolute', padding: 10 }}>
            <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={25}
                color={liked ? "red" : "black"}
            />
        </Pressable>
    );
};

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



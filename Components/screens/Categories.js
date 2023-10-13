import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Alert, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
// import { portraitStyles, landscapeStyles ,styles} from "../Style/globleCss";
import { portraitStyles } from "../../Style/globleCss";
import ImageLazyLoading from "react-native-image-lazy-loading";
import LoadingComponent from './LoadingComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



class Categories extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            cat_id: null,
            prefixSum:[],
        }

    }

    componentDidMount() {
        const { cat_id } = this.props.route.params;
        this.setState({ cat_id });
        this.getData();
    }

    async getData() {
        const { cat_id } = this.props.route.params;

        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed })

        }
        catch (error) {
            Alert.alert(error)
        }

        let resp = await axios.get(this.state.data.url + "customsubcategories/index&key=" + this.state.data.key + "&token=" + this.state.data.token + "&category_id=" + cat_id)
        //   console.log("Categories Api Call",this.state.data.url + "customsubcategories/index&key=" + this.state.data.key + "&token=" + this.state.data.token+"&category_id="+ cat_id)
        // console.log("Categories page response =>" , resp.data.data)
        // let category = resp.data.data;
      
        if(resp.data.data[0].sub_category.length != undefined){
        let length = resp.data.data[0].sub_category.length;
        this.state.prefixSum[0] = resp.data.data[0].sub_category[0].sub_sub_category.length;
        for(let i = 1;i < length;i++){
            this.state.prefixSum[i] = resp.data.data[0].sub_category[i].sub_sub_category.length + this.state.prefixSum[i-1];
        }
        this.setState({prefixSum:this.state.prefixSum});
        // console.log("Prefix sum value =>", this.state.prefixSum);
    }
        
        this.setState({ categories: resp.data.data })
        
    }

    render() {
        // const { navigate } = this.props.navigation;  

        //  console.log("Prefix value => ",this.state.prefixSum)
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
                {this.state.categories.length == false ? <LoadingComponent /> :
                    <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover">
                        <ScrollView style={portraitStyles.container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} >
                            {/* <Spinner visible={this.state.categories.length ? false : true} overlayColor="rgba(0, 0, 0, 0.58)" textContent='Loading...' size={50} animation="slide" textStyle={portraitStyles.loadingTextStyle} /> */}

                            

                            <View>
                                {this.state.categories.map((data, idx) => (
                                    <View style={portraitStyles.categoryHeaderContainer} key={idx}>
                                        <Text style={portraitStyles.categoryHeaderText}>{data.title}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={portraitStyles.underline}></View>

                            {
                                this.state.categories.map((data, idx) => (
                                    <View key={idx}>
                                        {data.sub_category.map((item, ind) => (
                                            <View>
                                                <View style={portraitStyles.headerTextContainer} key={ind}>
                                                    <Text style={portraitStyles.headerText}>{item.title}</Text>
                                                </View>
                                                <View style={portraitStyles.warpContainer} key={ind}>
                                                    {item.sub_sub_category.map((val, i) => (
                                                        <View style={portraitStyles.warpImageTextContainer} key={i}>
                                                            {/* {console.log(val.title ," => ",this.state.prefixSum)}      */}
                                                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product', { item_name: val.title, item_id: val.id , parent_category_id: this.state.cat_id, index:ind == 0 ? i :this.state.prefixSum[ind-1]+ i })} >
                                                                <View style={portraitStyles.warpImageContainer}>
                                                                    <ImageLazyLoading style={portraitStyles.warpRoundImage} source={{ uri: val.image }} onPress={() => this.props.navigation.navigate('product', { productName: val.title })} />
                                                                </View>
                                                            </TouchableOpacity>
                                                            <View style={portraitStyles.textContainer}>
                                                                <Text
                                                                    style={portraitStyles.categoryType}
                                                                    onPress={() => this.props.navigation.navigate('product', { productName: val.title })}
                                                                >{val.title}</Text>
                                                            </View>
                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                ))}

                        </ScrollView>



                    </ImageBackground>
                }


            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({})

export default Categories;

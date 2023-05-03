import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
// import { portraitStyles, landscapeStyles ,styles} from "../Style/globleCss";
import UiOrientation from '../UiOrientation';
import ImageLazyLoading from "react-native-image-lazy-loading";



class Categories extends UiOrientation {
    constructor() {
        super();
        this.state = {
            categories: [],
            username: 'hARSH',
        }

    }
    render() {
        // const { navigate } = this.props.navigation;  

        // console.warn(this.state.categories);
        return (
            <SafeAreaView style={this.getStyle().screenBackgroundStackTab}>
                {this.state.categories.length == false ? <View style={this.getStyle().loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={this.getStyle().cartImage} /></View> :
                    <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover">
                        <ScrollView style={this.getStyle().container} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} >
                            {/* <Spinner visible={this.state.categories.length ? false : true} overlayColor="rgba(0, 0, 0, 0.58)" textContent='Loading...' size={50} animation="slide" textStyle={this.getStyle().loadingTextStyle} /> */}
                            <View>
                                {this.state.categories.map((data, idx) => (
                                    <View style={this.getStyle().categoryHeaderContainer} key={idx}>
                                        <Text style={this.getStyle().categoryHeaderText}>{data.title}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={this .getStyle().underline}></View>

                            {
                                this.state.categories.map((data, idx) => (
                                    <View key={idx}>
                                        {data.Kitchen.map((item, ind) => (
                                            <View style={this.getStyle().headerTextContainer} key={ind}>
                                                <Text style={this.getStyle().headerText}>{item.title1}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            {this.state.categories.map((data, idx) => (
                                <View key={idx}>
                                    {data.Kitchen.map((item, ind) => (
                                        <View style={this.getStyle().warpContainer} key={ind}>
                                            {item.Drinkware.map((val, i) => (
                                                <View style={this.getStyle().warpImageTextContainer} key={i}>
                                                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product', { item_name: val.title, item_id: val.id })} >
                                                        <View style={this.getStyle().warpImageContainer}>
                                                            <ImageLazyLoading style={this.getStyle().warpRoundImage} source={{ uri: val.image }} onPress={() => this.props.navigation.navigate('product', { productName: val.title })} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={this.getStyle().textContainer}>
                                                        <Text
                                                            style={this.getStyle().categoryType}
                                                            onPress={() => this.props.navigation.navigate('product', { productName: val.title })}
                                                        >{val.title}</Text>
                                                    </View>
                                                </View>
                                            ))}

                                        </View>
                                    ))}
                                </View>
                            ))}
                            {this.state.categories.map((data, idx) => (
                                <View key={idx}>
                                    {data.Kitchen.map((item, ind) => (
                                        <View style={this.getStyle().headerTextContainer} key={ind}>
                                            <Text style={this.getStyle().headerText}>{item.title_2}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                            {this.state.categories.map((data, idx) => (
                                <View key={idx}>
                                    {data.Kitchen.map((item, ind) => (
                                        <View style={this.getStyle().warpProductContainer} key={ind}>
                                            {item.sub_categorie_2.map((val, i) => (
                                                <View style={this.getStyle().warpImageTextContainer} key={i}>
                                                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product', { item_name: val.title, item_id: val.id })} >
                                                        <View style={this.getStyle().warpImageContainer}>
                                                            <ImageLazyLoading style={this.getStyle().warpRoundImage} source={{ uri: val.image }} onPress={() => this.props.navigation.navigate('product', { productName: val.title })} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={this.getStyle().textContainer}>
                                                        <Text style={this.getStyle().categoryType}>{val.title}</Text>
                                                    </View>
                                                </View>
                                            ))}

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

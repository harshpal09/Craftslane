import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import UiOrientation from '../UiOrientation';

export default class NewArrivals extends UiOrientation {

    render() {
        return (
            <SafeAreaView style={this.getStyle().screenBackgroundStackTab}>
                {this.state.alldata.length == false ? <View style={this.getStyle().loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={this.getStyle().cartImage} /></View> :
                    <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover">
                        <ScrollView style={this.getStyle().container} nestedScrollEnabled={true} >
                            {this.state.alldata.map((data, idx) => (
                                <View style={this.getStyle().warpContainer} key={idx}>
                                    {data.new_arrivals.map((item, ind) => (
                                        <View style={this.getStyle().warpImageTextContainer} key={ind}>
                                            <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product', { item_name: item.title, item_id: item.id })} >
                                                <View style={this.getStyle().warpImageContainer}>
                                                    <Image style={this.getStyle().warpRoundImage} source={{ uri: item.image }} />
                                                </View>
                                            </TouchableOpacity>
                                            <View style={this.getStyle().textContainer}>
                                                <Text
                                                    style={this.getStyle().categoryType}
                                                    onPress={() => this.props.navigation.navigate('product', { productName: item.title })}
                                                >{item.title}</Text>
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


import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView,Image,Text,TouchableOpacity } from 'react-native';
import UiOrientation from '../UiOrientation';
import { portraitStyles } from '../../Style/globleCss';

class PopularTrends extends UiOrientation {
    render() {
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
                {
                    this.state.alldata.length == false ? <View style={this.getStyle().loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={this.getStyle().cartImage} /></View> :
                        <ScrollView style={portraitStyles.container}>
                            <View >
                                {this.state.alldata.map((data, idx) => (
                                    <View style={this.getStyle().warpContainer} key={idx}>
                                        {data.popular_trends.map((item, ind) => {
                                            return (
                                                <View style={this.getStyle().warpImageTextContainer} key={ind} >
                                                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={this.getStyle().squareImageContainer}>
                                                        <Image style={this.getStyle().popularImage} source={{ uri: item.image }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('product')} style={this.getStyle().textContainer}>
                                                        <Text style={this.getStyle().categoryType}>{item.title}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({})

export default PopularTrends;

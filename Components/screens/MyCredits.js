import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, ScrollView, ImageBackground, RefreshControl } from 'react-native';
import UiOrientation from '../UiOrientation';
import { DataTable } from 'react-native-paper';
import { portraitStyles } from '../../Style/globleCss';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from './LoadingComponent';

class MyCredits extends Component {
    state = {
        credits: [],
        all_data: {},
        message: '',
        refreshing:false
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {

        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed })

            let token = await AsyncStorage.getItem('token');
            let parsed2 = JSON.parse(token);

            this.setState({token: parsed2})

        }
        catch (error) {
            Alert.alert(error)
        }

        await axios.get(this.state.data.url + 'customcheckcredit/index&key=' + this.state.data.key + '&token=' + this.state.token.token)
            .then((resp) => this.setState({ all_data: resp.data })).catch((error) => console.warn(error))
        if (this.state.all_data.status == 200) {
            this.setState({ credits: this.state.all_data.body });
        }
        else {
            this.setState({ message: this.state.all_data.body })
        }
    }
    _onRefresh = () => {

        this.setState({ refreshing: true });
        if (this.state.credits.length > 0) {
            this.setState({ refreshing: false });
        }
    }
    render() {
        // console.warn(this.state.credits);
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundTab}>
                {this.state.all_data.status == undefined ? <LoadingComponent /> :
                <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover"  >
                    <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                        />}
                    >
                        {
                            this.state.credits.length > 0 ?
                                <View>
                                    <View style={portraitStyles.aboutTextContainer}>
                                        <Text style={portraitStyles.creditsText}>Your Credit will be applied automatically on your next Order</Text>
                                    </View>
                                    <View style={portraitStyles.aboutTextContainer}>
                                        <Text style={portraitStyles.creditsText}>Your Current Credit balance is:<Text style={{fontWeight:'bold'}}> Rs. 5.00.</Text></Text>
                                    </View>
                                    <DataTable>
                                        <DataTable.Row style={{
                                            borderBottomColor: "#BBA890",
                                            borderTopColor: '#BBA890',
                                            borderTopWidth: 2,
                                            borderBottomWidth: 2
                                        }} >
                                            <View style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-around'
                                            }}
                                            >
                                                <Text style={portraitStyles.creditsTableHeaderText}>Date Added</Text>
                                                <Text style={portraitStyles.creditsTableHeaderText}>Description</Text>
                                                <Text style={portraitStyles.creditsTableHeaderText}>Amount (INR)</Text>
                                            </View>
                                        </DataTable.Row>
                                        {this.state.credits.map((val, i) => (
                                            <DataTable.Row style={portraitStyles.creditTableRow} key={i}>
                                                <View style={portraitStyles.creditTableRowView}>
                                                    <Text style={portraitStyles.creditsTableText}>{val.date_added}</Text>
                                                    <Text style={portraitStyles.creditsTableText}>{val.description}</Text>
                                                    <Text style={portraitStyles.creditsTableText}>Rs. {val.amount}</Text>
                                                </View>
                                            </DataTable.Row>
                                        ))}
                                    </DataTable>
                                </View>
                                :
                                <View style={portraitStyles.headerMiddleTextContainer}>
                                    <Text style={portraitStyles.headerText}>{this.state.message}</Text>
                                </View>
                        }
                    </ScrollView>
                    </ImageBackground>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({})

export default MyCredits;

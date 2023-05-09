import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity,ImageBackground, TextInput, KeyboardAvoidingView, Image, RefreshControl } from 'react-native';
// import UiOrientation from '../UiOrientation';

import { DataTable } from 'react-native-paper';
import { portraitStyles } from '../../Style/globleCss';
import axios from 'axios';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from './LoadingComponent';

class MyProfile extends Component {
    constructor() {
        super();
        this.state = {
            text: "harshpal830@gmail.com",
            info: [],
            refreshing: false,
        }
    }
    setText(text) {
        text != "" ? this.setState({ text: text }) : null;
        // console.warn(this.state.text);
    }
    edit() {

    }
    _onRefresh = () => {
        this.getdata();
        this.setState({ refreshing: true });

    }
    componentDidMount() {
        this.getdata();
    }
    async getdata() {
        this.setState({ refreshing: true });
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed })

            // console.warn(this.state.data)
        }
        catch (error) {
            Alert.alert(error)
        }

        await axios.get(this.state.data.url + "customaccountinfo/index&key=" + this.state.data.key + "&token=" + this.state.data.token)
            .then((resp) => this.setState({ info: resp.data.body }))
            .catch((error) => console.warn(error));
        this.setState({ refreshing: false })
        // console.warn(this.state.data);
    }
    render() {
        console.log(this.state.info)
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundTab}>
                {this.state.info.length == false ?<LoadingComponent />:
                <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover"  >
                    <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                        />}
                    >
                        <KeyboardAvoidingView>
                            <View style={portraitStyles.headerMiddleTextContainer}>
                                <Text style={portraitStyles.profileHeaderMiddleText}>Manage your Personal Information</Text>
                            </View>
                            {this.state.info.map((item, i) => (
                                <DataTable style={portraitStyles.dataTable} key={i}>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <View style={portraitStyles.tableColumnFeilds}>
                                            <Text style={portraitStyles.tableDoubleColumnLable}>First Name:</Text>
                                        </View>
                                        <View style={portraitStyles.tableColumnInput}>
                                            <Text style={portraitStyles.tableDoubleColumnText}>{item.firstname}</Text>
                                        </View>
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <View style={portraitStyles.tableColumnFeilds}>
                                            <Text style={portraitStyles.tableDoubleColumnLable}>Last Name:</Text>
                                        </View>
                                        <View style={portraitStyles.tableColumnInput}>
                                            <Text style={portraitStyles.tableDoubleColumnText}>{item.lastname}</Text>
                                        </View>
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <View style={portraitStyles.tableColumnFeilds}>
                                            <Text style={portraitStyles.tableDoubleColumnLable}>Date of Birth:</Text>
                                        </View>
                                        <View style={portraitStyles.tableColumnInput}>
                                            <Text style={portraitStyles.tableDoubleColumnText}>{item.dob}</Text>
                                        </View>
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <View style={portraitStyles.tableColumnFeilds}>
                                            <Text style={portraitStyles.tableDoubleColumnLable}>Company Name:</Text>
                                        </View>
                                        <View style={portraitStyles.tableColumnInput}>
                                            <Text style={portraitStyles.tableDoubleColumnText}>{item.companyname}</Text>
                                        </View>
                                        {/* <View style={portraitStyles.tableColumnInput}>
                                <TouchableOpacity style={portraitStyles.opacityText} onPress={() => this.props.navigation.replace('editprofile')}>
                                    <Text style={portraitStyles.tableDoubleColumnDecoratedText}>add</Text>
                                </TouchableOpacity>
                            </View> */}
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <View style={portraitStyles.tableColumnFeilds}>
                                            <Text style={portraitStyles.tableDoubleColumnLable}>GSTN:</Text>
                                        </View>
                                        <View style={portraitStyles.tableColumnInput}>
                                            <Text style={portraitStyles.tableDoubleColumnText}>{item.fax}</Text>
                                        </View>
                                        {/* <View style={portraitStyles.tableColumnInput}>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.opacityText} onPress={() => this.props.navigation.replace('editprofile')}>
                                    <Text style={portraitStyles.tableDoubleColumnDecoratedText}>add</Text>
                                </TouchableOpacity>
                            </View> */}
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <View style={portraitStyles.tableColumnFeilds}>
                                            <Text style={portraitStyles.tableDoubleColumnLable}>Contact Number:</Text>
                                        </View>
                                        <View style={portraitStyles.tableColumnInput}>
                                        <Text style={portraitStyles.tableDoubleColumnText}>{item.telephone}</Text>
                                        </View>
                                        {/* <View style={portraitStyles.tableColumnInput}>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.opacityText} onPress={() => this.props.navigation.replace('editprofile')}>
                                    <Text style={portraitStyles.tableDoubleColumnDecoratedText}>edit</Text>  
                                </TouchableOpacity>
                            </View> */}
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow}>
                                        <View style={portraitStyles.tableColumnFeilds}>
                                            <Text style={portraitStyles.tableDoubleColumnLable}>Email:</Text>
                                        </View>
                                        <View style={portraitStyles.tableColumnInput}>
                                        <Text style={portraitStyles.tableDoubleColumnText}>{item.email}</Text>
                                        </View>
                                        {/* <View style={portraitStyles.tableColumnInput}>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.opacityText} onPress={() => this.props.navigation.replace('editprofile')}>
                                    <Text style={portraitStyles.tableDoubleColumnDecoratedText}>edit</Text>
                                </TouchableOpacity>
                            </View> */}
                                    </DataTable.Row>
                                    <DataTable.Row style={portraitStyles.tableRow} >
                                        <View style={portraitStyles.tableColumnFeilds}>
                                            <Text style={portraitStyles.tableDoubleColumnLable}>Password</Text>
                                        </View>
                                        <View style={portraitStyles.tableColumnInput}>
                                            <TextInput style={portraitStyles.tableColumnTextInput} secureTextEntry={true} defaultValue='adjashdjs' value={item.password} />

                                        </View>
                                        {/* <View style={portraitStyles.tableColumnInput}>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.opacityText} onPress={() => this.props.navigation.replace('password')}>
                                    <Text style={portraitStyles.tableDoubleColumnDecoratedText}>change Password</Text>
                                </TouchableOpacity>
                            </View> */}
                                    </DataTable.Row>

                                </DataTable>
                            ))}
                        </KeyboardAvoidingView>
                        <TouchableOpacity activeOpacity={0.9} style={portraitStyles.logoutButtonContainer} onPress={() => this.props.navigation.navigate('editprofile')}>
                                <View style={portraitStyles.button} >
                                    <Text style={portraitStyles.buttonText}>Edit Profile</Text>
                                </View>
                            </TouchableOpacity>
                    </ScrollView>
                    </ImageBackground>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({})

export default MyProfile;

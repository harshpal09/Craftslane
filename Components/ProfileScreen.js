import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity,ActivityIndicator,ImageBackground, TouchableHighlightBase,RefreshControl, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import UiOrientation from './UiOrientation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import { DataTable } from 'react-native-';
import { DataTable } from 'react-native-paper';
import { portraitStyles } from '../Style/globleCss';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from './screens/LoadingComponent';
class ProfileScreen extends Component {
    state={
        response_data:{},
        toggle:undefined,
        info: [],
        refreshing: false,
        token:{}
    }
    componentDidMount() {
        this.getdata();
    }
    _onRefresh = () => {
        this.getdata();
        this.setState({ refreshing: true });

    }
    async getdata() {
        this.setState({ refreshing: true });
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed })

            let asyncToken = await AsyncStorage.getItem('token');
            let parsed2 = JSON.parse(asyncToken);
            this.setState({ token: parsed2 })

            // console.warn(this.state.data)
        }
        catch (error) {
            Alert.alert(error)
        }

        console.log("Account Url=>",this.state.data.url + "customaccountinfo/index&key=" + this.state.data.key + "&token=" + this.state.token.token)
        await axios.get(this.state.data.url + "customaccountinfo/index&key=" + this.state.data.key + "&token=" + this.state.token.token)

            .then((resp) => {this.setState({ info: resp.data.body }),console.log(resp.data)})
            .catch((error) => console.log(error));
        this.setState({ refreshing: false })
        // console.warn(this.state.data);
    }
   
    render() {
        console.log(this.state.info);
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
                {this.state.info.length == false ?<LoadingComponent />:
                <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover" >
                <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false} 
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this._onRefresh()}
                    />}
                >
                    <View style={portraitStyles.headerMiddleTextContainer}>
                        {/* <View style={portraitStyles.profileIconContainer}>
                            <MaterialCommunityIcons name='account-circle-outline' size={70} color={'#CEBCA3'} style={{ backgroundColor: '#f2ebd5' }} />
                        </View> */}
                            {this.state.info.map((data,i) => (
                        <View style={portraitStyles.profileNameAndEmailContainer} key={i}>
                            <View style={portraitStyles.profileNameContainer}>
                                <Text style={portraitStyles.profileUserName}>{data.firstname} {data.lastname}</Text>
                                {/* <MaterialIcons name='create' color={'#CEBCA3'} size={25} style={{ marginLeft: 10 }} /> */}
                            </View>
                            <View style={portraitStyles.profileEmailContainer}>
                                <Text style={portraitStyles.profileEmailText}>{data.email}</Text>
                            </View>
                        </View>
                        ))}
                    </View>
                    <DataTable style={portraitStyles.dataTable_2}>
                    <DataTable.Row style={portraitStyles.rowStyles}>
                            <DataTable.Cell >
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.profileHeadings} onPress={() => this.props.navigation.navigate('myprofile')}>
                                    <AntDesign style={portraitStyles.gestureIcon} name='profile' size={21} color={'#6D6D6D'} />
                                    <Text style={portraitStyles.profileHeadingText}>My Profile</Text>
                                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={25} style={portraitStyles.profileIcons} />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row style={portraitStyles.rowStyles}>
                            <DataTable.Cell>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.profileHeadings} onPress={() => this.props.navigation.navigate('editprofile')}>
                                    <MaterialCommunityIcons style={portraitStyles.gestureIcon} name='account-edit' size={23} color={'#6D6D6D'} />
                                    <Text style={portraitStyles.profileHeadingText}>Edit profile</Text>
                                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={25} style={portraitStyles.profileIcons} />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row style={portraitStyles.rowStyles}>
                            <DataTable.Cell>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.profileHeadings} onPress={() => this.props.navigation.navigate('password')}>
                                    <MaterialCommunityIcons style={portraitStyles.gestureIcon} name='form-textbox-password' size={23} color={'#6D6D6D'} />
                                    <Text style={portraitStyles.profileHeadingText}>Password</Text>
                                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={25} style={portraitStyles.profileIcons} />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row style={portraitStyles.rowStyles}>
                            <DataTable.Cell>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.profileHeadings} onPress={() => this.props.navigation.navigate('addressbook')}>
                                    <FontAwesome style={portraitStyles.gestureIcon} name='address-book' size={23} color={'#6D6D6D'} />
                                    <Text style={portraitStyles.profileHeadingText}>Address Book</Text>
                                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={25} style={portraitStyles.profileIcons} />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
                        {/* <DataTable.Row style={portraitStyles.rowStyles}>
                            <DataTable.Cell>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.profileHeadings} onPress={() => this.props.navigation.navigate('wishlist')} >
                                    <MaterialIcons style={portraitStyles.gestureIcon} name='favorite-border' size={23} color={'#6D6D6D'} />
                                    <Text style={portraitStyles.profileHeadingText}>Wish List</Text>
                                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={25} style={portraitStyles.profileIcons} />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row> */}
                        <DataTable.Row style={portraitStyles.rowStyles} >
                            <DataTable.Cell>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.profileHeadings} onPress={() => this.props.navigation.navigate('myorder')}>
                                    <FontAwesome style={portraitStyles.gestureIcon} name='first-order' size={23} color={'#6D6D6D'} />
                                    <Text style={portraitStyles.profileHeadingText}>My Orders</Text>
                                    
                                    <MaterialIcons style={portraitStyles.profileIcons} name='navigate-next' color={'#6D6D6D'} size={25}  />
                                    
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row >
                        <DataTable.Row style={portraitStyles.rowStyles}>
                            <DataTable.Cell>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.profileHeadings} onPress={() => this.props.navigation.navigate('trackorders')}>
                                    <FontAwesome5 style={portraitStyles.gestureIcon} name='shipping-fast' size={18} color={'#6D6D6D'} />
                                    <Text style={portraitStyles.profileHeadingText}>Track Orders</Text>
                                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={25} style={portraitStyles.profileIcons} />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
                        
                        
                        <DataTable.Row style={portraitStyles.rowStylesBottom}>
                            <DataTable.Cell>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.profileHeadings} onPress={() => this.props.navigation.navigate('mycredits')} >
                                    <Fontisto style={portraitStyles.gestureIcon} name='credit-card' size={15} color={'#6D6D6D'} />
                                    <Text style={portraitStyles.profileHeadingText}>My credits</Text>
                                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={25} style={portraitStyles.profileIcons} />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>   
                    </DataTable>
                    {/* <TouchableOpacity activeOpacity={0.9} style={portraitStyles.logoutButtonContainer} onPress={() => this.props.navigation.navigate('checkout')} disabled={this.state.toggle == false ? true:false}>    
                        <View style={portraitStyles.button} >
                            { this.state.toggle == false ?  <ActivityIndicator size="small" color="#fff" /> : <Text style={portraitStyles.buttonText}>Logout</Text>}
                        </View>
                    </TouchableOpacity> */}

                </ScrollView>
                </ImageBackground>
    }
            </SafeAreaView>
            
        );
    }
}

const styles = StyleSheet.create({})

export default ProfileScreen;

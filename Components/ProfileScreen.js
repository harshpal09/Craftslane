import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity,ActivityIndicator,ImageBackground, TouchableHighlightBase, Dimensions } from 'react-native';
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
class ProfileScreen extends Component {
    state={
        response_data:{},
        toggle:undefined,
    }
    // async logout(){
        
    //     this.setState({toggle:false})
    //     try {
    //         let user = await AsyncStorage.getItem('user');
    //         let parsed = JSON.parse(user);
    //         this.setState({ data: parsed })

    //         // console.warn(this.state.data)
    //     }
    //     catch (error) {
    //         Alert.alert(error)
    //     }
    //     await axios.get(this.state.data.url+"customlogout/index&key="+this.state.data.key+'&token='+this.state.data.token).then((resp)=>(this.setState({response_data:resp.data}))).catch((erro)=>console.warn(erro))
    //     this.setState({toggle:true})
    //     // console.warn(this.state.response_data);
        
    //         showMessage({
    //             message: this.state.response_data.body,
    //             duration: 4000,
    //             type: 'success',
    //             color: 'white',
    //             icon: props => <MaterialIcons name="done-outline" size={18} color={'white'} {...props} />,
    //             titleStyle: { fontSize: 18 }
    //         })

    //     await AsyncStorage.removeItem('user');  
    //     return this.props.navigation.replace('login');
    // }
    render() {
        // console.warn(Dimensions.get('screen').width/2.5);
        return (
            <SafeAreaView style={portraitStyles.screenBackgroundTab}>
                <ImageBackground source={require('../assets/base-texture.png')} resizeMode="cover" >
                <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false}>
                    <View style={portraitStyles.headerMiddleTextContainer}>
                        {/* <View style={portraitStyles.profileIconContainer}>
                            <MaterialCommunityIcons name='account-circle-outline' size={70} color={'#CEBCA3'} style={{ backgroundColor: '#f2ebd5' }} />
                        </View> */}
                        <View style={portraitStyles.profileNameAndEmailContainer}>
                            <View style={portraitStyles.profileNameContainer}>
                                <Text style={portraitStyles.profileUserName}>Harsh Pal</Text>
                                {/* <MaterialIcons name='create' color={'#CEBCA3'} size={25} style={{ marginLeft: 10 }} /> */}
                            </View>
                            <View style={portraitStyles.profileEmailContainer}>
                                <Text style={portraitStyles.profileEmailText}>harshpal830@gmail.com</Text>
                            </View>
                        </View>
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
                        <DataTable.Row style={portraitStyles.rowStyles}>
                            <DataTable.Cell>
                                <TouchableOpacity activeOpacity={0.9} style={portraitStyles.profileHeadings} onPress={() => this.props.navigation.navigate('wishlist')} >
                                    <MaterialIcons style={portraitStyles.gestureIcon} name='favorite-border' size={23} color={'#6D6D6D'} />
                                    <Text style={portraitStyles.profileHeadingText}>Wish List</Text>
                                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={25} style={portraitStyles.profileIcons} />
                                </TouchableOpacity>
                            </DataTable.Cell>
                        </DataTable.Row>
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
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({})

export default ProfileScreen;

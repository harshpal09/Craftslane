import React, { Component, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl,ImageBackground,TouchableOpacity, Dimensions } from "react-native";
import axios from "axios";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from './LoadingComponent';


class MyOrders extends Component {
  constructor() {
    super();
    this.state = {
      all_orders: [],
      all_data: {},
      message: '',
      refreshing: false
    }
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })
    }
    catch (error) {
      Alert.alert(error)
    }
    await axios.get(this.state.data.url + "customorderlist/index&key=" + this.state.data.key + "&token=" + this.state.data.token).then((resp) => this.setState({ all_data: resp.data }));
    if (this.state.all_data.status == 200) {
      this.setState({ all_orders: this.state.all_data.body });
    }
    else {
      this.setState({ message: this.state.all_data.message })
    }
  }
  _onRefresh = () => {

    this.setState({ refreshing: true });
    if (this.state.all_orders.length > 0) {
      this.setState({ refreshing: false });
    }
  }

  render() {
    console.log(this.state.all_data.body);
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
            {/* <View style={portraitStyles.parentContainer}> */}
            {
              this.state.all_orders.length > 0 ?
                <View style={portraitStyles.warpProductContainer}>
                  {this.state.all_orders.map((data, i) => (
                    <TouchableOpacity activeOpacity={0.9} style={portraitStyles.cartProductContainer} onPress={() => this.props.navigation.navigate('myorderprofile', { item: data.order_id })} key={i} >
                      <View style={portraitStyles.orderContainer} >
                        <Text style={{ color: 'black' }}>Order ID</Text>
                        <View >
                          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>#{data.order_id}</Text>
                        </View>

                      </View>
                      <View style={portraitStyles.navParentContainer}>
                        <View style={portraitStyles.navContainer}>
                          <View style={portraitStyles.cartTextContainer}> 
                            <Text style={portraitStyles.orderHeadingText}>
                              Customer: <Text style={portraitStyles.cartText}>{data.name} </Text>
                            </Text>
                          </View>
                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.orderHeadingText}>
                              No. of products: <Text style={portraitStyles.cartText}>{data.products}</Text>
                            </Text>
                          </View>
                          {/* <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.cartText}>Mobile: {data.telephone}</Text>
                          </View> */}
                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.orderHeadingText}>Status:<Text style={{ color: 'green' }}> {data.status}</Text></Text>
                          </View>
                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.orderHeadingText}>
                              Date: <Text style={portraitStyles.cartText}>{data.date_added}</Text>
                            </Text>
                          </View>
                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.orderHeadingText}>
                              Total: <Text style={portraitStyles.cartText}>{data.total}</Text>
                            </Text>
                          </View>
                        </View>
                        <View>
                          <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={35} />
                        </View>
                      </View>

                    </TouchableOpacity>
                  ))}
                </View>
                :
                <View style={portraitStyles.headerMiddleTextContainer}>
                  <Text style={portraitStyles.headerText}>{this.state.message}</Text>
                </View>
            }
            {/* </View> */}
          </ScrollView>
          </ImageBackground>
        }
      </SafeAreaView>

    );

  };

render(){
  // console.log(this.state.users);
  return (
    <>
    <ImageBackground  style={{justifyContent:'center',alignItems:'center', height:'100%'}}source={require('../../assets/base-texture.png')} resizeMode="cover" > 
    {this.state.users.length == false ? <LoadingComponent />:
      <FlatList
        data={this.state.users}
        renderItem={this.renderItem}
        keyExtractor={item => item.order_id}
        ListFooterComponent={this.renderLoader()}
        showsVerticalScrollIndicator={false}
        onEndReached={ ()=> this.getUsers()}
        onEndReachedThreshold={0}
        refreshControl={<RefreshControl refreshing={false} onRefresh={()=> this.onRefresh()} />}
      />
      }
      </ImageBackground>
    </>
  );
};

}

const styles = StyleSheet.create({})

export default MyOrders;

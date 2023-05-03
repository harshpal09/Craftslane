import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, ScrollView, Pressable, TouchableOpacity,RefreshControl } from 'react-native';
import UiOrientation from '../UiOrientation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { portraitStyles } from '../../Style/globleCss';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


class MyOrders extends Component {
  constructor() {
    super();
    this.state = {
      all_orders: [],
      all_data: {},
      message:'',
      refreshing:false
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
    else{
      this.setState({message : this.state.all_data.message})
    }
  }
  _onRefresh = () => {

    this.setState({ refreshing: true });
    if (this.state.all_orders.length > 0) {
      this.setState({ refreshing: false });
    }
  }

  render() {
    // console.warn(this.state.all_data.body);
    return (
      <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
        {this.state.all_data.status == undefined ? <View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View> :
          <ScrollView style={portraitStyles.container} 
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
          />}
          >
            {/* <View style={portraitStyles.parentContainer}> */}
              {
                this.state.all_orders.length > 0 ?
                <View style={portraitStyles.warpContainer}>
                  {this.state.all_orders.map((data, i) => (
                    <TouchableOpacity activeOpacity={0.9} style={portraitStyles.cartProductContainer} onPress={() => this.props.navigation.navigate('myorderprofile', { item: data.order_id })} key={i} >
                      <View style={portraitStyles.orderContainer} >
                        <Text style={{ color: 'black' }}>order</Text>
                        <View >
                          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>#{data.order_id}</Text>
                        </View>

                      </View>
                      <View style={portraitStyles.navParentContainer}>
                        <View style={portraitStyles.navContainer}>
                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.cartText}>Name: {data.name}  </Text>
                          </View>
                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.cartText}>Email: {data.email}</Text>
                          </View>
                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.cartText}>Mobile: {data.telephone}</Text>
                          </View>
                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.cartText}>Status:<Text style={{ color: 'green' }}> {data.status}</Text></Text>
                          </View>
                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.cartModelText}>Date: {data.date}</Text>
                          </View>
                          <View style={portraitStyles.cartTextContainer}>
                            <Text style={portraitStyles.cartText}>Total: {data.total}</Text>
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
        }
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({})

export default MyOrders;

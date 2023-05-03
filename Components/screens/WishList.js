import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, ScrollView, TouchableOpacity,RefreshControl } from 'react-native';
import UiOrientation from '../UiOrientation';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { portraitStyles } from '../../Style/globleCss';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';


class WishList extends Component {
  state = {
    all_data: {},
    wish_list: [],
    message: '',
    refreshing:false,
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {

    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })

      // console.warn(this.state.data)
    }
    catch (error) {
      Alert.alert(error)
    }
    console.log(this.state.refreshing)
    await axios.get(this.state.data.url + "customwishlist/index&key=" + this.state.data.key + "&token=" + this.state.data.token).then((resp) => this.setState({ all_data: resp.data }))
    this.setState({ refreshing: false });
    if (this.state.all_data.status == 200) {
      this.setState({ wish_list: this.state.all_data.body });
    }
    else {
      this.setState({ message: this.state.all_data.body })
    }
   
  }
  deleteCart = async (product_id) => {
    const d = {
      product_id: product_id
    }

    const header = {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }


    await axios.post(this.state.data.url + "customwishlist/delete&key=" + this.state.data.key + "&token=" + this.state.data.token + '&os_type=android', d, header).
      then((response) => {
        this.setState({ all_data: response.data }),

          showMessage({
            message: 'Product deleted successfully',
            duration: 4000,
            type: 'success',
            color: 'white',
            icon: props => <MaterialIcons name="done-outline" size={20} color={'white'} {...props} />,
            backgroundColor: 'green',
            titleStyle: { fontSize: 18 }
          })
      })
      if (this.state.all_data.status == 200) {
        this.setState({ wish_list: this.state.all_data.body });
      }
      else {
        this.setState({ message: this.state.all_data.body })
      }

  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getData(); 
    if (this.state.wish_list.length > 0) {
      this.setState({ refreshing: false });
  }
  }

  render() {
    console.log(this.state.refreshing)
    return (
      <SafeAreaView style={portraitStyles.screenBackgroundStackTab}>
        {this.state.all_data.status == undefined ? <View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View> :
          <ScrollView style={portraitStyles.container}
            refreshControl={<RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />}
          >
            <View>
              {this.state.all_data.status == 200 ?
                <View style={portraitStyles.warpProductContainer} >
                  {this.state.wish_list.map((item, j) => (
                    <View style={portraitStyles.cartProductContainer} key={j}>
                      <View style={portraitStyles.cartImageContainer} >
                        <Image style={portraitStyles.cartImage} source={{ uri: item.image }}></Image>
                      </View>
                      <View style={portraitStyles.contentContainer}>
                        <View style={portraitStyles.cartTextContainer}>
                          <Text style={portraitStyles.cartText}>{item.name}</Text>
                        </View>
                        <View style={portraitStyles.cartTextContainer}>
                          <Text style={portraitStyles.cartModelText}>Model: {item.model}</Text>
                        </View>
                        <View style={portraitStyles.cartTextContainer}>
                          <Text style={portraitStyles.cartText}>stock: {item.stock}</Text>
                        </View>
                        <View style={portraitStyles.incDecButtonContainer}>
                          <View style={portraitStyles.cartIncDecContainer}>
                            <Text style={portraitStyles.wishlistPriceText} >Unit Price: {item.price}</Text>
                          </View>
                          <TouchableOpacity activeOpacity={0.9} style={portraitStyles.refDelButton}>
                            <FontAwesome name="trash" size={30} color={'black'} onPress={() => this.deleteCart(item.product_id)} />
                          </TouchableOpacity>
                        </View>
                      </View>

                    </View>
                  ))}
                </View>
                :
                <View style={portraitStyles.headerMiddleTextContainer}>
                  <Text style={portraitStyles.headerText}>{this.state.message}</Text>
                </View>
              }

            </View>

          </ScrollView>
        }
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({})

export default WishList;

import React, { Component, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl,ImageBackground,TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from './LoadingComponent';
import { portraitStyles } from "../../Style/globleCss";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
// import withRouter from "./withRouter";

export default class MyOrders extends Component {

  constructor(props) {
    super(props)
    this.state = {
        users: [],
        currentPage: 0,
        isLoading: false,
        all_orders: [],
        all_data: {},
        message: '',
        refreshing: false
       
    }
}

componentDidMount(){
  this.getUsers();
}

onRefresh()
    {
        this.getUsers();    
    }
  
  async getUsers(){
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })
    }
    catch (error) {
      Alert.alert(error)
    }

    

    this.setState({currentPage:this.state.currentPage+1})
    this.setState({isLoading:true});
    await axios.get(this.state.data.url + "customorderlist/index&key=" + this.state.data.key + "&token=" + this.state.data.token+"&page="+this.state.currentPage)
      .then(res => {
       
        this.setState({all_data:res.data})
       
      });
      if (this.state.all_data.status == 200) {
      
        this.setState({users : this.state.users.concat(this.state.all_data.body)});
        
      }
      else {
        this.setState({ message: this.state.all_data.message })
      }
      setTimeout(() =>  this.setState({isLoading:false}),500)
  };

  renderItem = ({ item }) => {
    // console.log(item);
    return (
              <TouchableOpacity activeOpacity={0.9} style={portraitStyles.cartProductContainer} onPress={() => this.props.navigation.push('myorderprofile', { id: item.order_id })}  >
                <View style={portraitStyles.orderContainer} >
                  <Text style={{ color: 'black' }}>Order ID</Text>
                  <View >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>#{item.order_id}</Text>
                  </View>

                </View>
                <View style={portraitStyles.navParentContainer}>
                  <View style={portraitStyles.navContainer}>
                    <View style={portraitStyles.cartTextContainer}>
                      <Text style={portraitStyles.orderHeadingText}>
                        Customer: <Text style={portraitStyles.cartText}>{item.name} </Text>
                      </Text>
                    </View>
                    <View style={portraitStyles.cartTextContainer}>
                      <Text style={portraitStyles.orderHeadingText}>
                        No. of products: <Text style={portraitStyles.cartText}>{item.products}</Text>
                      </Text>
                    </View>
                    
                    <View style={portraitStyles.cartTextContainer}>
                      <Text style={portraitStyles.orderHeadingText}>Status:<Text style={{ color: 'green' }}> {item.status}</Text></Text>
                    </View>
                    <View style={portraitStyles.cartTextContainer}>
                      <Text style={portraitStyles.orderHeadingText}>
                        Date: <Text style={portraitStyles.cartText}>{item.date_added}</Text>
                      </Text>
                    </View>
                    <View style={portraitStyles.cartTextContainer}>
                      <Text style={portraitStyles.orderHeadingText}>
                        Total: <Text style={portraitStyles.cartText}>{item.total}</Text>
                      </Text>
                    </View>
                  </View>
                  <View>
                    <MaterialIcons name='navigate-next' color={'#6D6D6D'} size={35} />
                  </View>
                </View> 
              </TouchableOpacity>
    );
  };

  renderLoader () {
    return (
      this.state.isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };

render(){
  // console.log(this.state.users);
  return (
    <>
    <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover" > 
      {/* <StatusBar backgroundColor="#000" /> */}
      {/* <View style={portraitStyles.warpProductContainer}> */}
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
      {/* </View> */}
      </ImageBackground>
    </>
  );
};
}

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: "#777",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});


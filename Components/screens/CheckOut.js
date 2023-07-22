import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { View, Button, Text, TouchableOpacity, SafeAreaView,Image, Alert, ActivityIndicator } from 'react-native';
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from "@react-native-async-storage/async-storage";

class CheckOut extends Component {
  constructor(props) {
    super(props)
    this.webviewRef = null;
  }
  state = {
    recived_data: 10,
    recived_data2: "",
    data: {},
    token:{}
    
  }

  componentDidMount = async() =>{ 
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      this.setState({ data: parsed })

      let AsyncToken = await AsyncStorage.getItem('token');
      let parsed2 = JSON.parse(AsyncToken);
      this.setState({ token: parsed2 })

  }
  catch (error) {
      Alert.alert(error)
  }
 
  this.setState({webView: this.state.data.url+"checkout/customerLogin&token="+this.state.token.token}) 
  console.log("Checkout url=>", this.state.data.url+"checkout/customerLogin&token="+this.state.token.token)
  
 

  }
  start()
  {
    return(
      <View style={portraitStyles.loadingScreen}>
        <Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} />
      </View>
    )
  }
  render() {

    
    return (
      <>

          <WebView
            source={{ uri: this.state.webView }}
            renderLoading={()=>{return(<SafeAreaView style={portraitStyles.screenBackgroundStackTab}><View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View></SafeAreaView>)}}
            startInLoadingState
            onLoad={() => this.webviewRef.postMessage(this.state.recived_data + "")}
            onMessage={(event) => {
              this.setState({ recived_data: parseInt(event.nativeEvent.data, 10) })
              this.setState({ recived_data2: event.nativeEvent.data })
              

            }}
          
            // source={{ uri: 'https://demo.craftslane.com/index.php?route=api/checkout/customerLogin&token=Jh2MfMC2OIOd0xiK0V3cJT7nd1HqDury' }}
            
            ref={ref => this.webviewRef = ref}
          />
       

      </>
    )
  }
}
export default CheckOut;
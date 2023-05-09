import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { View, Button, Text, TouchableOpacity, SafeAreaView,Image, Alert, ActivityIndicator } from 'react-native';
import { portraitStyles } from '../../Style/globleCss';

class CheckOut extends Component {
  constructor(props) {
    super(props)
    this.webviewRef = null;
  }
  state = {
    recived_data: 10,
    recived_data2: "",
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
        {/* {this.state.recived_data2 == "" ? <View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View> : */}
          <WebView
            // onScroll={()=> Alert.alert('zkdahkhd')}
            // onLoadProgress={()=>alert('ajs')}
            
            renderLoading={()=>{return(<SafeAreaView style={portraitStyles.screenBackgroundStackTab}><View style={portraitStyles.loadingScreen}><Image source={require('../../assets/loader-main-small.gif')} style={portraitStyles.cartImage} /></View></SafeAreaView>)}}
            startInLoadingState
            onLoad={() => this.webviewRef.postMessage(this.state.recived_data + "")}
            onMessage={(event) => {
              this.setState({ recived_data: parseInt(event.nativeEvent.data, 10) })
              this.setState({ recived_data2: event.nativeEvent.data })
              console.log(event.nativeEvent);

            }}
            source={{ uri: 'https://demo.craftslane.com/index.php?route=api/checkout/customerLogin&token=m4C8bWOY0USm9JPhwpngjeTkxXssp6Il' }}
            ref={ref => this.webviewRef = ref}
          />
        {/* } */}
        {/* <View style={{flexDirection:'row',display:'flex',height:60}}>
          <Text style={{color:'black',fontSize:20,width:'50%',backgroundColor:'lightgreen'}} >{this.state.recived_data}</Text>
          <TouchableOpacity style={{width:'50%',height:60}} onPress={()=> this.props.navigation.navigate('placeorder',{ item: this.state.recived_data })}><Text style={{color:'black',fontSize:20,width:'100%',height:60,backgroundColor:'skyblue',textAlign:'center',textAlignVertical:'center'}} >Place Order</Text></TouchableOpacity>
        </View> */}

      </>
    )
  }
}
export default CheckOut;
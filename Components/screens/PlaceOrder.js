

import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { View, Button,Text, TouchableOpacity } from 'react-native';

class PlaceOrder extends Component {
  constructor(props) {
    super(props)
    this.webviewRef = null; 
  }
  
  state = {
    data:''
  }
  componentDidMount(){
    const { item} = this.props.route.params;
    this.webviewRef.postMessage(item+"");
  }
  
  render() {
    const { item} = this.props.route.params;
    
    return (
      <>
        {/* <View>
          <Button
            title="Press me"
            onPress={() => {
              this.webviewRef.postMessage(item+"");
            }}
          />
        </View> */}
        
        <WebView
          onLoadStart={() => this.webviewRef.postMessage(item+"") }
          onMessage={ (event) => {
            console.log(event.nativeEvent);
            
          }}
          
          source={{ uri: 'https://echoit.in/craftslane-apis/placeorder.php' }}
          ref={ref => this.webviewRef = ref}
        
        />
        <Text style={{color:'black',fontSize:20}}>{this.state.recived_data}</Text>
      </>
    )
  }
}
export default PlaceOrder;



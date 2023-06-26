import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { portraitStyles } from '../../Style/globleCss';
import axios from 'axios';

export default class LogOut extends Component {

   state = { animating: true }
   
   closeActivityIndicator = async () => {


    setTimeout(() => this.setState({
      animating: false }), 2000)

      try {
         let user = await AsyncStorage.getItem('user');
         let parsed = JSON.parse(user);
         this.setState({ data: parsed })

         // console.warn(this.state.data)
     }
     catch (error) {
         Alert.alert(error)
     }
     await axios.get(this.state.data.url+"customlogout/index&key="+this.state.data.key+'&token='+this.state.data.token).then((resp)=>(this.setState({response_data:resp.data}))).catch((erro)=>console.warn(erro))


        await AsyncStorage.removeItem('token');  
        return this.props.navigation.jumpTo('Home');
  
   
  }



   componentDidMount = () => {
    this.focusSubscription = this.props.navigation.addListener('focus', () => {
      this.closeActivityIndicator();

    });
   }


  
   render() {
      const animating = this.state.animating
      
      return (
        
         <View style = {portraitStyles.screenBackgroundStackTab}>
   
            <ActivityIndicator
               animating = {animating}
               color = '#B48D56'
               size = "large"
               style = {portraitStyles.activityIndicator}/>
         </View>
      )
   }
}



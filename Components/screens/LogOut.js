import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { portraitStyles } from '../../Style/globleCss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenAvailability } from '../../Components/redux/Actions';
import { addItemToCart } from '../../Components/redux/Actions';
import { addItemToWishlist } from '../../Components/redux/Actions';

const LogOut = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
//   const [response_data, setResponseData] = useState({});

  const closeActivityIndicator = async () => {
    setTimeout(() => setAnimating(false), 2000);

   let parsed = {}
   let parse = {}

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);

      let token = await AsyncStorage.getItem('token');
      parse = JSON.parse(user);

      // setData(parsed);
    } catch (error) {
      console.warn(error);
    }

    console.log(parsed.url+ "customlogout/index&key="+parsed.key+"&token="+parse.token)
    await axios.get(parsed.url+ "customlogout/index&key="+parsed.key+"&token="+parse.token)

    await AsyncStorage.removeItem('token');
    dispatch(addItemToWishlist(0));
    dispatch(addItemToCart(0));
    dispatch(setTokenAvailability(false));
   //  console.log("Token deleted");
    // navigation.jumpTo('Home');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  useEffect(() => {
    
      closeActivityIndicator();
   
  }, []);

  return (
    <View style={portraitStyles.screenBackgroundStackTab}>
      <ActivityIndicator
        animating={animating}
        color="#B48D56"
        size="large"
        style={portraitStyles.activityIndicator}
      />
    </View>
  );
};

export default LogOut;

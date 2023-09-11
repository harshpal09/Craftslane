import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import Main from './Components/Main';
import { Provider } from 'react-redux';
import { myStore } from './Components/redux/Store';
import axios from 'axios';
import { addItemToWishlist } from './Components/redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './Components/redux/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {


  useEffect(() => {
    setUser();

  }, [])

  setUser = () => {
    let user = {
      key: 'Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q',
      url: 'https://www.craftslane.com?route=api/',
    }
    AsyncStorage.setItem('user', JSON.stringify(user));
  }



  return (
    <Provider store={myStore}>
      <AppWrapper />
    </Provider>
  );
}


const AppWrapper = () => {
  const dispatch = useDispatch();
  let tokenAvailable = useSelector(
    (state) => state.tokenAvailable
  );
  // console.log("App.js main1 token check=>",tokenAvailable)
  // useEffect(() => {
  //   console.log("App.js useeffect token check=>",tokenAvailable)
  //   getdata();
  // }, [])

  setTimeout(() => { SplashScreen.hide();
    getdata();
  }, 500)

  

  // console.log("App.js main2 token check=>",tokenAvailable)

  getdata = async () => {
    // console.log("App.js 1 token check=>",tokenAvailable)

    let parsed = {};
    let parsed2 = {};

    try {
      let user = await AsyncStorage.getItem('user');
      parsed = JSON.parse(user);
      let token = await AsyncStorage.getItem('token');
      parsed2 = JSON.parse(token);

    }

    catch (error) {
      Alert.alert(error)
    }

    if (tokenAvailable) {

      await axios.get(parsed.url + "customwishlist/index&key=" + parsed.key + "&token=" + parsed2.token).then((resp) => {
        
        dispatch(addItemToWishlist(resp.data.total));
      })

      await axios.get(parsed.url + "customcart/products&key=" + parsed.key + '&token=' + parsed2.token + '&os_type=android')
        .then((resp2) => {
          dispatch(addItemToCart(resp2.data.total_products))
        }).catch(function (error) {
          console.log("post error: " + error);
        });


      }else{
        dispatch(addItemToWishlist(0));
        dispatch(addItemToCart(0));
      }

    }
    return (
      <Main />
    )
  }


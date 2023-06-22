// import axios from 'axios';
// import React, { Component } from 'react';
// import {View,Text,Image,StyleSheet, ImageBackground,Dimensions} from 'react-native';
// import AppIntroSlider from 'react-native-app-intro-slider';
// // import { Icon } from 'react-native-vector-icons/icon';
// import { LogInPage } from '../../export';
// import { portraitStyles } from '../../Style/globleCss';
// // import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SplashScreen from 'react-native-splash-screen';
// // import SplashScreen from 'react-native-splash-screen';

// export default class IntroSlider extends Component {
//   constructor(props) {
//     console.log("cunstructor");
//     super(props);
//     this.state = {
//       data: {},
//       item: [],
//       item_1: undefined,
//       item_2: undefined,
//       item_3: undefined,
//     }

//   }


//   componentDidMount() {
//     console.log("componentDidMount")
//     this.getImage();
//   }





//   onSkip = async () => {

//     let user = await AsyncStorage.getItem('user');
//     let parsed = JSON.parse(user);
//     this.setState({ data: parsed })


//     console.warn(this.state.data);


//     if (this.state.data == null) {
//       return this.props.navigation.replace('login')
//     }
//     else {
//       return this.props.navigation.replace('Tab')
//     }
//   }

//   getImage = async () => {
//     console.log("getImage")
//     let resp = await axios.get('https://www.craftslane.com?route=api/customslideshow/index&key=Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q')
//     this.setState({ item_1: resp.data.url_1 })
//     this.setState({ item_2: resp.data.url_2 })
//     this.setState({ item_3: resp.data.url_3 })

//     setTimeout(() => {SplashScreen.hide()}, 2000)


//   }
//   _renderItem = ({ item }) => {
//     console.log("renderItem");
//     return (
//         <ImageBackground source={{ uri: item.image }} style={portraitStyles.IntroSliderContainer}></ImageBackground>
//     );
//   }
//     render() {
//       const value = [
//         {
//           image: this.state.item_1,
//         },     
//         {
//           image: this.state.item_2,
//         },
//         {
//           image: this.state.item_3,
//         }
//       ];
//       console.log("render =>");

//       return(
//             <>
//             {console.log("return =>")}
//             <AppIntroSlider renderItem={this._renderItem} data={value} onDone={()=> this.onSkip()} onSkip={()=> this.onSkip()} showSkipButton={true}/>
//             </>
//         )
//       }
//     }


// import axios from 'axios';
// import React, { Component,useState,useEffect } from 'react';
// import { View, Text, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native';
// import AppIntroSlider from 'react-native-app-intro-slider';
// // import { Icon } from 'react-native-vector-icons/icon';
// import { LogInPage } from '../../export';
// import { portraitStyles } from '../../Style/globleCss';
// // import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SplashScreen from 'react-native-splash-screen';
// // import SplashScreen from 'react-native-splash-screen';

// const IntroSlider = ({navigation}) => {

//   console.log("function");
//   const [data, setData] = useState({});
//   // const [item, setItem] = useState([]);
//   const [item_1, setItem_1] = useState(undefined);
//   const [item_2, setItem_2] = useState(undefined);
//   const [item_3, setItem_3] = useState(undefined);

//   useEffect(() => {
//     console.log("useEffect = >")
//     getImage();
//   }, []);

//   const value = [];

//   getImage = async () => {
//     console.log("getImage")
//     let resp = await axios.get('https://www.craftslane.com?route=api/customslideshow/index&key=Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q')
//     setItem_1(resp.data.url_1);
//     setItem_2(resp.data.url_2);
//     setItem_3(resp.data.url_3);
//     // console.log(resp.data);

//     setTimeout(() => { SplashScreen.hide() }, 2000)

//   }
//   onSkip = async () => {

//     let user = await AsyncStorage.getItem('user');
//     let parsed = JSON.parse(user);
//       // this.setState({ data: parsed })
//     setData(parsed);

//     console.warn(data);


//     if (data == null) {
//       return navigation.replace('login')
//     }
//     else {
//       return navigation.replace('Tab')
//     }
//   }
//     _renderItem = ({ item }) => {
//       console.log("renderItem == >",item)
//     return (
//         <ImageBackground source={{ uri: item.image }} style={portraitStyles.IntroSliderContainer}></ImageBackground>
//     );
//   }

//   item = [
//     {
//       image: item_1,
//     },     
//     {
//       image: item_2,
//     },
//     {
//       image: item_3,
//     }
//   ];
//   console.log("function bottom ->",item );
//   return (
//     <View>
//       {console.log("return === ")}
//       <AppIntroSlider renderItem={_renderItem} data={item} onDone={()=> onSkip()} onSkip={()=> onSkip()} showSkipButton={true}/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({})

// export default IntroSlider;



// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code
import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { LogInPage } from '../../export';
import { portraitStyles } from '../../Style/globleCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch,useSelector} from 'react-redux';

const IntroSlider = ({navigation}) => {
  const [showRealApp, setShowRealApp] = useState(false);
  const [data, setData] = useState({});
  const [item_1, setItem_1] = useState(undefined);
  const [item_2, setItem_2] = useState(undefined);
  const [item_3, setItem_3] = useState(undefined);

  useEffect(() => {
    getImage();
  }, []);


  getImage = async () => {
    let resp = await axios.get('https://www.craftslane.com?route=api/customslideshow/index&key=Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q')
    setItem_1(resp.data.url_1);
    setItem_2(resp.data.url_2);
    setItem_3(resp.data.url_3);

    setTimeout(() => { SplashScreen.hide() }, 2000)
  }

  const onSkip = async () => {
    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    setData(parsed);

    // console.log("data = > ",parsed);

    if (parsed == null) {
      return navigation.replace('login')
    }
    else {
      return navigation.replace('Tab')
    }
  }

  const RenderItem = ({ item }) => {
    return (
      <Image
        style={portraitStyles.IntroSliderContainer}
        source={item.image} />
    );
  };
  const slides = [
    {
      image: {
        uri: item_1,
      },
    },
    {
      image: {
        uri: item_2,
      },
    },
    {
      image: {
        uri: item_3,
      },
    },
  ];

  return (
    <>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={() => onSkip()}
        showSkipButton={true}
        onSkip={() => onSkip()}
      />
    </>
  );
};

export default IntroSlider;


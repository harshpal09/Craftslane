import axios from 'axios';
import React, { Component } from 'react';
import {View,Text,Image,StyleSheet, ImageBackground,Dimensions} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
// import { Icon } from 'react-native-vector-icons/icon';
import { LogInPage } from '../../export';
import { portraitStyles } from '../../Style/globleCss';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class IntroSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      item: [],
      item_1: undefined,
      item_2: undefined,
      item_3: undefined,
    }

  }

  componentDidMount() {
    this.getImage();
  }

  onSkip = async () => {

    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    this.setState({ data: parsed })

    console.warn(parsed);

    if (this.state.data == null) {
      return this.props.navigation.replace('login')
    }
    else {
      return this.props.navigation.replace('Tab')
    }
  }

  getImage = async () => {

    let resp = await axios.get('https://demo.craftslane.com/index.php?route=api/customslideshow/index&key=Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q')
    this.setState({ item_1: resp.data.url_1 })
    this.setState({ item_2: resp.data.url_2 })
    this.setState({ item_3: resp.data.url_3 })
  }
  _renderItem = ({ item }) => {

    return (
        <ImageBackground source={{ uri: item.image }} style={portraitStyles.IntroSliderContainer}></ImageBackground>
    );
  }
    render() {
      const item = [
        {
          image: this.state.item_1,
        },     
        {
          image: this.state.item_2,
        },
        {
          image: this.state.item_3,
        }
      ];
      
      return(
            <AppIntroSlider renderItem={this._renderItem} data={item} onDone={()=> this.onSkip()} onSkip={()=> this.onSkip()} showSkipButton={true}/>
        )
      }
    }




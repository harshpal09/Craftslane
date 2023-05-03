import { ImagePickerIOS, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { portraitStyles } from '../../Style/globleCss'
import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list'
import { launchCamera } from 'react-native-image-picker';
import UiOrientation from '../UiOrientation'

import WebView from 'react-native-webview'






export default class NewProduct extends UiOrientation {
  constructor() {
    super();
    this.state = {
      img_data: [],
      flag: undefined,
    }
  }

  selected(id) {
    this.state = {
      select: 0,
    }
    this.setState({ select: id })
    // console.warn(id);
  }
  item_render = ({ }) => {
    return (
      <View>
        <Text>{items.value}</Text>
      </View>
    )
  }
  async addProduct() {
    const data = new FormData();
    data.append('fileToUpload', {
      uri: image.path,
      type: 'image/jpeg', // or photo.type
      name: 'avatar_' + USERINF.userId,
      user_id: USERINF.userId
    });
  }
  launchCamera(res) {

  }



  async onSelectImage() {

    

   



    

  }





  render() {
    // console.warn(this.state.img_data)
    return (
      <WebView source={{uri:'https://staging.shivikaspottery.com/index.php?route=api/addproduct/index&token=C9nDY3XzYR07b5oapUlgYpigq1mYjxMO'}} />
    )
  }
}
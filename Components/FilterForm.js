import { Text, View, TextInput,StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { portraitStyles } from '../Style/globleCss'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign'

export default class FilterForm extends Component {

    state = {
        category: [],
        isFocus:false,
        isTraySelect:false,
        cat_id:0,
        product:""
    };

    componentDidMount(){
        this.categoryArray();
        
    }

   searchProduct = async() => {
    const navigation = useNavigation(); 
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed })

        }
        catch (error) {
            Alert.alert(error)
        }

        let res = await axios.get(this.state.data.url + "customadvsearch/index&key=" + this.state.data.key + "&token=" + this.state.data.token+"&category_id="+this.state.cat_id+"&title="+this.state.product);
        // console.log(this.state.data.url + "customadvsearch/index&key=" + this.state.data.key + "&token=" + this.state.data.token+"&category_id="+this.state.cat_id+"&title="+this.state.product);
        
        return navigation.navigate('results')
             
    }

    async categoryArray() {
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed })

        }
        catch (error) {
            Alert.alert(error)
        }

        let res = await axios.get(this.state.data.url + "customcateautosuggestion/index&key=" + this.state.data.key + "&token=" + this.state.data.token);
        // console.log(this.state.data.url + "customcateautosuggestion/index&key=" + this.state.data.key + "&token=" + this.state.data.token);
        this.setState({ category: res.data.body })
        // console.log(this.state.category)
    }

    render() {
        return (
            <SafeAreaView style={portraitStyles.screenBackground}>
                <View style={portraitStyles.filterFormInput}>
                    <TextInput style={portraitStyles.input} placeholder="Product Title" placeholderTextColor={'grey'} onChangeText={(text) => this.setState({ product: text })} />
                </View>
                
                <View style={{ padding: 10 }}>
                 
                  <Dropdown
                    style={[styles.dropdown, this.state.isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={this.state.category}
                    search
                    itemTextStyle={{color:'black'}}
                    maxHeight={300}
                    labelField="name"
                    valueField="category_id"
                    
                    // itemContainerStyle={{backgroundColor:'grey'}}
                    placeholder={!this.state.isFocus ? 'Select category' : '...'}
                    searchPlaceholder="Search..."
                    // value={value}
                    onFocus={() => this.setState({isfocus:true})}
                    onBlur={() => this.setState({isfocus:false})}
                    onChange={item => {
                    //   this.setState({index:item.id,showDesign:true});
                    this.setState({cat_id:item.category_id})
                      this.setState({isfocus:false});
                    }}
                    renderLeftIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color={this.state.isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                      />
                    )}
                  />
                </View>

                <TouchableOpacity onPress={()=> this.searchProduct(this.state.cat_id)} activeOpacity={0.9} style={portraitStyles.logoutButtonContainer}>
                    <View style={portraitStyles.button} >
                        <Text style={portraitStyles.buttonText}>Search</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>

        )
    }

    
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      width:'90%',
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginTop: 10,
      color:'black',
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
      color:"black"
    },
    placeholderStyle: {
      fontSize: 16,
      color:"black"
    },
    selectedTextStyle: {
      fontSize: 16,
      // backgroundColor:"red",
      color:"black"
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color:"black"
    },
  });
import React, { Component } from 'react';
import {View, StyleSheet,Dimensions} from 'react-native';
import { portraitStyles,landscapeStyles } from '../Style/globleCss';
import ApiCall from './ApiCall';
class UiOrientation extends ApiCall {
    // constructor() {
    //     super();
    //     this.state = {
    //       screen: Dimensions.get('window'),
    //     };
    //   }
    
      getOrientation(){
        if (this.state.screen.width > this.state.screen.height) {
            
          return 'LANDSCAPE';
        }else {
            
          return 'PORTRAIT';
        }
      }
    
      getStyle(){
        // if (this.getOrientation() === 'PORTRAIT') {
        //   return landscapeStyles;
        // } else {
          return portraitStyles;
        // }

      }
      onLayout(){
        this.setState({screen: Dimensions.get('window')});
      }
    render() {
      console.warn(this.state.url);
        return (
            <View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default UiOrientation;

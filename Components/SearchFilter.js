import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { FlatList } from 'react-native-gesture-handler'

const SearchFilter =({data,input}) => {
  
    return (
      <View style={{marginLeft:30}} >
        <FlatList data={data} renderItem={({item})=>{
        if(input === ""){
            return(
                <View style={{margin:0}}></View>
            )
        }

        if(item.name.toLowerCase().includes(input.toLowerCase())){
            
            return(
                <View style={{padding:1}}>
                    <View style={{marginVertical: 10}}>
                        <Text style={{fontWeight:'bold',fontSize: 14}}>{item.name}</Text>
                    </View>
                </View>
                
            )
           
        }
    }
    } />
      </View>
    )
  
}

export default SearchFilter;
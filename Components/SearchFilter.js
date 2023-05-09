import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


const SearchFilter = ({ data, input,navigation}) => {

    return (

        <View style={{ borderRadius:15,  height: input ? 150 : 0 }} >
            <FlatList data={data} renderItem={({ item }) => {
                if (input === "") {
                    return (
                        <View style={{ margin: 0 }}></View>
                    )
                }

                if (item.name.toLowerCase().includes(input.toLowerCase())) {

                    return (
                        <View style={{ borderRadius: 15}}>
                            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('categories')}>
                                <Text style={{ fontSize: 13 }}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>

                    )
                }
            }
            }
            showsVerticalScrollIndicator={false}
            />
        </View>
    )

}
const styles = StyleSheet.create({
    box: {
        padding: 5,
        borderBottomWidth:1,

    }
})

export default SearchFilter;
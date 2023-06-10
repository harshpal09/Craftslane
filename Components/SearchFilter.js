import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


const SearchFilter = ({ data, input }) => {
    const navigation = useNavigation();
    return (

        <View style={{ borderRadius: 15, height: input ? 150 : 0 }} >
            <FlatList data={data} renderItem={({ item }) => {
                if (input === "") {
                    return (
                        <View style={{ margin: 0 }}></View>
                    )
                }


                if (item.name.toLowerCase().includes(input.toLowerCase())) {

                    return (
                        <View style={{ borderRadius: 15 }}>
                            <TouchableOpacity style={styles.box} onPress={() => item.parent_id == 0?navigation.navigate('categories',{ item_id: item.category_id}): navigation.navigate('product', { item_id: item.category_id})}>
                                <Text style={{ fontSize: 16, fontFamily: 'Baskervville-Regular', color:'black' }}>{item.name}</Text>
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
        borderBottomWidth: 1,
        backgroundColor: '#F2F3F2',
        borderBottomColor: 'lightgre'
        // margin:5

    }
})

export default SearchFilter;
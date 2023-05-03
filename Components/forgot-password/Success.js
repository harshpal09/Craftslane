import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView ,Text,TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { portraitStyles } from '../../Style/globleCss';
class Success extends Component {
    render() {
        return (
            <SafeAreaView style={portraitStyles.screenBackground}>
                <ScrollView style={portraitStyles.container}>
                    <View style={portraitStyles.icon}>
                        <MaterialCommunityIcons name="check-decagram-outline" color={'#B48D56'} size={150} />
                    </View>
                    <View style={portraitStyles.text}>
                        <Text style={portraitStyles.cartText}>  An email with a password reset link has been sent to your email address.    </Text>
                    </View>
                    <View style={portraitStyles.buttonContainer}>
                        <TouchableOpacity style={portraitStyles.button} onPress={() => navigation.navigate('')}>
                            <Text style={portraitStyles.buttonText} >Go to LoginPage</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({})

export default Success;

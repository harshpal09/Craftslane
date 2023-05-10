import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView ,Text,TouchableOpacity,ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { portraitStyles } from '../../Style/globleCss';
class Success extends Component {
    render() {
        return (
            <SafeAreaView style={portraitStyles.screenBackground}>
                <ImageBackground source={require('../../assets/base-texture.png')} resizeMode="cover"  >
                <ScrollView style={portraitStyles.container} showsVerticalScrollIndicator={false}>
                    <View style={portraitStyles.icon}>
                        <MaterialCommunityIcons name="check-decagram-outline" color={'#B48D56'} size={150} />
                    </View>
                    <View style={portraitStyles.welcomeContainer}>
                        <Text style={portraitStyles.text}>  An email with a password reset link has been sent to your email address.    </Text>
                    </View>
                    <View style={portraitStyles.buttonContainer}>
                        <TouchableOpacity style={portraitStyles.button} onPress={() => this.props.navigation.navigate('login')}>
                            <Text style={portraitStyles.buttonText} >Go to LoginPage</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                </ImageBackground>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({})

export default Success;

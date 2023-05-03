import React, { Component } from 'react';
import { View, Text, StyleSheet,Button} from 'react-native';

// import Tips from 'react-native-root-tip
import { showMessage, hideMessage } from 'react-native-flash-message';
// import { useNetInfo } from '@react-native-community/netinfo';
// const netInfo = useNetInfo();

class FavouriteScreen extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Button
                    onPress={() => 
                        showMessage({
                            message: "Hello World",
                            description: "This is our custom icon message",
                            // icon: props => <Image source={require("../assets/YOUR-CUSTOM-ICON.png")} {...props} />,
                            type: "success",
                          })
                    }
                    title="Request Details"
                    color="#841584"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('logout') }
                    title="Request Details"
                    color="#841584"
                />
                {/* <Button
                    onPress={() => 
                        
                        this.props.navigation.navigate("np")
                    }
                    title="new product"
                    color="#841584"
                /> */}
               
                {/* <Button
                    onPress={() => 
                        this.props.navigation.navigate("np")
                    }
                    title="new product"
                    color="#841584"
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({})

export default FavouriteScreen;

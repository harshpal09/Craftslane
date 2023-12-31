import React, { Component } from 'react';
import { SafeAreaView, Text ,Alert} from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'

export default class UseNet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      netInfo: undefined,
      temp: 1,
    }
    // console.log("constructor=> ",this.state.temp);
  }

  setNetInfo = netInfo => {
    // this.setState({temp:this.state.temp+1})
    this.setState({ netInfo })
    // console.log("setNetInfo() in class => ",netInfo);
  }
  myfunction()
  {
    // console.log("myfunction() in class => ",this.state.netInfo);
      if(this.state.netInfo == false)
      {
          Alert.alert(
              'No Internet !',
              'Your internet does not seems to work',
              [
                  { text: "Try again", onPress: () => this.myfunction() }
              ],
              { cancelable: false }
          )
      }
  }


  render() {
    // console.log("render => ",this.state.netInfo);
    return (
      <SafeAreaView>
        <SetNetInfo setNetInfo={this.setNetInfo} />
        {this.state.netInfo == null || this.state.netInfo == true ? null: Alert.alert(
                    'No Internet !',
                    'Your internet does not seems to work',
                    [
                        { text: "Try again", onPress: () => this.myfunction() }
                    ],
                    { cancelable: false }
        )}
      </SafeAreaView>
    )
  }

}

const SetNetInfo = ({ setNetInfo }) => {
  const netInfo = useNetInfo()
  // console.log("functional comp start ")
  React.useEffect(() => {
      setNetInfo(netInfo.isConnected)
      // console.log("functional comp 2 => ",netInfo.isConnected);
      // console.log("functional comp 3 => ",netInfo);
  },[netInfo])

  return null
}

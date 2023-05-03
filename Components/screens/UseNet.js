import React, { Component } from 'react';
import { SafeAreaView, Text ,Alert} from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'

export default class UseNet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      netInfo: undefined
    }
  }

  setNetInfo = netInfo => {
    this.setState({ netInfo })
  }
  myfunction()
  {
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
    // console.warn(this.state.netInfo)
   


   
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

  React.useEffect(() => {
      setNetInfo(netInfo.isConnected)
  },[netInfo])

  return null
}

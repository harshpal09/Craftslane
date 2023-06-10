import messaging, { firebase } from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    // await messaging().registerDeviceForRemoteMessages()

    getFcmToken();
  }
}

const getFcmToken = async() =>{
    try{
      
        const fcmToken = await messaging().getToken()
        console.log("fcm token generated" , fcmToken)
    }
    catch(error){
        console.log("Error in fcm token" , error)
        alert(error?.message)
    }
}
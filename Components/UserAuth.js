// import { Button, Text, View } from "react-native";
// import React, { useState } from 'react'
// import Modal from "react-native-modal";

// export default function UserAuth() {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Button title="Show modal" onPress={toggleModal} />

//       <Modal isVisible={true}
//        onBackdropPress={() => setModalVisible(false)}
//        style={{width: '100%', marginLeft:0, marginBottom:0}}
//        >
//         <View style={{ flex: 1,
//          backgroundColor: 'red',
//          height: 300,
//           position: 'absolute',
//          bottom: 0,
//          right:0,
//          left:0,
//           width: '100%'}}>
//           <Text>Hello!</Text>

//           <Button title="Hide modal" onPress={toggleModal} />
//         </View>
//       </Modal>
//     </View>
//   );
// }


import React, { useEffect, useState } from 'react';
import { View, AsyncStorage, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUserAuth, setShowUserAuth] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setShowUserAuth(true);
    }
  };

  const handleSignIn = () => {
    // Navigate to the login screen
  };

  const handleCreateAccount = () => {
    // Navigate to the sign up screen
  };

  const handleCloseUserAuth = () => {
    setShowUserAuth(false);
  };

  return (
    <View style={styles.container}>
      {/* Your main app content */}
      
      {/* UserAuth Modal */}
      <Modal visible={showUserAuth} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseUserAuth}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Hi, please sign in or create an account to continue.</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Your main app container styles
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signInButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  createAccountButton: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;


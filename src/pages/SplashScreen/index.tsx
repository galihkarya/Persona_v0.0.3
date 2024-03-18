import React, { useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Splash({ navigation }) {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token === 'boleh masuk') {
          navigation.replace('HomePageLoggedIn');
        } else {
          navigation.replace('HomePage');
        }
      } catch (error) {
        console.log('Error retrieving token from AsyncStorage:', error);
        navigation.replace('HomePage');
      }
    };
    setTimeout(checkToken, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../../../assets/images/logo.png')}
      />
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tinyLogo: {
    height: 94,
    resizeMode: 'contain'
  },
})

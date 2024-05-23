import React, {useEffect} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Splash({navigation}: any) {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const getToken = await AsyncStorage.getItem('userData');
        const token = getToken ? JSON.parse(getToken).app_token : null;
        if (token == null) {
          navigation.replace('HomePage');
        } else {
          navigation.replace('Tabs');
        }
      } catch (error) {
        console.log('Error retrieving token from AsyncStorage:', error);
        navigation.replace('HomePage');
      }
    };
    setTimeout(checkToken, 1000);
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
    justifyContent: 'center',
  },
  tinyLogo: {
    height: 94,
    resizeMode: 'contain',
  },
});

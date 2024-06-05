import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Appearance, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Splash({navigation}: any) {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

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

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  return (
    
    <View style={[Styles.container, theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1]}>
      <StatusBar barStyle={theme == 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme == 'light' ? Styles.containerLightTheme1.backgroundColor : Styles.containerDarkTheme1.backgroundColor}/>
      <Image
        style={Styles.tinyLogo}
        source={require('../../../assets/images/logo.png')}
      />
    </View>
  );
}

export default Splash;

const Styles = StyleSheet.create({
  containerLightTheme1: {
    backgroundColor: '#f0f0f0'
  }, 
  containerDarkTheme1: {
    backgroundColor: '#2d2d2d'
  }, 
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

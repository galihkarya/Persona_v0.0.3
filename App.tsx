import React from 'react';
import {
  StatusBar, 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router'

const App = ( ) => {
  return (
    <NavigationContainer>
      <StatusBar  barStyle={'dark-content'} backgroundColor={'#f2f2f2'}/>
      <Router/>
    </NavigationContainer>
  )
}

export default App;
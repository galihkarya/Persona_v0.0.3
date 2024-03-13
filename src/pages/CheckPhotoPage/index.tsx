import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const CheckPhotoPage = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <View style={{height: 80}} />
      <View style={Styles.viewFinder} />
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
          width: '100%',
          gap: 10,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#CC3663',
            marginHorizontal: 20,
            borderRadius: 15,
          }}
          onPress={() => {
            navigation.replace('ResultPage');
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
              paddingVertical: 15,
              fontSize: 14,
            }}>
            lanjut ...
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            marginHorizontal: 20,
            borderRadius: 15,
            borderColor: '#CC3663',
            borderWidth: 3,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#CC3663',
              paddingVertical: 15,
              fontSize: 14,
            }}>
            ulang foto
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  viewFinder: {
    backgroundColor: '#00b140',
    aspectRatio: 3 / 4,
  },
});

export default CheckPhotoPage;

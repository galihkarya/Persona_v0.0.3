import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ReminderPage = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        style={Styles.backButton}
        hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          style={Styles.backIcon}
          source={require('../assets/icons/icon_arrowLeft.png')}
        />
      </TouchableOpacity>
      <View style={{marginHorizontal: 20, alignItems: 'center'}}>
        <Text style={Styles.header}>Perhatian</Text>

        <Image
          source={require('../assets/icons/palm_in_square.png')}
          style={Styles.images}
        />
        <Text style={Styles.description}>
          Pastikan telapak tangan masuk semua ke dalam area kotak yang sudah
          ditentukan.
        </Text>
        <Image
          source={require('../assets/icons/leftpalm_selected.png')}
          style={Styles.images}
        />
        <Text style={Styles.description}>
          Telapak tangan yang digunakan untuk identifikasi kepribadian adalah
          tangan kiri
        </Text>
        <Image
          source={require('../assets/icons/focusing_on_palm.png')}
          style={Styles.images}
        />
        <Text style={Styles.description}>
          Pastikan gambar yang diambil sudah fokus sehingga garis telapak tangan
          terlihat sangat jelas
        </Text>
      </View>
      <TouchableOpacity
        style={Styles.button}
        onPress={() => {
          navigation.navigate('CameraPage');
        }}>
        <Text style={Styles.textButton}>lanjut ...</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  backIcon: {
    width: 20,
    height: 20,
  },
  backButton: {
    position: 'absolute',
    zIndex: 5,
    top: 30,
    left: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
    color: 'black',
  },
  images: {
    width: 120,
    height: 120,
  },
  description: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#CC3663',
    marginVertical: 25,
    marginHorizontal: 20, 
    verticalAlign: 'bottom',
    borderRadius: 15,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 16,
  },
});

export default ReminderPage;

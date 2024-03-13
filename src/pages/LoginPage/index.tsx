import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

const LoginPage = ({navigation}) => {
  return (
    <ScrollView>
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
      </View>
      <View style={{margin: 20}}>
        <View style={{alignItems: 'center', marginTop: 50, marginBottom: 50}}>
          <Text style={{fontWeight: '900', fontSize: 42, color: '#cc3663'}}>
            Selamat datang kembali,
          </Text>
          <Text style={{marginVertical: 30}}>
            Masukkan username dan password
          </Text>
        </View>

        <TextInput style={Styles.input} placeholder="username" />
        <TextInput
          style={Styles.input}
          secureTextEntry
          placeholder="password"
        />
        <TouchableOpacity style={Styles.button}>
          <Text style={Styles.textButton} onPress={() => {navigation.navigate('BottomNav')}}>Masuk</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Text>Belum punya akun? </Text>
          <TouchableOpacity hitSlop={{top: 5, bottom: 5, right: 5, left: 5}} onPress={() => {navigation.navigate('RegistName')}}>
            <Text style={{color: '#CC3663'}}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  backIcon: {
    width: 20,
    height: 20,
  },
  input: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#00000050',
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#CC3663',
    marginVertical: 25,
    verticalAlign: 'bottom',
    borderRadius: 15,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 30,
  },
});

export default LoginPage;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import api from '../../API/UserApi';

const LoginPage = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(true);

  let visibleicon = require('../../../assets/icons/visibleicon.png');
  let invisibleicon = require('../../../assets/icons/invisibleicon.png');

  const handleLogin = async () => {
    setIsLoading(true);

    await api
    .post('/api/v1/user/login', {email, password})
    .then(async ({ data }) => {
      console.log(data)
      await AsyncStorage.setItem('userData', JSON.stringify(data))
      navigation.replace('Tabs');
    })
    .catch(({ response }) => {
      console.log(response.data);
      ToastAndroid.show('email atau password salah', (ToastAndroid.LONG));
    });

    setIsLoading(false);
  };

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
            source={require('../../../assets/icons/icon_arrowLeft.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{margin: 20}}>
        <View style={{alignItems: 'center', marginTop: 50, marginBottom: 50}}>
          <Text style={{fontWeight: '900', fontSize: 42, color: '#cc3663'}}>
            Selamat datang kembali,
          </Text>
          <Text style={{marginVertical: 30}}>Masukkan email dan password</Text>
        </View>

        <TextInput
          style={Styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={Styles.input}>
          <TextInput
            secureTextEntry={passwordVisible}
            placeholder="password"
            style={{flex: 1}}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              style={Styles.visibleIcon}
              source={passwordVisible ? invisibleicon : visibleicon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            Styles.button,
            {opacity: email === '' || password === '' || isLoading == true ? 0.5 : 1},
          ]}
          disabled={email === '' || password === '' || isLoading == true}
          onPress={async () => {await handleLogin()}}>
          <Text style={Styles.textButton}>Masuk</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Text>Belum punya akun? </Text>
          <TouchableOpacity
            hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
            onPress={() => {
              navigation.navigate('RegistName');
            }}>
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
    flexDirection: 'row',
    alignItems: 'center',
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
  visibleIcon: {
    width: 22,
    height: 22,
  },
});

export default LoginPage;

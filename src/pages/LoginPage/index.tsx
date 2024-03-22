import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

const LoginPage = ({navigation}:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(true);

  let visibleicon = require('../../../assets/icons/visibleicon.png');
  let invisibleicon = require('../../../assets/icons/invisibleicon.png');

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
          <Text style={{marginVertical: 30}}>
            Masukkan username dan password
          </Text>
        </View>

        <TextInput
          style={Styles.input}
          placeholder="username"
          value={username}
          onChangeText={setUsername}
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
            {opacity: username === '' || password === '' ? 0.5 : 1},
          ]}
          disabled={username === '' || password === ''}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Tabs'}],
            });
          }}>
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

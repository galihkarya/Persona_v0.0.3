import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
  Appearance, 
} from 'react-native';
import api from '../../API/UserApi';

const LoginPage = ({navigation}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleLogin = async () => {
    setIsLoading(true);

    await api
      .post('/api/v1/user/login', {email, password})
      .then(async ({data}) => {
        console.log(data);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }]
        });
        
      })
      .catch(({response}) => {
        console.log(response.data);
        ToastAndroid.show('email atau password salah', ToastAndroid.LONG);
      });

    setIsLoading(false);
  };

  return (
      <ScrollView style={[theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1, {flex: 1}]}>
        <View>
          <TouchableOpacity
            style={Styles.backButton}
            hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={Styles.backIcon}
              source={ theme == 'light' ? require('../../../assets/icons/back_black.png') : require('../../../assets/icons/back_white.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{margin: 20}}>
          <View style={{alignItems: 'center', marginTop: 50, marginBottom: 50}}>
            <Text style={{fontWeight: '900', fontSize: 42, color: '#cc3663'}}>
              Selamat datang kembali,
            </Text>
            <Text style={[{marginVertical: 30}, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>
              Masukkan email dan password
            </Text>
          </View>

          <TextInput
            style={[Styles.input, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
            placeholderTextColor={theme == 'light' ? `${Styles.textLightTheme.color}50` : `${Styles.textDarkTheme.color}50`}
          />
          <View style={[Styles.input, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}>
            <TextInput
              secureTextEntry={passwordVisible}
              placeholder="password"
              style={{flex: 1}}
              value={password}
              onChangeText={setPassword}
              autoCapitalize='none'
              placeholderTextColor={theme == 'light' ? `${Styles.textLightTheme.color}50` : `${Styles.textDarkTheme.color}50`}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <Image
                style={Styles.visibleIcon}
                source={passwordVisible ? (theme == 'light' ? require('../../../assets/icons/invisible_black.png') : require('../../../assets/icons/invisible_white.png')) : (theme == 'light' ? require('../../../assets/icons/visible_black.png') : require('../../../assets/icons/visible_white.png'))}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              Styles.button,
              {
                opacity: email === '' || password === '' || isLoading == true ? 0.5 : 1,
              },
            ]}
            disabled={email === '' || password === '' || isLoading == true}
            onPress={async () => {
              await handleLogin();
            }}>
            <Text style={Styles.textButton}>Masuk</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme}>Belum punya akun? </Text>
            <TouchableOpacity
              hitSlop={5}
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
  containerLightTheme1: {
    backgroundColor: '#f0f0f0'
  }, 
  containerDarkTheme1: {
    backgroundColor: '#2d2d2d'
  }, 
  containerLightTheme2: {
    backgroundColor: '#fefefe'
  }, 
  containerDarkTheme2: {
    backgroundColor: '#3d3d3d'
  }, 
  textLightTheme: {
    color: '#2d2d2d'
  }, 
  textDarkTheme: {
    color: '#f0f0f0'
  },
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

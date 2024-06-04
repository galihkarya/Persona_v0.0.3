import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  ToastAndroid,
  Alert,
  Appearance, 
} from 'react-native';
import api from '../../API/UserApi';

const RegistAccount = ({navigation, route}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const {full_name, role, institute_name, institute_code, groupIdSelected, institute_id, group_name} = route.params;
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  console.log(full_name, role, institute_name, institute_code, groupIdSelected, institute_id, group_name);

  const [passwordVisible1, setPasswordVisible1] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  let visibleicon = require('../../../assets/icons/visibleicon.png');
  let invisibleicon = require('../../../assets/icons/invisibleicon.png');

  const validateEmail = (email:string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleRegistration = async () => {
    if (!validateEmail(email))
      ToastAndroid.show('Masukkan email yang valid', ToastAndroid.SHORT);
    else if (password.length < 8)
      ToastAndroid.show('Password minimal 8 karakter', 2000);
    else if (password !== rePassword)
      ToastAndroid.show('Password belum sama', 2000);
    else {
      setIsLoading(true);

      if (role === 'bk'){
        const registAPI = await api
        .post('/api/v1/user/bk', {full_name, email, password, institute_name})
        .then(async () => {
          ToastAndroid.show('Registrasi berhasil, silahkan login', 3000)
          navigation.replace('LoginPage');

        })
        .catch(response => {
          console.log(response);
          Alert.alert('Error', response);
        });
      }
      else if (role === 'wk'){
        const registAPI = await api
        .post('/api/v1/user/', {full_name, email, role, password, institute_code, group_id: groupIdSelected, institute_id, institute_name, group_name})
        .then(async () => {
          ToastAndroid.show('Registrasi berhasil, silahkan login', ToastAndroid.SHORT)
          navigation.replace('LoginPage');

        })
        .catch(response => {
          console.log(response);
          // Alert.alert('Error', response);
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={
      theme == 'light'
        ? Styles.containerLightTheme1
        : Styles.containerDarkTheme1
    }>
      <TouchableOpacity
        style={Styles.backButton}
        hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          style={Styles.backIcon}
          source={
            theme == 'light'
              ? require('../../../assets/icons/back_black.png')
              : require('../../../assets/icons/back_white.png')
          }
        />
      </TouchableOpacity>
      <View style={{marginTop: 0, marginBottom: 30, alignItems: 'center'}}>
        <Image
          style={Styles.imageCenter}
          source={require('../../../assets/images/account.png')}
        />
        <Text style={[Styles.head1, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Akun</Text>
        <Text style={[Styles.head2, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Masukkan email dan password yang bagus</Text>
      </View>

      <View style={{margin: 20}}>
        <View style={[Styles.input, theme == 'light'
              ? Styles.containerLightTheme2
              : Styles.containerDarkTheme2, ]}>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={setemail}
            autoCapitalize='none'
            style={[{flex:1}, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}
          />
        </View>

        <View style={[Styles.input, theme == 'light'
              ? Styles.containerLightTheme2
              : Styles.containerDarkTheme2]}>
          <TextInput
            secureTextEntry={passwordVisible1}
            placeholder="password"
            style={[{flex: 1}, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible1(!passwordVisible1)}>
            <Image
              style={Styles.visibleIcon}
              source={passwordVisible1 ? (theme == 'light' ? require('../../../assets/icons/invisible_black.png') : require('../../../assets/icons/invisible_white.png')) : (theme == 'light' ? require('../../../assets/icons/visible_black.png') : require('../../../assets/icons/visible_white.png'))}
            />
          </TouchableOpacity>
        </View>

        <View style={[Styles.input, theme == 'light'
              ? Styles.containerLightTheme2
              : Styles.containerDarkTheme2]}>
          <TextInput
            secureTextEntry={passwordVisible2}
            placeholder="ketik ulang password"
            style={[{flex: 1}, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}
            value={rePassword}
            onChangeText={setRePassword}
            autoCapitalize='none'
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible2(!passwordVisible2)}>
            <Image
              style={Styles.visibleIcon}
              source={passwordVisible2 ? (theme == 'light' ? require('../../../assets/icons/invisible_black.png') : require('../../../assets/icons/invisible_white.png')) : (theme == 'light' ? require('../../../assets/icons/visible_black.png') : require('../../../assets/icons/visible_white.png'))}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            Styles.button,
            {
              opacity:
                email === '' ||
                password === '' ||
                rePassword === '' ||
                isLoading == true
                  ? 0.5
                  : 1,
            },
          ]}
          onPress={handleRegistration}
          disabled={
            email === '' ||
            password === '' ||
            rePassword === '' ||
            isLoading == true
          }>
          <Text style={Styles.textButton}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  containerLightTheme1: {
    backgroundColor: '#f0f0f0',
  },
  containerDarkTheme1: {
    backgroundColor: '#2d2d2d',
  },
  containerLightTheme2: {
    backgroundColor: '#fefefe',
  },
  containerDarkTheme2: {
    backgroundColor: '#3d3d3d',
  },
  textLightTheme: {
    color: '#2d2d2d',
  },
  textDarkTheme: {
    color: '#f0f0f0',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: 30,
    marginHorizontal: 20,
  },
  imageCenter: {
    width: 200,
    height: 200,
  },
  head1: {
    fontWeight: '700',
    fontSize: 40,
    marginVertical: 20,
  },
  head2: {
    fontSize: 16,
    maxWidth: 200,
    textAlign: 'center',
  },
  input: {
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#00000050',
    paddingHorizontal: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
  visibleIcon: {
    width: 22,
    height: 22,
  },
});

export default RegistAccount;

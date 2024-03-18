import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

const RegistAccount = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [passwordVisible1, setPasswordVisible1] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);

  let visibleicon = require('../../../assets/icons/visibleicon.png');
  let invisibleicon = require('../../../assets/icons/invisibleicon.png');

  return (
    <ScrollView>
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
      <View style={{marginTop: 0, marginBottom: 30, alignItems: 'center'}}>
        <Image
          style={Styles.imageCenter}
          source={require('../../../assets/images/account.png')}
        />
        <Text style={Styles.head1}>Akun</Text>
        <Text style={Styles.head2}>
          Masukkan username dan password yang bagus
        </Text>
      </View>

      <View style={{margin: 20}}>
        <View style={Styles.input}>
          <TextInput
            placeholder="username"
            value={username}
            onChange={item => {
              setUsername(item.value);
            }}
          />
        </View>

        <View style={Styles.input}>
          <TextInput
            secureTextEntry={passwordVisible1}
            placeholder="password"
            style={{flex: 1}}
            value={password}
            onChange={item => {
              setPassword(item.value);
            }}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible1(!passwordVisible1)}>
            <Image
              style={Styles.visibleIcon}
              source={passwordVisible1 ? invisibleicon : visibleicon}
            />
          </TouchableOpacity>
        </View>

        <View style={Styles.input}>
          <TextInput
            secureTextEntry={passwordVisible2}
            placeholder="ketik ulang password"
            style={{flex: 1}}
            value={rePassword}
            onChange={item => {
              setRePassword(item.value);
            }}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible2(!passwordVisible2)}>
            <Image
              style={Styles.visibleIcon}
              source={passwordVisible2 ? invisibleicon : visibleicon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[Styles.button, {opacity: username === '' || password === '' || rePassword === '' ? 0.5 : 1} ]}
          onPress={() => {
            navigation.reset({
              index: 0, 
              routes: [{name: 'Tabs'}]
            })
          }}
          disabled={username === '' || password === '' || rePassword === ''}>
          <Text style={Styles.textButton}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
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
    color: 'black',
    marginVertical: 20,
  },
  head2: {
    fontSize: 16,
    maxWidth: 200,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fefefe',
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

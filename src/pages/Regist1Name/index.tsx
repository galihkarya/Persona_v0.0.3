import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Appearance,
} from 'react-native';

const RegistName = ({navigation}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const [full_name, set_full_name] = useState('');

  const onPressHandler = () => {
    navigation.navigate('RegistRole', {full_name});
  };

  return (
    <ScrollView
      style={
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
      <View style={{marginTop: 50, marginBottom: 30, alignItems: 'center'}}>
        <Image
          style={Styles.imageCenter}
          source={require('../../../assets/images/teacher.png')}
        />
        <Text
          style={[
            Styles.head1,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          Halo!
        </Text>
        <Text
          style={[
            Styles.head2,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          Masukkan nama lengkap
        </Text>
      </View>
      <View style={{margin: 20}}>
        <TextInput
          style={[
            Styles.input,
            theme == 'light'
              ? Styles.containerLightTheme2
              : Styles.containerDarkTheme2, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme
          ]}
          placeholderTextColor={
            theme == 'light'
              ? `${Styles.textLightTheme.color}50`
              : `${Styles.textDarkTheme.color}50`
          }
          placeholder="Nama Lengkap"
          onChangeText={val_name => set_full_name(val_name)}
          value={full_name}
        />
        <TouchableOpacity
          style={[Styles.button, {opacity: full_name === '' ? 0.5 : 1}]}
          onPress={onPressHandler}
          disabled={full_name === ''}>
          <Text style={Styles.textButton}>lanjut</Text>
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
    marginVertical: 30,
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
  },
  input: {
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
});

export default RegistName;

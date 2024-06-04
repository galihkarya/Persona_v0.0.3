import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = ({navigation}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const data = userData ? JSON.parse(userData) : ' ';

      console.log(await AsyncStorage.getItem('userData'));
      setUserData(data);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('HomePage');
    } catch (error) {
      console.log('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View
      style={[
        {flex: 1},
        theme == 'light'
          ? Styles.containerLightTheme1
          : Styles.containerDarkTheme1,
      ]}>
      {/* <Image
        source={require('../../../assets/images/pp.png')}
        style={Styles.profilePicture}
      /> */}
      <View style={{marginTop: 100, margin: 20, alignItems: 'center'}}>
        <Text
          style={[
            Styles.nameText,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          {userData?.full_name}
        </Text>
        <Text
          style={[
            Styles.roleText,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          {userData?.group_name == 'BK' ? 'Guru BK' : 'Wali kelas/Guru lainnya'}
        </Text>
        <Text
          style={[
            Styles.institutionText,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          {userData?.institute_name}
        </Text>
        <Text
          style={[
            Styles.codeText,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          Kode instansi: {userData?.institute_code}
        </Text>

        <TouchableOpacity style={Styles.button} onPress={handleLogout}>
          <Text style={Styles.textButton}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  containerLightTheme1: {
    backgroundColor: '#f0f0f0',
  },
  containerDarkTheme1: {
    backgroundColor: '#2d2d2d',
  },
  textLightTheme: {
    color: '#2d2d2d',
  },
  textDarkTheme: {
    color: '#f0f0f0',
  },
  profilePicture: {
    width: 150,
    height: 150,
    marginVertical: 20,
    alignSelf: 'center',
  },
  nameText: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 5,
  },
  roleText: {
    fontWeight: '400',
    fontSize: 14,
  },
  institutionText: {
    fontWeight: '600',
    fontSize: 14,
  },
  codeText: {
    fontWeight: '400',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#CC3663',
    borderRadius: 15,
    marginVertical: 40,
    width: '100%'
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 16,
  },
});

export default ProfilePage;

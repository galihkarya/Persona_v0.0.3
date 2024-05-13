import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfilePage = ({navigation}:any) => {
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
    <View style={{margin: 20}}>
      <Image
        source={require('../../../assets/images/pp.png')}
        style={Styles.profilePicture}
      />
      <View style={{margin: 20, alignItems: 'center'}}>
        <Text style={Styles.nameText}>{userData?.full_name}</Text>
        <Text style={Styles.roleText}>{userData?.group_name == 'BK' ? 'Guru BK' : 'Wali kelas/Guru lainnya'}</Text>
        <Text style={Styles.institutionText}>{userData?.institute_name}</Text>
        <Text style={Styles.codeText}>Kode instansi: {userData?.institute_code}</Text>
      </View>
      <TouchableOpacity
        style={Styles.button}
        onPress={handleLogout}>
        <Text style={Styles.textButton}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  profilePicture: {
    width: 150,
    height: 150,
    marginVertical: 20,
    alignSelf: 'center'
  },
  nameText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 5,
  },
  roleText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
  },
  institutionText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
  codeText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#CC3663',
    borderRadius: 15,
    marginVertical: 20, 
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 16,
  },
});

export default ProfilePage;

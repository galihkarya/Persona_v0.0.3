import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const ProfilePage = ({navigation}) => {
  return (
    <View style={{margin: 20}}>
      <Image
        source={require('../../../assets/images/pp.png')}
        style={Styles.profilePicture}
      />
      <View style={{margin: 20, alignItems: 'center'}}>
        <Text style={Styles.nameText}>Alifia Rahmadhani G. </Text>
        <Text style={Styles.roleText}>Guru BK</Text>
        <Text style={Styles.institutionText}>SDN Hoka Bento</Text>
        <Text style={Styles.codeText}>Kode instansi: 45IKB6T</Text>
      </View>
      <TouchableOpacity
        style={Styles.button}
        onPress={() => {
          navigation.replace('HomePage');
        }}>
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

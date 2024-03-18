import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

const GroupListPage = ({navigation}) => {
  let institutionname: string;
  let institutioncode: string;

  institutionname = 'SDN Hoka Bento';
  institutioncode = '45IKB6T';

  return (
    <View style={{margin: 20}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={Styles.backIcon}
            source={require('../../../assets/icons/icon_arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={Styles.headerText}>Daftar Grup</Text>
      </View>
      <View style={{marginVertical: 20}}>
        <Text style={Styles.schoolName}>{institutionname}</Text>
        <Text style={Styles.schoolCode}>Kode instansi: {institutioncode}</Text>
        <View style={Styles.searchBox}>
          <Image
            source={require('../../../assets/icons/icon_search_black.png')}
            style={Styles.searchIcon}
          />
          <TextInput placeholder="Cari" inputMode="search" />
        </View>
      </View>
      <ScrollView>

      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
    marginRight: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  schoolName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  schoolCode: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#e9e9e9',
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    columnGap: 10,
  },
  searchIcon: {
    height: 20,
    width: 20,
    opacity: 0.5,
  },
});

export default GroupListPage;

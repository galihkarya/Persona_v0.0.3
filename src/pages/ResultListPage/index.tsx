import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';

const ResultListPage = ({navigation}) => {
  let institutionname: string;
  let institutioncode: string;

  institutionname = 'SDN Hoka Bento';
  institutioncode = '45IKB6T';

  const [value, setValue] = useState<string>();
  const ref = useRef<IDropdownRef>(null);
  const data = [
    {label: '1A', value: '1a'},
    {label: '1B', value: '1b'},
    {label: '1C', value: '1c'},
    {label: '2A', value: '2a'},
    {label: '2B', value: '2b'},
    {label: '2C', value: '2c'},
    {label: '3A', value: '3a'},
    {label: '3B', value: '3b'},
    {label: '3C', value: '3c'},
    {label: '4A', value: '4a'},
    {label: '4B', value: '4b'},
    {label: '4C', value: '4c'},
    {label: '5A', value: '5a'},
    {label: '5B', value: '5b'},
    {label: '5C', value: '5c'},
    {label: '6A', value: '6a'},
    {label: '6B', value: '6b'},
    {label: '6C', value: '6c'},
  ];

  return (
    <View>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
      <Text style={Styles.headerText}>Daftar Hasil</Text>
      <View style={{margin: 20}}>
        <Text style={Styles.schoolName}>{institutionname}</Text>
        <Text style={Styles.schoolCode}>Kode instansi: {institutioncode}</Text>
        <View style={Styles.searchBox}>
          <Image
            source={require('../../assets/icons/icon_search_black.png')}
            style={Styles.searchIcon}
          />
          <TextInput placeholder="Cari" inputMode="search" />
        </View>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Dropdown
            ref={ref}
            style={Styles.dropdown}
            placeholderStyle={Styles.placeholderStyle}
            selectedTextStyle={Styles.selectedTextStyle}
            data={data}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Pilih grup kelas"
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#e9e9e9',
              padding: 12.5,
              borderRadius: 15,
            }}
            onPress={() => {
              navigation.navigate('GroupListPage');
            }}>
            <Image
              source={require('../../assets/icons/icon_edit.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
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
  dropdown: {
    height: 50,
    backgroundColor: '#e9e9e9',
    paddingHorizontal: 20,
    borderRadius: 15,
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
});

export default ResultListPage;

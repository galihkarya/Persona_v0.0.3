import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import api from '../../API/UserApi';

import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultListPage = ({navigation}: any) => {
  const [userData, setUserData] = useState<any>();
  const [classList, setClassList] = useState<any>([]);
  const [listData, setListData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const data = userData ? JSON.parse(userData) : ' ';
      setUserData(data);

      await api
        .get(`/api/v1/institute/id/${data.institute_id}`)
        .then(async ({data}) => {
          // console.log(data.groups)
          const group = data.groups.map(({id: value, name: label}: any) => ({value, label,}));
          setClassList(group);
          // console.log(classList);
        });
    };
    getData();

    // const getResultList = async () => {
    //   await api.get('/result').then(({data}) => {
    //     // console.log(data);
    //     setListData(data);
    //   });
    //   // console.log(ResultList.data);
    // };
    // getResultList();
  }, []);

  const PropList = ({
    studentName,
    groupID,
    headLine,
    lifeLine,
    heartLine,
    sex,
  }: any) => {
    // console.log(studentName, groupID, headLine, lifeLine, heartLine, sex);
    return (
      <View style={Styles.listView}>
        <View>
          <Text style={Styles.resultName}>{studentName}</Text>
          <Text style={Styles.classGroup}>Kelas {groupID}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={Styles.lihatButton}
            onPress={() =>
              navigation.navigate('ResultPage', {
                studentName,
                groupID,
                headLine,
                lifeLine,
                heartLine,
                sex,
              })
            }>
            <Text style={Styles.lihatTextButton}>Lihat</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const [classSelected, setClassSelected] = useState<any>();
  const ref = useRef<IDropdownRef>(null);

  return (
    <View style={{flex: 1, maxHeight: '35%'}}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />

      <Text style={Styles.headerText}>Daftar Hasil</Text>
      <View style={{margin: 20}}>
        <Text style={Styles.schoolName}>{userData?.institute_name}</Text>
        <Text style={Styles.schoolCode}>
          Kode instansi: {userData?.institute_code}
        </Text>
        <View style={Styles.searchBox}>
          <Image
            source={require('../../../assets/icons/icon_search_black.png')}
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
            data={classList}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Pilih grup kelas"
            value={classSelected}
            onChange={item => {
              setClassSelected(item.value);
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
              source={require('../../../assets/icons/icon_edit.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={listData}
            renderItem={({item}) => (
              <PropList
                studentName={item.studentName}
                groupID={item.groupID}
                headLine={item.headLine}
                lifeLine={item.lifeLine}
                heartLine={item.heartLine}
                sex={item.sex}
              />
            )}
            keyExtractor={item => item.id}
            style={{marginTop: 20}}
          />
        </View>
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
  lihatButton: {
    alignContent: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  lihatTextButton: {
    marginVertical: 5,
    marginHorizontal: 10,
    color: 'black',
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flex: 1,
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderColor: '#00000070',
  },
  resultName: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  classGroup: {
    color: '#00000088',
    fontWeight: '400',
    fontSize: 14,
  },
});

export default ResultListPage;

import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import api from '../../API/UserApi';

import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultListPage = ({navigation}: any) => {
  const [userData, setUserData] = useState<any>();
  const [classList, setClassList] = useState<any>([]);
  const [listData, setListData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const dataFetcher = async () => {
    setIsLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    const data = userData ? JSON.parse(userData) : ' ';
    console.log(data);
    setUserData(data);

    await api
      .get(`/api/v1/institute/id/${data.institute_id}`)
      .then(async ({data}) => {
        console.log(data.groups)
        const group = data.groups.map(({id: value, name: label}: any) => ({
          value,
          label,
        }));
        setClassList(group);
        // console.log(classList);
      });

    if (data.role == 'bk') {
      await api
        .get(`/api/v1/result/institute/${data.institute_id}`)
        .then(({data}) => {
          console.log('bk', data);
          setListData(data);
        });
    } else if (data.role == 'wk') {
      await api.get(`/api/v1/result/group/20`).then(({data}) => {
        console.log('wk', data);
        setListData(data);
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    dataFetcher();
  }, []);

  const FlatListResult = ({
    student_name,
    group_name,
    head_line,
    life_line,
    heart_line,
    gender,
  }: any) => {
    // console.log(student_name, group_name, head_line, life_line, heart_line, gender);
    return (
      <View style={Styles.listView}>
        <View>
          <Text style={Styles.resultName}>{student_name}</Text>
          <Text style={Styles.classGroup}>Kelas {group_name}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={Styles.lihatButton}
            onPress={() =>
              navigation.navigate('ResultPage', {
                student_name,
                group_name,
                head_line,
                life_line,
                heart_line,
                gender,
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
    <View style={{flex: 1, paddingBottom: '105%'}}>
      <Text style={Styles.headerText}>Daftar Hasil</Text>
      <View style={{margin: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={Styles.schoolName}>{userData?.institute_name}</Text>
          {isLoading ? (
            <ActivityIndicator size={'large'} animating={true} color={'#cc3663'} />
          ) : (
            <TouchableOpacity onPress={dataFetcher}>
              <Image
                source={require('../../../assets/icons/icon_refreshButton.png')}
                style={{width: 30, height: 30, opacity: 0.5}}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={Styles.schoolCode}>
          Kode institusi: {userData?.institute_code}
        </Text>
        <View style={Styles.searchBox}>
          <Image
            source={require('../../../assets/icons/icon_search_black.png')}
            style={Styles.searchIcon}
          />
          <TextInput
            style={{flex: 1}}
            placeholder="Cari"
            onChangeText={val => setSearchText(val)}
            value={searchText}
          />
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
              navigation.navigate('GroupListPage', {
                institute_name: userData?.institute_name,
                institute_code: userData?.institute_code,
                institute_id: userData?.institute_id,
              });
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
              <FlatListResult
                student_name={item.student_name}
                group_name={item.group.name}
                head_line={item.head_line}
                life_line={item.life_line}
                heart_line={item.heart_line}
                gender={item.gender}
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

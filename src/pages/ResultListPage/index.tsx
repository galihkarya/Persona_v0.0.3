import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Appearance,
  StatusBar,
} from 'react-native';
import api from '../../API/UserApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ResultListPage = ({navigation}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const [userData, setUserData] = useState<any>();
  const [listData, setListData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<any>();

  const dataFetcher = async () => {
    setIsLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    const data = userData ? JSON.parse(userData) : ' ';
    console.log(data);
    setUserData(data);

    if (data.role == 'bk') {
      await api
        .get(`/api/v1/result/institute/${data.institute_id}`)
        .then(({data}) => {
          console.log('bk', data);
          setListData(data);
          setFilteredData(data);
        });
    } else if (data.role == 'wk') {
      await api.get(`/api/v1/result/group/${data.group_id}`).then(({data}) => {
        console.log('wk', data);
        setListData(data);
        setFilteredData(data);
      });
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      dataFetcher();
      return () => {};
    }, [])
  );


  useEffect(() => {
    if (searchText === '') {
      setFilteredData(listData);
    } else {
      const filtered = listData?.filter(
        (item: any) =>
          item.student_name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.group.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
      console.log(filtered);
    }
  }, [searchText, listData]);

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
      <View
        style={[
          Styles.listView,
          {borderColor: theme == 'light' ? '#3d3d3d50' : '#fefefe50'},
        ]}>
        <View>
          <Text
            style={[
              Styles.resultName,
              theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
            ]}>
            {student_name}
          </Text>
          <Text
            style={[
              Styles.classGroup,
              theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
            ]}>
            Kelas {group_name}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={[
              Styles.lihatButton,
              theme == 'light'
                ? Styles.containerLightTheme2
                : Styles.containerDarkTheme2,
            ]}
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
            <Text
              style={[
                Styles.lihatTextButton,
                theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
              ]}>
              Lihat
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        {flex: 1},
        theme == 'light'
          ? Styles.containerLightTheme1
          : Styles.containerDarkTheme1,
      ]}>
        <StatusBar barStyle={theme == 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme == 'light' ? Styles.containerLightTheme1.backgroundColor : Styles.containerDarkTheme1.backgroundColor}/>
      <Text
        style={[
          Styles.headerText,
          theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
        ]}>
        Daftar Hasil
      </Text>
      <View style={{margin: 20}}>
        <Text
          style={[
            Styles.schoolName,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          {userData?.institute_name}
        </Text>
        <Text
          style={[
            Styles.schoolCode,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          Kode institusi: {userData?.institute_code}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={[
              Styles.searchBox,
              theme == 'light'
                ? Styles.containerLightTheme2
                : Styles.containerDarkTheme2,
            ]}>
            <Image
              source={
                theme == 'light'
                  ? require('../../../assets/icons/search_black.png')
                  : require('../../../assets/icons/search_white.png')
              }
              style={Styles.searchIcon}
            />
            <TextInput
              style={[{flex: 0.78}, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}
              placeholder="Cari"
              onChangeText={val => setSearchText(val)}
              value={searchText}
              placeholderTextColor={
                theme == 'light'
                  ? `${Styles.textLightTheme.color}90`
                  : `${Styles.textDarkTheme.color}90`
              }
            />
          </View>

          <TouchableOpacity
            style={[
              {
                padding: 12.5,
                borderRadius: 15,
                elevation: 4,
                shadowColor: '#00000050',
              },
              theme == 'light'
                ? Styles.containerLightTheme2
                : Styles.containerDarkTheme2,
            ]}
            onPress={() => {
              navigation.navigate('GroupListPage', {
                institute_name: userData.institute_name,
                institute_code: userData.institute_code,
                institute_id: userData.institute_id,
                role: userData.role,
                group_id_user: userData.group_id,
                user_id: userData.id, 
              });
            }}>
            <Image
              source={require('../../../assets/icons/icon_edit.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>

        <View>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={'#cc3663'} />
          ) : (
            <FlatList
              data={filteredData}
              contentContainerStyle={{paddingBottom: '90%'}}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={dataFetcher}
                  colors={['#cc3663', '#ffffff']}
                />
              }
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
              style={{marginTop: 5}}
            />
          )}
        </View>
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
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
  },
  schoolName: {
    fontSize: 24,
    fontWeight: '700',
  },
  schoolCode: {
    fontSize: 14,
    fontWeight: '500',
  },
  searchBox: {
    flexDirection: 'row',
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    columnGap: 10,
    elevation: 4,
    shadowColor: '#00000050',
  },
  searchIcon: {
    height: 20,
    width: 20,
    opacity: 0.5,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  lihatButton: {
    alignContent: 'center',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#00000050',
  },
  lihatTextButton: {
    marginVertical: 5,
    marginHorizontal: 10,
    fontWeight: '500',
    paddingHorizontal: 5,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
  },
  resultName: {
    fontWeight: '600',
    fontSize: 16,
  },
  classGroup: {
    fontWeight: '400',
    fontSize: 14,
    opacity: 0.5,
  },
});

export default ResultListPage;

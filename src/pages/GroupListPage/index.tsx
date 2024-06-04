import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Appearance,
} from 'react-native';
import api from '../../API/UserApi';

const GroupListPage = ({navigation, route}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const {institute_name, institute_code, institute_id, role, group_id_user} =
    route.params;
  const [listGroup, setlistGroup] = useState<any>(null);
  const [groupName, setGroupName] = useState('');
  const [editGroupName, setEditGroupName] = useState('');
  const [addGroup, setAddGroup] = useState('');
  const [groupID, setGroupID] = useState<number>();

  const [isLoading, setisLoading] = useState(false);
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<any>();

  const getListGroup = async () => {
    setisLoading(true);
    await api.get(`/api/v1/group/institute/${institute_id}`).then(({data}) => {
      console.log(data);
      setlistGroup(data);
      setFilteredData(data);
    });
    setisLoading(false);
  };

  useEffect(() => {
    getListGroup();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setFilteredData(listGroup);
    } else {
      const filtered = listGroup?.filter((item: any) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [searchText, listGroup]);

  const FlatListGroup = ({group_name, group_id}: any) => {
    return (
      <View style={Styles.listView}>
        <View>
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
              Styles.editButton,
              {opacity: group_id_user == group_id ? 0.3 : 1},
              theme == 'light'
                ? Styles.containerLightTheme2
                : Styles.containerDarkTheme2,
            ]}
            disabled={group_id_user == group_id}
            onPress={() => {
              console.log('modal: edit class');
              setGroupID(group_id);
              setGroupName(group_name);
              if (role == 'bk') setModal1Visible(true);
            }}>
            <Text
              style={[
                Styles.editTextButton,
                theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
              ]}>
              {role == 'bk'
                ? 'Edit'
                : group_id_user == group_id
                ? 'Tergabung'
                : 'Gabung'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        {flex: 1, padding: 20},
        theme == 'light'
          ? Styles.containerLightTheme1
          : Styles.containerDarkTheme1,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
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
        <Text
          style={[
            Styles.headerText,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          Daftar Grup
        </Text>
      </View>

      <View style={{marginTop: 20, marginBottom: 10}}>
        <Text
          style={[
            Styles.schoolName,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          {institute_name}
        </Text>
        <Text
          style={[
            Styles.schoolCode,
            theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
          ]}>
          Kode institusi: {institute_code}
        </Text>
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
          style={theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme}
            placeholder="Cari: '1a' atau '5b'"
            placeholderTextColor={
              theme == 'light'
                ? `${Styles.textLightTheme.color}90`
                : `${Styles.textDarkTheme.color}90`
            }
            inputMode="search"
            onChangeText={val => setSearchText(val)}
            value={searchText}
          />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size={'large'} color={'#cc3663'} />
      ) : (
        <FlatList
          data={filteredData}
          contentContainerStyle={{paddingBottom: 75}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={getListGroup}
              colors={['#cc3663', '#ffffff']}
            />
          }
          renderItem={({item}) => (
            <FlatListGroup group_id={item.id} group_name={item.name} />
          )}
          keyExtractor={item => item.id}
        />
      )}

      {role == 'bk' && (
        <TouchableOpacity
          style={{right: 30, bottom: 30, position: 'absolute'}}
          onPress={() => {
            setModal2Visible(true);
            console.log('modal: add class');
          }}>
          <Image
            source={require('../../../assets/icons/icon_addGroup.png')}
            style={Styles.addIcon}
          />
        </TouchableOpacity>
      )}

      <Modal
        visible={modal1Visible}
        transparent
        onRequestClose={() => setModal1Visible(false)}
        statusBarTranslucent
        animationType="fade">
        <View style={Styles.centeredView}>
          <View
            style={[
              Styles.modalView,
              theme == 'light'
                ? Styles.containerLightTheme1
                : Styles.containerDarkTheme1,
            ]}>
            <Text
              style={[
                Styles.modalTitle,
                theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
              ]}>
              Edit Kelas
            </Text>
            <TextInput
              style={[
                Styles.input,
                theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2,
                theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
              ]}
              onChangeText={setEditGroupName}
              value={editGroupName}
              placeholder={groupName}
              placeholderTextColor={
                theme == 'light'
                  ? `${Styles.textLightTheme.color}50`
                  : `${Styles.textDarkTheme.color}50`
              }
            />
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                onPress={async () => {
                  await api
                    .put(`/api/v1/group/`, {
                      id: groupID,
                      name: editGroupName,
                      institute_id,
                    })
                    .then(({data}) => {
                      console.log(data);
                      getListGroup();
                      ToastAndroid.show(`Kelas berhasil diubah`, 3000);
                    })
                    .finally(() => setEditGroupName(''));
                  setModal1Visible(false);
                }}
                style={Styles.modalButtonP}>
                <Text style={Styles.modalTextButtonP}>Simpan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await api.delete(`/api/v1/group/`, {id: groupID});

                  setModal1Visible(false);
                }}
                style={Styles.modalButtonN}>
                <Text style={Styles.modalTextButtonN}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modal2Visible}
        transparent
        onRequestClose={() => setModal2Visible(false)}
        statusBarTranslucent
        animationType="fade">
        <View style={Styles.centeredView}>
          <View
            style={[
              Styles.modalView,
              theme == 'light'
                ? Styles.containerLightTheme1
                : Styles.containerDarkTheme1,
            ]}>
            <Text
              style={[
                Styles.modalTitle,
                theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
              ]}>
              Tambahkan Kelas
            </Text>
            <TextInput
              style={[
                Styles.input,
                theme == 'light'
                  ? Styles.containerLightTheme2
                  : Styles.containerDarkTheme2,
                theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme,
              ]}
              onChangeText={setAddGroup}
              value={addGroup}
              placeholder="1A"
            />
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                onPress={async () => {
                  await api
                    .post(`/api/v1/group/`, {name: addGroup, institute_id})
                    .then(({data}) => {
                      console.log(data);
                      setModal2Visible(false);
                      getListGroup();
                      ToastAndroid.show(
                        `Kelas ${addGroup} telah berhasil dibuat`,
                        3000,
                      );
                    });
                }}
                style={Styles.modalButtonP}>
                <Text style={Styles.modalTextButtonP}>Simpan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModal2Visible(false)}
                style={Styles.modalButtonN}>
                <Text style={Styles.modalTextButtonN}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addIcon: {
    height: 50,
    width: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  modalView: {
    // margin: 10,
    borderRadius: 12,
    padding: 25,
    elevation: 5,
    shadowColor: '#00000090',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  modalButtonP: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 16,
    backgroundColor: '#cc3663',
  },
  modalButtonN: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 16,
    borderColor: '#cc3663',
    borderWidth: 2,
  },
  modalTextButtonP: {
    fontSize: 16,
    color: 'white',
  },
  modalTextButtonN: {
    fontSize: 16,
    color: '#cc3663',
  },
  titleModal: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  input: {
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#00000050',
    paddingHorizontal: 20,
    marginTop: 10,
    marginVertical: 20,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: '#00000070',
  },
  classGroup: {
    fontWeight: '600',
    fontSize: 16,
  },
  editButton: {
    alignContent: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  editTextButton: {
    marginVertical: 5,
    marginHorizontal: 10,
    fontWeight: '500',
    paddingHorizontal: 7,
  },
});

export default GroupListPage;

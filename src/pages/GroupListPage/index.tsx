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
} from 'react-native';
import api from '../../API/UserApi';

const GroupListPage = ({navigation, route}: any) => {
  const {institute_name, institute_code, institute_id} = route.params;
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
      setFilteredData(data)
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
      const filtered = listGroup?.filter((item:any) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchText, listGroup]);

  const FlatListGroup = ({group_name, group_id}: any) => {
    return (
      <View style={Styles.listView}>
        <View>
          <Text style={Styles.classGroup}>Kelas {group_name}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={Styles.editButton}
            onPress={() => {
              console.log('modal: edit class');
              setGroupID(group_id);
              setGroupName(group_name);
              setModal1Visible(true);
            }}>
            <Text style={Styles.editTextButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{margin: 20, flex: 1}}>
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

      <View style={{marginTop: 20, marginBottom: 10}}>
        <Text style={Styles.schoolName}>{institute_name}</Text>
        <Text style={Styles.schoolCode}>Kode institusi: {institute_code}</Text>
        <View style={Styles.searchBox}>
          <Image
            source={require('../../../assets/icons/icon_search_black.png')}
            style={Styles.searchIcon}
          />
          <TextInput placeholder="Cari: '1a' atau '5b'" inputMode="search" onChangeText={val => setSearchText(val)} value={searchText}/>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <FlatList
          data={filteredData}
          contentContainerStyle={{paddingBottom: 75}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <FlatListGroup group_id={item.id} group_name={item.name} />
          )}
          keyExtractor={item => item.id}
        />
      )}

      <TouchableOpacity
        style={{right: 10, bottom: 10, position: 'absolute'}}
        onPress={() => {
          setModal2Visible(true);
          console.log('modal: add class');
        }}>
        <Image
          source={require('../../../assets/icons/icon_addGroup.png')}
          style={Styles.addIcon}
        />
      </TouchableOpacity>

      <Modal
        visible={modal1Visible}
        transparent
        onRequestClose={() => setModal1Visible(false)}
        statusBarTranslucent
        animationType="fade">
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <Text style={Styles.modalTitle}>Edit Kelas</Text>
            <TextInput
              style={Styles.input}
              onChangeText={setEditGroupName}
              value={editGroupName}
              placeholder={groupName}
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
                    .finally(()=> setEditGroupName(''));
                  setModal1Visible(false);
                }}
                style={Styles.modalButtonP}>
                <Text style={Styles.modalTextButtonP}>Simpan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await api
                  .delete(`/api/v1/group/`, {id: groupID})

                  setModal1Visible(false)}}
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
          <View style={Styles.modalView}>
            <Text style={Styles.modalTitle}>Tambahkan Kelas</Text>
            <TextInput
              style={Styles.input}
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
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 25,
    elevation: 5,
    shadowColor: '#00000090',
  },
  modalTitle: {
    textAlign: 'center',
    color: 'black',
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
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fefefe',
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
    color: 'black',
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
    color: 'black',
    fontWeight: '500',
    paddingHorizontal: 7
  },
});

export default GroupListPage;

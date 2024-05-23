import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
  ToastAndroid,
  FlatList,
} from 'react-native';
import api from '../../API/UserApi';

const GroupListPage = ({navigation, route}: any) => {
  const {institute_name, institute_code, institute_id} = route.params;

  const [currentModal, setCurrentModal] = useState('');
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [groupClass, setGroupClass] = useState('Tarersss');
  const [listGroupData, setListGroupData] = useState(null);

  const setModalContent = (modalHome: string) => {
    setCurrentModal(modalHome);
    setModalVisible(true);
  };

  const getGroupListData = async () => {
    await api.get(`/api/v1/group/institute/${institute_id}`).then(({data}) => {
      console.log(data);
      setListGroupData(data);
    });
  };
  getGroupListData();

  const PropList = ({group_name}: any) => {
    return (
      <View style={Styles.listView}>
        <View>
          <Text style={Styles.classGroup}>Kelas {group_name}</Text>
        </View>
        <View>
          <TouchableOpacity style={Styles.editButton} onPress={() => {
            console.log('tistis')
            setModalEditVisible(!modalEditVisible)}}>
            <Text style={Styles.editTextButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const AddGroupModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // pointerEvents='auto'
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <Text style={Styles.titleModal}>Tambah Grup</Text>
            <Text>Nama kelas</Text>
            <TextInput
              style={Styles.input}
              placeholder="1A"
              onChangeText={val => setGroupClass(val)}
              value={groupClass}
              // editable
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <TouchableOpacity
                onPress={async () => {
                  await api
                    .post('/api/v1/group/', {name: groupClass, institute_id})
                    .then(() => {
                      ToastAndroid.show('Kelas berhasil ditambahkan', 3000);
                      setModalVisible(!modalVisible);
                    });
                }}>
                <Text
                  style={[
                    Styles.modalButton,
                    {backgroundColor: '#cc3663', color: '#f2f2f2'},
                  ]}>
                  Simpan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text
                  style={[
                    Styles.modalButton,
                    {
                      borderColor: '#cc3663',
                      borderWidth: 2,
                      color: '#cc3663',
                      backgroundColor: '#fefefe',
                    },
                  ]}>
                  Batal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const EditGroupModal = () => {
    return <View></View>;
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
      {/* {currentModal === "add" ? ( */}
        <AddModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setGroupClass={setGroupClass}
        groupClass={groupClass}
        institute_id={institute_id}/>
        <EditModal
        modalEditVisible={modalEditVisible}
        setModalEditVisible={setModalEditVisible}
        setGroupClass={setGroupClass}
        groupClass={groupClass}
        institute_id={institute_id}/>
      {/* ) : null} */}
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // pointerEvents='auto'
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

       <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <Text style={Styles.titleModal}>Tambah Grup</Text>
          <Text>Nama kelas</Text>
          <TextInput
            style={Styles.input}
            placeholder="1A"
            onChangeText={val => setGroupClass(val)}
            value={groupClass}
            // editable
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={async () => {
                await api
                  .post('/api/v1/group/', {name: groupClass, institute_id})
                  .then(() => {
                    ToastAndroid.show('Kelas berhasil ditambahkan', 3000);
                    setModalVisible(!modalVisible);
                  });
              }}>
              <Text
                style={[
                  Styles.modalButton,
                  {backgroundColor: '#cc3663', color: '#f2f2f2'},
                ]}>
                Simpan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text
                style={[
                  Styles.modalButton,
                  {
                    borderColor: '#cc3663',
                    borderWidth: 2,
                    color: '#cc3663',
                    backgroundColor: '#fefefe',
                  },
                ]}>
                Batal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </Modal> */}

      <View style={{marginVertical: 20}}>
        <Text style={Styles.schoolName}>{institute_name}</Text>
        <Text style={Styles.schoolCode}>Kode instansi: {institute_code}</Text>
        <View style={Styles.searchBox}>
          <Image
            source={require('../../../assets/icons/icon_search_black.png')}
            style={Styles.searchIcon}
          />
          <TextInput placeholder="Cari" inputMode="search" />
        </View>
      </View>

      <FlatList
        data={listGroupData}
        renderItem={({item}) => (
          <PropList group_id={item.id} group_name={item.name} />
        )}
        keyExtractor={item => item.id}
        style={{marginTop: 20}}
      />

      <TouchableOpacity
        style={{right: 10, bottom: 10, position: 'absolute'}}
        onPress={() => setModalVisible(true)}>
        <Image
          source={require('../../../assets/icons/icon_addGroup.png')}
          style={Styles.addIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

function AddModal({
  modalVisible,
  setModalVisible,
  setGroupClass,
  groupClass,
  institute_id,
}: any) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      // pointerEvents='auto'
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <Text style={Styles.titleModal}>Tambah Grup</Text>
          <Text>Nama kelas</Text>
          <TextInput
            style={Styles.input}
            placeholder="1A"
            onChangeText={val => setGroupClass(val)}
            value={groupClass}
            // editable
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={async () => {
                await api
                  .post('/api/v1/group/', {name: groupClass, institute_id})
                  .then(() => {
                    ToastAndroid.show('Kelas berhasil ditambahkan', 3000);
                    setModalVisible(!modalVisible);
                  });
              }}>
              <Text
                style={[
                  Styles.modalButton,
                  {backgroundColor: '#cc3663', color: '#f2f2f2'},
                ]}>
                Simpan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text
                style={[
                  Styles.modalButton,
                  {
                    borderColor: '#cc3663',
                    borderWidth: 2,
                    color: '#cc3663',
                    backgroundColor: '#fefefe',
                  },
                ]}>
                Batal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
function EditModal({
  modalEditVisible,
  setModalEditVisible,
  setGroupClass,
  groupClass,
  institute_id,
}: any) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalEditVisible}
      // pointerEvents='auto'
      onRequestClose={() => {
        setModalEditVisible(!modalEditVisible);
      }}>
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <Text style={Styles.titleModal}>Edit Grup</Text>
          <Text>Nama kelas</Text>
          <TextInput
            style={Styles.input}
            placeholder="1A"
            onChangeText={val => setGroupClass(val)}
            value={groupClass}
            // editable
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={async () => {
                await api
                  .post('/api/v1/group/', {name: groupClass, institute_id})
                  .then(() => {
                    ToastAndroid.show('Kelas berhasil ditambahkan', 3000);
                    setModalEditVisible(!modalEditVisible);
                  });
              }}>
              <Text
                style={[
                  Styles.modalButton,
                  {backgroundColor: '#cc3663', color: '#f2f2f2'},
                ]}>
                Simpan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalEditVisible(!modalEditVisible);
              }}>
              <Text
                style={[
                  Styles.modalButton,
                  {
                    borderColor: '#cc3663',
                    borderWidth: 2,
                    color: '#cc3663',
                    backgroundColor: '#fefefe',
                  },
                ]}>
                Batal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 16,
    fontSize: 18,
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
    // flex: 1,
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
  },
});

export default GroupListPage;

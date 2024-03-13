import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';

const HomePageLogedIn = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState(2);

  const setModalContent = (modalHome: number) => {
    setModalVisible(true);
    setCurrentModal(modalHome);
  };

  const Card1 = () => {
    return (
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={Styles.buttonClose}
              source={require('../../assets/icons/close.png')}
            />
          </TouchableOpacity>
          <Text style={Styles.modalTextTitle}>Apa itu Palmistry?</Text>
          <Text style={Styles.modalTextContent}>
            Menurut kamus besar bahasa Indonesia Palmistry merupakan kata benda
            yang berarti kepandaian meramal berdasarkan rajah/garis tangan.
          </Text>
        </View>
      </View>
    );
  };

  const Card2 = () => {
    return (
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={Styles.buttonClose}
              source={require('../../assets/icons/close.png')}
            />
          </TouchableOpacity>
          <Text style={Styles.modalTextTitle}>Macam-macam Garis Tangan</Text>
          <Text style={Styles.modalTextContent}>
            Menurut kamus besar bahasa Indonesia Palmistry merupakan kata benda
            yang berarti kepandaian meramal berdasarkan rajah/garis tangan.
          </Text>
        </View>
      </View>
    );
  };

  const Card3 = () => {
    return (
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Image
              style={Styles.buttonClose}
              source={require('../../assets/icons/close.png')}
            />
          </TouchableOpacity>
          <Text style={Styles.modalTextTitle}>Gaya belajar</Text>
          <Text style={Styles.modalTextContent}>
            Menurut kamus besar bahasa Indonesia Palmistry merupakan kata benda
            yang berarti kepandaian meramal berdasarkan rajah/garis tangan.
          </Text>
        </View>
      </View>
    );
  };

  return (
      <View>
        <View
          style={{
            marginRight: 20,
            marginTop: 30,
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <View style={{flex: 1}}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '300'}}>
              Welcome Back,{' '}
            </Text>
            <Text style={{color: 'black', fontSize: 24, fontWeight: '700'}}>
              Alifia Ramadhani G.{' '}
            </Text>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '300'}}>
              SDN Hoka Bento{' '}
            </Text>
          </View>
          <Image
            style={Styles.avatar}
            source={require('../../assets/icons/Avatar.png')}
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          {currentModal == 1 ? (
            <Card1 />
          ) : currentModal == 2 ? (
            <Card2 />
          ) : (
            <Card3 />
          )}
        </Modal>

        <View style={{marginTop: 20}}>
          <TouchableOpacity
            style={Styles.card}
            onPress={() => setModalContent(1)}>
            <Image
              style={Styles.imageObjects}
              source={require('../../assets/icons/palm_fluent.png')}
            />
            <Text style={Styles.textCard}>Apa itu Palmistry?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.card}
            onPress={() => setModalContent(2)}>
            <Image
              style={Styles.imageObjects}
              source={require('../../assets/icons/palmline.png')}
            />
            <Text style={Styles.textCard}>Macam-macam Garis Tangan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.card}
            onPress={() => setModalContent(3)}>
            <Image
              style={Styles.imageObjects}
              source={require('../../assets/icons/indexfinger_fluent.png')}
            />
            <Text style={Styles.textCard}>
              Gaya belajar yang cocok sesuai kepribadian anak!
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => {
            navigation.navigate('AddStudentData');
          }}>
          <Text style={Styles.textButton}>Mulai Prediksi</Text>
        </TouchableOpacity>
      </View>
  );
};

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 35,
    elevation: 5,
    shadowColor: '#00000090',
  },
  buttonClose: {
    alignSelf: 'flex-end',
    width: 15,
    height: 15,
  },
  modalTextTitle: {
    marginVertical: 15,
    textAlign: 'left',
    color: 'black',
    fontWeight: '900',
    fontSize: 34,
  },
  modalTextContent: {
    color: 'black',
    fontWeight: '400',
    marginTop: 20,
    marginBottom: 50,
  },
  loginButton: {
    padding: 10,
    alignSelf: 'flex-end',
    backgroundColor: '#00000000',
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 8,
  },
  imageObjects: {
    width: 100,
    height: 100,
    margin: 16,
  },
  textCard: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
    alignSelf: 'center',
    marginRight: 200,
  },
  button: {
    backgroundColor: '#CC3663',
    marginHorizontal: 20,
    marginVertical: 40,
    verticalAlign: 'bottom',
    borderRadius: 15,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 14,
  },
});

export default HomePageLogedIn;

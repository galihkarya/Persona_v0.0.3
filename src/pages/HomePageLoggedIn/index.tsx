import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  Appearance, 
} from 'react-native';

const HomePageLogedIn = ({navigation}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const closeWhite = require('../../../assets/icons/close_White.png');
  const closeBlack = require('../../../assets/icons/close_Black.png');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState(2);
  const [userData, setUserData] = useState<any>(null);

  const setModalContent = (modalHome: number) => {
    setModalVisible(true);
    setCurrentModal(modalHome);
  };

  useEffect(() => {
    const getData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const data = userData ? JSON.parse(userData) : ' ';
      setUserData(data);
    };
    getData();
  }, []);
  // console.log(userData);

  const Card1 = () => {
    return (
      <View style={Styles.centeredView}>
        <View style={[Styles.modalView, theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1]}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} hitSlop={10}>
            <Image
              style={Styles.buttonClose}
              source={theme == 'light' ? closeBlack : closeWhite}
            />
          </TouchableOpacity>
          <Text style={[Styles.modalTextTitle, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Apa itu Palmistry?</Text>
          <Text style={[Styles.modalTextContent, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>
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
        <View style={[Styles.modalView, theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1]}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} hitSlop={10}>
            <Image
              style={Styles.buttonClose}
              source={theme == 'light' ? closeBlack : closeWhite}
            />
          </TouchableOpacity>
          <Text style={[Styles.modalTextTitle, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Macam-macam Garis Tangan</Text>
          <ScrollView style={{maxHeight: 300}}>
            <Text style={[Styles.modalTextContent, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>
              Garis Hati: terletak di atas garis kepala dan garis kehidupan.
              Garis ini dimulai di Bawah jari telunjuk atau jari tengah, dan
              berakhir di jari kelingking. Garis ini merepresentasikan kondisi
              emosional seseorang serta hubungan emosional dan fisiknya dengan
              orang lain.
            </Text>
            <Text style={[Styles.modalTextContent, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>
              Garis Kepala: Garis ini dimulai tepat di atas the life line,
              diantara ibu jari dan jari telunjuk, dan membentang melintasi
              telapak tangan ke arah tepi telapak tangan lainnya secara
              horizontal. Garis ini merepresentasikan garis kebijaksanaan dan
              mengungkapkan kemampuan intelektual sekaligus kemampuan intuitif
              seseorang.
            </Text>
            <Text style={[Styles.modalTextContent, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>
              Garis Kehidupan: Garis ini dimulai di antara jari telunjuk dan ibu
              jari, kemudian berlanjut ke bawah ke arah pangkal ibu jari dan
              pergelangan tangan. Garis ini merepresentasikan hubungan dengan
              orang lain dan kesejahteraan seseorang.
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  const Card3 = () => {
    return (
      <View style={Styles.centeredView}>
        <View style={[Styles.modalView, theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1]}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} hitSlop={10}>
            <Image
              style={Styles.buttonClose}
              source={theme == 'light' ? closeBlack : closeWhite}
            />
          </TouchableOpacity>
          <Text style={[Styles.modalTextTitle, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Gaya belajar</Text>
          <Text style={[Styles.modalTextContent, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>
            Menurut kamus besar bahasa Indonesia Palmistry merupakan kata benda
            yang berarti kepandaian meramal berdasarkan rajah/garis tangan.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1, {flex: 1}]}>
      <View
        style={{
          marginRight: 20,
          marginTop: 30,
          flexDirection: 'row',
          marginLeft: 20,
        }}>
        <View style={{flex: 1}}>
          <Text style={[theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme, {fontSize: 14, fontWeight: '300'}]}>
            Welcome Back,{' '}
          </Text>
          <Text style={[theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme, {fontSize: 24, fontWeight: '700'}]}>
            {userData?.full_name}
          </Text>
          <Text style={[theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme, {fontSize: 16, fontWeight: '300'}]}>
            {userData?.institute_name}
          </Text>
        </View>
        {/* <Image
          style={Styles.avatar}
          source={require('../../../assets/icons/Avatar.png')}
        /> */}
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
          style={[Styles.card, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}
          onPress={() => setModalContent(1)}>
          <Image
            style={Styles.imageObjects}
            source={require('../../../assets/images/palm_fluent.png')}
          />
          <Text style={[Styles.textCard, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Apa itu Palmistry?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.card, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}
          onPress={() => setModalContent(2)}>
          <Image
            style={Styles.imageObjects}
            source={require('../../../assets/images/palmline.png')}
          />
          <Text style={[Styles.textCard, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Macam-macam Garis Tangan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.card, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}
          onPress={() => setModalContent(3)}>
          <Image
            style={Styles.imageObjects}
            source={require('../../../assets/images/indexfinger_fluent.png')}
          />
          <Text style={[Styles.textCard, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>
            Gaya belajar yang cocok sesuai kepribadian anak!
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={Styles.button}
        onPress={() => {
          navigation.navigate('AddStudentDataPage');
        }}>
        <Text style={Styles.textButton}>Mulai Prediksi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  containerLightTheme1: {
    backgroundColor: '#f0f0f0'
  }, 
  containerDarkTheme1: {
    backgroundColor: '#2d2d2d'
  }, 
  containerLightTheme2: {
    backgroundColor: '#fefefe'
  }, 
  containerDarkTheme2: {
    backgroundColor: '#3d3d3d'
  }, 
  textLightTheme: {
    color: '#2d2d2d'
  }, 
  textDarkTheme: {
    color: '#f0f0f0'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  modalView: {
    margin: 20,
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
    fontWeight: '900',
    fontSize: 34,
  },
  modalTextContent: {
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButton: {
    marginRight: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10, 
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'center',
  },
  // avatar: {
  //   width: 40,
  //   height: 40,
  // },
  card: {
    flexDirection: 'row',
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
    alignSelf: 'center',
    maxWidth: 175,
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
    color: '#fefefe',
    paddingVertical: 15,
    fontSize: 16,
    fontWeight: '600'
  },
});

export default HomePageLogedIn;

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Appearance, 
} from 'react-native';
import React, {useState, useEffect} from 'react';

const ReminderPage = ({navigation, route}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const {name, gender, student_name, group_id} = route.params;
  console.log(name, gender, student_name, group_id);

  const handleButton = () => {
    navigation.navigate('CameraPage', {name, student_name, gender, group_id});
  };

  return (
    <View style={[theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1, {flex: 1}]}>
      <View style={{paddingVertical: 20}}>
        <TouchableOpacity
          style={Styles.backButton}
          hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={Styles.backIcon}
            source={ theme == 'light' ? require('../../../assets/icons/back_black.png') : require('../../../assets/icons/back_white.png')}
          />
        </TouchableOpacity>
        <Text style={[Styles.header, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Perhatian</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginHorizontal: 20, alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/palm_in_square.png')}
            style={Styles.images}
          />
          <Text style={[Styles.description, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>
            Pastikan telapak tangan masuk semua ke dalam area kotak yang sudah
            ditentukan.
          </Text>
          <Image
            source={require('../../../assets/images/leftpalm_selected.png')}
            style={Styles.images}
          />
          <Text style={[Styles.description, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>
            Telapak tangan yang digunakan untuk identifikasi kepribadian adalah
            tangan kiri
          </Text>
          <Image
            source={require('../../../assets/images/focusing_on_palm.png')}
            style={Styles.images}
          />
          <Text style={[Styles.description, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>
            Pastikan gambar yang diambil sudah fokus sehingga garis telapak
            tangan terlihat sangat jelas
          </Text>
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 25, width: '100%'}}>
        <TouchableOpacity style={Styles.button} onPress={handleButton}>
          <Text style={Styles.textButton}>lanjut</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  backIcon: {
    width: 20,
    height: 20,
  },
  backButton: {
    position: 'absolute',
    zIndex: 5,
    top: 30,
    left: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  images: {
    width: 120,
    height: 120,
  },
  description: {
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#CC3663',
    marginHorizontal: 20,
    borderRadius: 15,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 16,
  },
});

export default ReminderPage;

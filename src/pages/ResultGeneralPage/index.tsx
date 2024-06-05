import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  StatusBar,
  BackHandler,
  Appearance, 
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import React, {useEffect, useState} from 'react';

const ResultGeneralPage = ({navigation, route}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const {name, head_line, life_line, heart_line, gender} = route.params;
  // console.log(studentName, groupID, head_line, life_line, heart_line, gender);

  let timestampClock: string;
  let timestampDate: string;
  let year: string;
  let month: string;
  let day: string;
  let timestampClock_str: string;

  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomePage'}],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const exportToPDF = async () => {
    var moment = require('moment');
    moment.locale('en');
    timestampClock = moment().format('LTS');
    timestampDate = moment().format('L');

    year = timestampDate.slice(6, 10).toString();
    month = timestampDate.slice(0, 2).toString();
    day = timestampDate.slice(3, 5).toString();
    timestampClock_str = timestampClock.replaceAll(':', '').slice(0, -3);

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Izin Menulis ke Penyimpanan',
            message:
              'Aplikasi ini membutuhkan izin untuk menulis ke penyimpanan.',
            buttonPositive: 'Oke',
            buttonNegative: 'Batal',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          generatePDF();
        } else {
          ToastAndroid.show(
            'Izin ditolak, tidak dapat menyimpan PDF.',
            ToastAndroid.SHORT,
          );
        }
      } else {
        generatePDF();
      }
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    }
  };

  const generatePDF = async () => {
    try {
      const htmlContent = `
      <div style="background-image: url('../../../assets/images/handpalm.png'); background-repeat: no-repeat; margin: 50">
          <h1>Hasil Pembacaan Garis Tangan</h1>
          <p>Nama siswa: ${name}</p>
          <p>Jenis kelamin: ${gender}</p>
          <p>Dicetak oleh: ${name}</p>
          <p>Waktu cetak: ${timestampDate} ${timestampClock}</p>
          <h2>Garis Kepala</h2>
          <p>${head_line}</p>
          <h2>Garis Kehidupan</h2>
          <p>${life_line}</p>
          <h2>Garis Hati</h2>
          <p>${heart_line}</p>
          <br/>
          <p>Persona 2024</p>
      </div>
        `;

      const options = {
        html: htmlContent,
        fileName: `${name}_${year}${month}${day}${timestampClock_str}`,
        directory: `Persona/Results`,
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF generated:', file.filePath);
      ToastAndroid.show(
        `PDF berhasil di export di ${file.filePath}`,
        ToastAndroid.LONG,
      );
      FileViewer.open(`file://${file.filePath}`)
        .then(() => console.log('opened'))
        .catch(error => console.log(error));
      // await Linking.openURL(`file://${file.filePath}`);
      // Share.open({url: `file://${file.filePath}`});
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <View style={theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1}>
      <StatusBar barStyle={theme == 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme == 'light' ? Styles.containerLightTheme1.backgroundColor : Styles.containerDarkTheme1.backgroundColor}/>
      <View style={{borderBottomWidth: 0.5, borderColor: '#00000050'}}>
        <Text style={[Styles.headerText, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Hasil</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1}>
        <Text style={[Styles.nameText, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>{name}</Text>

        <View
          style={{
            alignItems: 'center',
            gap: 30,
            marginBottom: 250,
            marginHorizontal: 30,
          }}>
          <View style={[Styles.card, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/headline.png')}
                style={Styles.images}
              />
              <Text style={[Styles.lineTitle, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Garis Kepala</Text>
            </View>
            <Text style={[Styles.contentText, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>{head_line}</Text>
          </View>

          <View style={[Styles.card, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/lifeline.png')}
                style={Styles.images}
              />
              <Text style={[Styles.lineTitle, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Garis Kehidupan</Text>
            </View>
            <Text style={[Styles.contentText, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>{life_line}</Text>
          </View>

          <View style={[Styles.card, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/heartline.png')}
                style={Styles.images}
              />
              <Text style={[Styles.lineTitle, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Garis Hati</Text>
            </View>
            <Text style={[Styles.contentText, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>{heart_line}</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          alignSelf: 'center',
          width: '100%',
          gap: 10,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#CC3663',
            marginHorizontal: 20,
            borderRadius: 15,
          }}
          onPress={exportToPDF}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
              paddingVertical: 15,
              fontSize: 14,
            }}>
            Buka sebagai .pdf
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{
            marginHorizontal: 20,
            borderRadius: 15,
            borderColor: '#CC3663',
            borderWidth: 3,
          }, theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1]}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'HomePage'}],
            });
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#CC3663',
              paddingVertical: 15,
              fontSize: 14,
            }}>
            Selesai
          </Text>
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
    top: 30,
    left: 20,
    zIndex: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  nameText: {
    marginTop: 30,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: 30,
  },
  card: {
    padding: 25,
    borderRadius: 16,
    width: '100%',
    elevation: 8,
    gap: 10,
  },
  images: {
    width: 100,
    height: 100,
  },
  lineTitle: {
    fontSize: 18,
    fontWeight: '400',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 21,
    letterSpacing: 0.8,
  },
});
export default ResultGeneralPage;

import {useState} from 'react';
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
  Linking,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
// import Share from 'react-native-share';

const ResultPage = ({navigation, route}: any) => {
  const {fullName, groupID, headLine, lifeLine, heartLine, sex} = route.params;
  console.log(fullName, groupID, headLine, lifeLine, heartLine, sex);
  let accountName: string;

  let timestampClock: string;
  let timestampDate: string;
  let year: string;
  let month: string;
  let day: string;
  let timestampClock_str: string;

  accountName = 'Ica Siti';

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
          <p>Nama siswa: ${fullName}</p>
          <p>Jenis kelamin: ${sex}</p>
          <p>Kelas: ${groupID}</p>
          <p>Dicetak oleh: ${accountName}</p>
          <p>Waktu cetak: ${timestampDate} ${timestampClock}</p>
          <h2>Garis Kepala</h2>
          <p>${headLine}</p>
          <h2>Garis Kehidupan</h2>
          <p>${lifeLine}</p>
          <h2>Garis Hati</h2>
          <p>${heartLine}</p>
      </div>
        `;

      const options = {
        html: htmlContent,
        fileName: `${fullName}${groupID}_${year}${month}${day}${timestampClock_str}`,
        directory: `Persona/Results`,
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF generated:', file.filePath);
      ToastAndroid.show(
        `PDF berhasil di export di ${file.filePath}`,
        ToastAndroid.LONG,
      );
      FileViewer.open(`file://${file.filePath}`);
      // await Linking.openURL(`file://${file.filePath}`);
      // Share.open({url: `file://${file.filePath}`});
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <View>
      <View style={{borderBottomWidth: 0.5, borderColor: '#00000050'}}>
        <TouchableOpacity
          style={Styles.backButton}
          hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
          onPress={() => {
            navigation.goBack('AddStudentDataPage');
          }}>
          <Image
            style={Styles.backIcon}
            source={require('../../../assets/icons/icon_arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={Styles.headerText}>Hasil</Text>
      </View>

      <ScrollView>
        <Text style={Styles.studentNameText}>{fullName}</Text>
        <Text style={Styles.classGroupText}>Kelas {groupID}</Text>

        <View
          style={{
            alignItems: 'center',
            gap: 30,
            marginBottom: 250,
            marginHorizontal: 30,
          }}>
          <View style={Styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/headline.png')}
                style={Styles.images}
              />
              <Text style={Styles.lineTitle}>Garis Kepala</Text>
            </View>
            <Text style={Styles.contentText}>{headLine}</Text>
          </View>

          <View style={Styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/lifeline.png')}
                style={Styles.images}
              />
              <Text style={Styles.lineTitle}>Garis Kehidupan</Text>
            </View>
            <Text style={Styles.contentText}>{lifeLine}</Text>
          </View>

          <View style={Styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/heartline.png')}
                style={Styles.images}
              />
              <Text style={Styles.lineTitle}>Garis Hati</Text>
            </View>
            <Text style={Styles.contentText}>{heartLine}</Text>
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
          style={{
            backgroundColor: '#FFFFFF',
            marginHorizontal: 20,
            borderRadius: 15,
            borderColor: '#CC3663',
            borderWidth: 3,
          }}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Tabs'}],
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
    color: 'black',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  studentNameText: {
    marginTop: 30,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '900',
    color: 'black',
  },
  classGroupText: {
    marginBottom: 30,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '300',
    color: 'black',
  },
  card: {
    backgroundColor: '#FFFFFF',
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
    color: 'black',
    fontWeight: '400',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '300',
    lineHeight: 21,
    letterSpacing: 0.8,
  },
});
export default ResultPage;

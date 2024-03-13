import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

const ResultPage = ({navigation}) => {
  let studentName: string;
  let classGroup: string;
  let headLine: string;
  let lifeLine: string;
  let heartLine: string;

  studentName = 'Upin';
  classGroup = '1A';
  headLine =
    'Berdasarkan perhitungan, anda memiliki pola pikir yang panjang dan berwawasan luas. Anda juga termasuk orang yang kreatif. Anda multi talenta, memiliki mimpi besar dan daya imajinasi yang bagus. ';
  lifeLine =
    'Anda adalah orang yang terbuka dan mudah bergaul. Memiliki vitalitas dan semangat hidup yang bagus. Anda cenderung memiliki ambisi, tetapi juga memiliki ego yang tinggi';
  heartLine =
    'Anda memiliki perasaan yang hangat, penyayang, dan ramah. Suatu hari nanti, anda akan menjadi orang yang romatis, hangat, aktif, dan bahkan rela berkorban. ';

  return (
    <View>
      <View style={{borderBottomWidth: 0.5, borderColor: '#00000050'}}>
        <TouchableOpacity
          style={Styles.backButton}
          hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={Styles.backIcon}
            source={require('../assets/icons/icon_arrowLeft.png')}
          />
        </TouchableOpacity>
        <Text style={Styles.headerText}>Hasil</Text>
      </View>
      <ScrollView>
        <Text style={Styles.studentNameText}>{studentName}</Text>
        <Text style={Styles.classGroupText}>Kelas {classGroup}</Text>

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
                source={require('../assets/icons/headline.png')}
                style={Styles.images}
              />
              <Text style={Styles.lineTitle}>Garis Kepala</Text>
            </View>
            <Text style={Styles.contentText}>{headLine}</Text>
          </View>

          <View style={Styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/icons/lifeline.png')}
                style={Styles.images}
              />
              <Text style={Styles.lineTitle}>Garis Kehidupan</Text>
            </View>
            <Text style={Styles.contentText}>{lifeLine}</Text>
          </View>

          <View style={Styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/icons/heartline.png')}
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
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
              paddingVertical: 15,
              fontSize: 14,
            }}>
            Simpan sebagai .pdf
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
            navigation.replace('HomePage');
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

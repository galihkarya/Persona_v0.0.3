import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

const RegistInstitutionBK = ({navigation}:any) => {
  const [codeInstitution, setCodeInstitution] = useState('');

  return (
    <ScrollView>
      <TouchableOpacity
        style={Styles.backButton}
        hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          style={Styles.backIcon}
          source={require('../../../assets/icons/icon_arrowLeft.png')}
        />
      </TouchableOpacity>
      <View style={{marginTop: 50, marginBottom: 30, alignItems: 'center'}}>
        <Image
          style={Styles.imageCenter}
          source={require('../../../assets/images/school.png')}
        />
        <Text style={Styles.head1}>Institusi</Text>
        <Text style={Styles.head2}>Masukkan kode sekolah</Text>
      </View>
      <View style={{margin: 20}}>
        <TextInput style={Styles.input} placeholder="Kode sekolah"  value={codeInstitution} onChangeText={setCodeInstitution}/>
        <TouchableOpacity
          style={[Styles.button, {opacity: codeInstitution === '' ? 0.5 : 1}]}
          onPress={() => {
            navigation.navigate('RegistAccount');
          }}
          disabled={ codeInstitution === '' }>
          <Text style={Styles.textButton}>lanjut ...</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  backIcon: {
    width: 20,
    height: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  imageCenter: {
    width: 200,
    height: 200,
  },
  head1: {
    fontWeight: '700',
    fontSize: 40,
    color: 'black',
    marginVertical: 20,
  },
  head2: {
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#00000050',
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#CC3663',
    marginVertical: 25,
    verticalAlign: 'bottom',
    borderRadius: 15,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 16,
  },
});

export default RegistInstitutionBK;

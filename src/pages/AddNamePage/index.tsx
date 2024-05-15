import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';

const AddNamePage = ({navigation}:any) => {
  const [gender, setgender] = useState<string | null>(null);
  const [name, setName] = useState('');

  const handleRadiogender = (option: string) => {
    setgender(option === gender ? null : option);
  };

  return (
    <View>
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
      <Text style={Styles.instructionText}>Masukkan data diri</Text>
      <View style={Styles.radioImage}>
        <TouchableOpacity
          style={[
            Styles.radioButtons,
            {opacity: gender === 'Laki-laki' ? 1 : 0.3},
          ]}
          onPress={() => handleRadiogender('Laki-laki')}
          activeOpacity={1}>
          <Text style={Styles.genderText}>Laki-laki</Text>
          <Image style={Styles.genderImage} source={require('../../../assets/images/boy.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.radioButtons,
            {opacity: gender === 'Perempuan' ? 1 : 0.3},
          ]}
          onPress={() => handleRadiogender('Perempuan')}
          activeOpacity={1}>
          <Text style={Styles.genderText}>Perempuan</Text>
          <Image style={Styles.genderImage} source={require('../../../assets/images/girl.png')} />
        </TouchableOpacity>
      </View>
      <View style={{margin: 20, rowGap: 20}}>

        <TextInput style={Styles.input} placeholder="Nama Lengkap" value={name} onChangeText={setName} />

        <TouchableOpacity
          style={[Styles.button, {opacity: gender === null || name === '' ? 0.3 : 1}]}
          onPress={() => {
            navigation.navigate('ReminderPage', {name, gender});
          }}
          disabled={gender === null || name === ''}>
          
          <Text style={Styles.textButton}>lanjut ...</Text>
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
    alignSelf: 'flex-start',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  instructionText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '300',
    marginTop: '15%',
    marginBottom: '20%',
    fontSize: 16,
  },
  genderImage: {
    width: 115,
    height: 115,
  },
  radioButtons: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 10,
    borderRadius: 15,
  },
  radioImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 20,
  },
  genderText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
  },
  input: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#00000050',
    paddingHorizontal: 20,
  },
  dropdown: {
    height: 50,
    elevation: 8,
    shadowColor: '#00000050',
    backgroundColor: '#fefefe',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  button: {
    backgroundColor: '#CC3663',
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
export default AddNamePage;

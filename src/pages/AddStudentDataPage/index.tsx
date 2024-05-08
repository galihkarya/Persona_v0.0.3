import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';

const AddStudentDataPage = ({navigation}:any) => {
  const [sex, setSex] = useState<string | null>(null);

  const [studentName, setStudentName] = useState('');

  const handleRadiosex = (option: string) => {
    setSex(option === sex ? null : option);
  };

  const [groupID, setGroupID] = useState<string>('');
  const ref = useRef<IDropdownRef>(null);
  const data = [
    {label: '1A', value: '1a'},
    {label: '1B', value: '1b'},
    {label: '1C', value: '1c'},
    {label: '2A', value: '2a'},
    {label: '2B', value: '2b'},
    {label: '2C', value: '2c'},
    {label: '3A', value: '3a'},
    {label: '3B', value: '3b'},
    {label: '3C', value: '3c'},
    {label: '4A', value: '4a'},
    {label: '4B', value: '4b'},
    {label: '4C', value: '4c'},
    {label: '5A', value: '5a'},
    {label: '5B', value: '5b'},
    {label: '5C', value: '5c'},
    {label: '6A', value: '6a'},
    {label: '6B', value: '6b'},
    {label: '6C', value: '6c'},
  ];

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
            {opacity: sex === 'Laki-laki' ? 1 : 0.3},
          ]}
          onPress={() => handleRadiosex('Laki-laki')}
          activeOpacity={1}>
          <Text style={Styles.sexText}>Laki-laki</Text>
          <Image style={Styles.sexImage} source={require('../../../assets/images/boy.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.radioButtons,
            {opacity: sex === 'Perempuan' ? 1 : 0.3},
          ]}
          onPress={() => handleRadiosex('Perempuan')}
          activeOpacity={1}>
          <Text style={Styles.sexText}>Perempuan</Text>
          <Image style={Styles.sexImage} source={require('../../../assets/images/girl.png')} />
        </TouchableOpacity>
      </View>
      <View style={{margin: 20, rowGap: 20}}>

        <TextInput style={Styles.input} placeholder="Nama Lengkap" value={studentName} onChangeText={setStudentName} />

        <Dropdown
          ref={ref}
          style={Styles.dropdown}
          placeholderStyle={Styles.placeholderStyle}
          selectedTextStyle={Styles.selectedTextStyle}
          data={data}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Pilih grup kelas"
          value={groupID}
          onChange={item => {
            setGroupID(item.value);
          }}
        />
        <TouchableOpacity
          style={[Styles.button, {opacity: sex === null || groupID === '' || studentName === '' ? 0.3 : 1}]}
          onPress={() => {
            navigation.navigate('ReminderPage', {studentName, sex, groupID});
          }}
          disabled={sex === null || groupID === '' || studentName === ''}>
          
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
  sexImage: {
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
  sexText: {
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
export default AddStudentDataPage;

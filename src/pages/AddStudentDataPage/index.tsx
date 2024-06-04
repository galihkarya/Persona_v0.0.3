import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Appearance, 
} from 'react-native';
import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';
import api from '../../API/UserApi';

const AddStudentDataPage = ({navigation}: any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const [classList, setClassList] = useState<any>([]);
  const [gender, setGender] = useState<string | null>(null);
  const [student_name, setStudent_name] = useState('');
  const [group_id, setGroup_id] = useState<any>('');
  const [role, setRole] = useState('');

  const handleRadiogender = (option: string) => {
    setGender(option === gender ? null : option);
  };

  useEffect(() => {
    const getData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const data = userData ? JSON.parse(userData) : ' ';
      console.log(data);
      setRole(data.role);
      if (data.role == 'wk') setGroup_id(data.group_id);
      

      await api
        .get(`/api/v1/institute/id/${data.institute_id}`)
        .then(async ({data}) => {
          // console.log(data.groups)
          const group = data.groups.map(({id: value, name: label}: any) => ({value,label}));
          setClassList(group);
          // console.log(classList);
        });
    };
    getData();
  }, []);

  const ref = useRef<IDropdownRef>(null);

  return (
    <View style={[theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1, {flex: 1}]}>
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
      <Text style={[Styles.instructionText, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Masukkan data diri</Text>
      <View style={Styles.radioImage}>
        <TouchableOpacity
          style={[
            Styles.radioButtons,
            {opacity: gender === 'Laki-laki' ? 1 : 0.3},
            theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2
          ]}
          onPress={() => handleRadiogender('Laki-laki')}
          activeOpacity={1}>
          <Text style={[Styles.genderText, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Laki-laki</Text>
          <Image
            style={Styles.genderImage}
            source={require('../../../assets/images/boy.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.radioButtons,
            {opacity: gender === 'Perempuan' ? 1 : 0.3},
            theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2
          ]}
          onPress={() => handleRadiogender('Perempuan')}
          activeOpacity={1}>
          <Text style={[Styles.genderText, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Perempuan</Text>
          <Image
            style={Styles.genderImage}
            source={require('../../../assets/images/girl.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{margin: 20, rowGap: 20}}>
        <TextInput
          style={[Styles.input, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}
          placeholder="Nama Lengkap"
          value={student_name}
          onChangeText={setStudent_name}
          autoCapitalize='words'
          placeholderTextColor={theme == 'light' ? `${Styles.textLightTheme.color}50` : `${Styles.textDarkTheme.color}50`}
        />

        { role == 'bk' && (<Dropdown
          ref={ref}
          style={[Styles.dropdown, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}
          placeholderStyle={[Styles.placeholderStyle, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}
          selectedTextStyle={[Styles.selectedTextStyle, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}
          data={classList}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Pilih grup kelas"
          value={group_id}
          containerStyle={theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2}
          onChange={item => {
            setGroup_id(item.value);
          }}
        />)}

        <TouchableOpacity
          style={[
            Styles.button,
            {
              opacity:
                gender === null || group_id === '' || student_name === '' ? 0.3 : 1,
            },
          ]}
          onPress={() => {
            navigation.navigate('ReminderPage', {student_name, gender, group_id});
          }}
          disabled={gender === null || group_id === '' || student_name === ''}>
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
    alignSelf: 'flex-start',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  instructionText: {
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
  },
  input: {
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#00000050',
    paddingHorizontal: 20,
  },
  dropdown: {
    height: 50,
    elevation: 8,
    shadowColor: '#00000050',
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

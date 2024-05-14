import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import api from '../../API/UserApi';
import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';

const RegistInstitutionBK = ({navigation, route}: any) => {
  const {full_name, role} = route.params;
  const [institute_code, setInstitute_code] = useState('');
  const [institute_name, setInstitute_name] = useState();
  const [institute_id, setInstitute_id] = useState();
  const [groupIdSelected, setGroupIdSelected] = useState<any>('');

  const [classList, setClassList] = useState<any>([]);
  const [schoolIsTrue, setSchoolIsTrue] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPressHandler = () => {
    setIsLoading(true);
    if (groupIdSelected == '') {
      const getInstituteByCode = async () => {
        await api
          .get(`/api/v1/institute/code/${institute_code}`)
          .then(async ({data}) => {
            console.log(data);
            if (data === null)
              ToastAndroid.show('Kode sekolah tidak valid', ToastAndroid.LONG);
            else {
              setSchoolIsTrue(true);
              const group = data.groups.map(
                ({id: value, name: label}: any) => ({value, label}),
              );
              setClassList(group);
              setInstitute_name(data.name);
              setInstitute_id(data.id);
            }
          })
          .finally(() => setIsLoading(false));
      };
      getInstituteByCode();
    } 
    else if (groupIdSelected != '') {
      // console.log(full_name, role, institute_code, institute_name, groupIdSelected, institute_id);
      const group = classList.find((group:any) => group.value === groupIdSelected).label;
      console.log(group);
      navigation.navigate('RegistAccount', {
        full_name,
        role,
        institute_code,
        institute_name,
        groupIdSelected,
        institute_id,
        group_name: group
      });
    }
  };
  const ref = useRef<IDropdownRef>(null);

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
      <View
        style={{
          marginTop: schoolIsTrue ? 0 : 50,
          marginBottom: 30,
          alignItems: 'center',
        }}>
        <Image
          style={Styles.imageCenter}
          source={require('../../../assets/images/school.png')}
        />
        <Text style={Styles.head1}>Institusi</Text>
        <Text style={Styles.head2}>Masukkan kode sekolah</Text>
      </View>
      <View style={{margin: 20}}>
        <TextInput
          style={[{marginVertical: schoolIsTrue ? 0 : 8}, Styles.input]}
          placeholder="Kode sekolah"
          value={institute_code}
          autoCapitalize="characters"
          editable={schoolIsTrue ? false : true}
          onChangeText={val_institute_code =>
            setInstitute_code(val_institute_code)
          }
        />
        {schoolIsTrue && (
          <Dropdown
            ref={ref}
            style={Styles.dropdown}
            placeholderStyle={Styles.placeholderStyle}
            selectedTextStyle={Styles.selectedTextStyle}
            data={classList}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder="Pilih grup kelas"
            value={groupIdSelected}
            onChange={item => {
              setGroupIdSelected(item.value);
            }}
          />
        )}
        <TouchableOpacity
          style={[
            Styles.button,
            {
              opacity:
                institute_code === '' ||
                (schoolIsTrue && groupIdSelected == '') ||
                isLoading
                  ? 0.5
                  : 1,
            },
          ]}
          onPress={onPressHandler}
          disabled={
            institute_code === '' || (isLoading && groupIdSelected == '')
          }>
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
  },
  button: {
    backgroundColor: '#CC3663',
    verticalAlign: 'bottom',
    borderRadius: 15,
    marginVertical: 25,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderRadius: 13,
    flex: 1,
    marginVertical: 20,
    elevation: 8,
    shadowColor: '#00000050',
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black',
  },
});

export default RegistInstitutionBK;

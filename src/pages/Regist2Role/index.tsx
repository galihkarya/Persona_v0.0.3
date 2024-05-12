
import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';

const RegistRole = ({navigation, route}:any) => {
  const {full_name} = route.params;
  const [role, set_role] = useState<String>('');
  const ref = useRef<IDropdownRef>(null);
  const data = [
    {label: 'Guru BK', value: 'bk'},
    {label: 'Wali Kelas/lainnya', value: 'wk'},
  ];

  const onPressHandler = () => {
    if (role === 'bk'){
      navigation.navigate('RegistInstitutionBK', {full_name, role})
    }
    else if (role === 'wk'){
      navigation.navigate('RegistInstitutionWK', {full_name, role})
    }
  }

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
      <View style={{marginTop: 50, marginBottom: 30, alignItems: 'center'}}>
        <Image
          style={Styles.imageCenter}
          source={require('../../../assets/images/thinking_face.png')}
        />
        <Text style={Styles.head1}>Role</Text>
        <Text style={Styles.head2}>Tentukan role anda di bawah ini</Text>
      </View>
      <View style={{margin: 20}}>
        <Dropdown
          ref={ref}
          style={Styles.dropdown}
          placeholderStyle={Styles.placeholderStyle}
          selectedTextStyle={Styles.selectedTextStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Pilih role"
          value={role}
          onChange={item => {
            set_role(item.value);
          }}
        />
        <TouchableOpacity
          style={[Styles.button, {opacity: role === '' ? 0.5 : 1}]}
          onPress={onPressHandler}
          disabled={ role === '' }>

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
    marginVertical: 20,
    verticalAlign: 'bottom',
    borderRadius: 15,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFFFFF',
    paddingVertical: 15,
    fontSize: 16,
  },
  dropdown: {
    marginVertical: 10,
    height: 50,
    elevation: 8,
    shadowColor: '#00000050',
    backgroundColor: '#fefefe',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default RegistRole;

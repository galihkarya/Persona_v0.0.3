import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Appearance, StatusBar} from 'react-native';
import {Dropdown, IDropdownRef} from 'react-native-element-dropdown';

const RegistRole = ({navigation, route}:any) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const {full_name} = route.params;
  const [role, set_role] = useState('');
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
    <View style={[theme == 'light' ? Styles.containerLightTheme1 : Styles.containerDarkTheme1, {flex: 1}]}>
      <StatusBar barStyle={theme == 'light' ? 'dark-content' : 'light-content'} backgroundColor={theme == 'light' ? Styles.containerLightTheme1.backgroundColor : Styles.containerDarkTheme1.backgroundColor}/>
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
      <View style={{marginTop: 50, marginBottom: 30, alignItems: 'center'}}>
        <Image
          style={Styles.imageCenter}
          source={require('../../../assets/images/thinking_face.png')}
        />
        <Text style={[Styles.head1, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Role</Text>
        <Text style={[Styles.head2, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}>Tentukan role anda di bawah ini</Text>
      </View>
      <View style={{margin: 20}}>
        <Dropdown
          ref={ref}
          style={[Styles.dropdown, theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}
          placeholderStyle={[Styles.placeholderStyle, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}
          selectedTextStyle={[Styles.selectedTextStyle, theme == 'light' ? Styles.textLightTheme : Styles.textDarkTheme]}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Pilih role"
          value={role}
          containerStyle={[theme == 'light' ? Styles.containerLightTheme2 : Styles.containerDarkTheme2]}
          onChange={item => {
            set_role(item.value);
          }}
        />
        <TouchableOpacity
          style={[Styles.button, {opacity: role === '' ? 0.5 : 1}]}
          onPress={onPressHandler}
          disabled={ role === '' }>

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
  imageCenter: {
    width: 200,
    height: 200,
  },
  head1: {
    fontWeight: '700',
    fontSize: 40,
    marginVertical: 20,
  },
  head2: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#CC3663',
    marginVertical: 20,
    verticalAlign: 'bottom',
    borderRadius: 15,
  },
  textButton: {
    textAlign: 'center',
    color: '#f0f0f0',
    paddingVertical: 15,
    fontSize: 16,
  },
  dropdown: {
    marginVertical: 10,
    height: 50,
    elevation: 8,
    shadowColor: '#00000050',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    opacity: 0.5
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default RegistRole;

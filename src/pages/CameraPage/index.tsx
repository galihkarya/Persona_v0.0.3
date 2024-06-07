import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useEffect, useState, useRef} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  TakePhotoOptions,
} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import api from '../../API/UserApi';

const CameraPage = ({navigation, route}: any) => {
  const {name, gender, student_name, group_id} = route.params;
  console.log(name, gender, student_name, group_id);

  const flashOnIcon = require('../../../assets/icons/icon_flash_on.png');
  const flashOffIcon = require('../../../assets/icons/icon_flash_off.png');

  const [isLoading, setIsLoading] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const [widthViewFinder, setWidthViewFinder] = useState(99);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidthViewFinder(100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const device = useCameraDevice('back');

  const format = useCameraFormat(device, [
    {
      autoFocusSystem: 'contrast-detection',
      photoResolution: {width: 640, height: 640},
      photoAspectRatio: 1 / 1,
    },
  ]);

  const [flash, setFlash] = useState<TakePhotoOptions['flash']>('off');

  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [photoURI, setPhotoURI] = useState('');
  const [photoFileName, setPhotoFileName] = useState<string | null>('');
  const [photoType, setPhotoType] = useState('');

  const camera = useRef<Camera>(null);

  const onTakePicturePressed = async () => {
    setIsTakingPhoto(true);
    try {
      const photo = await camera.current?.takePhoto({
        qualityPrioritization: 'quality',
        flash,
        enableShutterSound: false,
      });
      console.log(photo);

      const takenPhoto = await CameraRoll.saveAsset(`file://${photo?.path}`, {
        type: 'photo',
      });

      console.log(takenPhoto);

      setPhotoURI(takenPhoto.node.image.uri);
      setPhotoFileName(takenPhoto.node.image.filename);
      setPhotoType(takenPhoto.node.type);
    } catch (error) {
      console.error('Error taking photo:', error);
    } finally {
      setIsTakingPhoto(false);
    }
  };

  const buttonHandler = async () => {
    setIsLoading(true);
    const photo = new FormData();
    photo.append('image', {
      name: photoFileName,
      type: photoType,
      uri: photoURI,
    });

    const dataParams = {
      student_name: student_name,
      gender: gender,
      group_id: group_id,
    };

    // console.log(photo);
    // console.log(dataParams);
    // console.log(`/api/v1/result?${new URLSearchParams(dataParams).toString()}`);

    const path = `/api/v1/result/?${new URLSearchParams(
      dataParams,
    ).toString()}`;
    // console.log(path);

    if (student_name == undefined) {
      await api
        .post('/api/v1/result/predict', photo, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({data}) => {
          console.log('ini data', data);
          navigation.navigate('ResultGeneralPage', {
            name,
            gender,
            heart_line: data.heart_line,
            life_line: data.life_line,
            head_line: data.head_line,
          });
        })
        .catch(ex => console.log('ini bawah', ex, name, gender));
    } else {
      await api
        .post(path, photo, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({data}) => {
          navigation.navigate('ResultPage', {
            student_name,
            gender,
            group_id,
            heart_line: data.heart_line,
            life_line: data.life_line,
            head_line: data.head_line,
          });
        });
    }
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#000000'} />

      {photoURI ? (
        <>
          <View style={{backgroundColor: 'black', flex: 1}}>
            <View style={{height: 80}} />
            <Image source={{uri: photoURI}} style={Styles.viewFinder} />
            <View
              style={{
                position: 'absolute',
                bottom: 50,
                alignSelf: 'center',
                width: '100%',
                gap: 10,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#CC3663',
                  marginHorizontal: 20,
                  borderRadius: 15,
                  opacity: isLoading ? 0.3 : 1,
                }}
                disabled={isLoading}
                onPress={async () => buttonHandler()}>
                {isLoading ? (
                  <ActivityIndicator
                    color={'#FFFFFF'}
                    size={'large'}
                    style={{paddingVertical: 7}}
                  />
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#FFFFFF',
                      paddingVertical: 15,
                      fontSize: 14,
                    }}>
                    lanjut
                  </Text>
                )}
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
                  navigation.goBack();
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#CC3663',
                    paddingVertical: 15,
                    fontSize: 14,
                  }}>
                  ulang foto
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={Styles.backButton}
            hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={Styles.backIcon}
              source={require('../../../assets/icons/icon_arrowLeftCircled.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={Styles.instruction}>Posisikan Tangan Kamu</Text>
          </View>
          <View style={{justifyContent: 'center', marginTop: 50}}>
            <View style={Styles.guideline} />
            <Image
              style={Styles.palmGuidelines}
              source={require('../../../assets/images/palm_guidelines.png')}
            />
            {device && (
              <Camera
                ref={camera}
                style={[Styles.viewFinder, {width: `${widthViewFinder}%`}]}
                device={device}
                isActive={true}
                format={format}
                photo={true}
                orientation="portrait"
              />
            )}
          </View>
          <TouchableOpacity
            style={Styles.shutterButton}
            onPress={onTakePicturePressed}
            disabled={isTakingPhoto}
          />
          <TouchableOpacity
            onPress={() =>
              setFlash(curValue => (curValue === 'off' ? 'on' : 'off'))
            }
            style={Styles.flashButton}>
            <Image
              source={flash === 'on' ? flashOnIcon : flashOffIcon}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  backIcon: {
    width: 30,
    height: 30,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 5,
  },
  instruction: {
    color: '#cc3663',
    backgroundColor: '#fefefe',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontWeight: '700',
    fontSize: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  shutterButton: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderColor: '#cc3663',
    borderWidth: 5,
    backgroundColor: '#fefefe',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
    zIndex: 4,
  },
  viewFinder: {
    aspectRatio: 1,
    justifyContent: 'center',
  },
  guideline: {
    zIndex: 3,
    width: '55%',
    height: '55%',
    alignSelf: 'center',
    borderColor: '#cc3663',
    borderWidth: 5,
    opacity: 0.7,
    position: 'absolute',
  },
  palmGuidelines: {
    position: 'absolute',
    zIndex: 2,
    width: '115%',
    height: '115%',
    alignSelf: 'center',
  },
  flashButton: {
    position: 'absolute',
    zIndex: 2,
    bottom: 65,
    right: 70,
    padding: 10,
  },
});

export default CameraPage;

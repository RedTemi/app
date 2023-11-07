import { AntDesign, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Camera as ExpoCamera, CameraCapturedPicture, PermissionStatus } from 'expo-camera';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

import useImgPicker from '../hooks/img_picker';
import useUpload from '../hooks/img_upload';
import { CameraScreenProp } from '../navigation/main';

export type CameraScreenParams = {
  navigateTo: string;
};

const Camera = () => {
  const [type, setType] = useState(ExpoCamera.Constants.Type.front);
  const cameraRef = useRef<ExpoCamera | null>(null);

  const { image, pickImage } = useImgPicker();
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const uploadImage = useUpload();
  const { navigate } = useNavigation();
  const route = useRoute<CameraScreenProp>();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
      if (status !== PermissionStatus.GRANTED) {
        navigate(route.params.navigateTo);
      }
      setHasCameraPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!image?.uri) {
        return;
      }

      await uploadImage(image);
      navigate(route.params.navigateTo);
    })();
  }, [image]);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const postPhoto = async () => {
    if (!photo?.uri) {
      return;
    }

    if (type === ExpoCamera.Constants.Type.front) {
      const frontCameraPhotoMirrored = await manipulateAsync(photo.uri, [{ flip: FlipType.Horizontal }], {
        format: SaveFormat.JPEG,
      });

      await uploadImage(frontCameraPhotoMirrored);
      navigate(route.params.navigateTo);
      return;
    }

    await uploadImage(photo);
    navigate(route.params.navigateTo);
  };

  const isFrontCameraOpen = type === ExpoCamera.Constants.Type.front;

  if (!hasCameraPermission) {
    return <View />;
  }

  if (photo) {
    return (
      <ImageBackground
        source={{ uri: photo.uri }}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          ...(isFrontCameraOpen && {
            transform: [{ scaleX: -1 }],
          }),
        }}
        resizeMode="cover"
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: screenWidth,
            padding: 30,
            paddingBottom: 40,
            ...(isFrontCameraOpen && {
              transform: [{ scaleX: -1 }],
            }),
          }}
        >
          <TouchableOpacity onPress={() => setPhoto(null)}>
            <AntDesign name="close" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={postPhoto}>
            <Entypo name="check" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ExpoCamera style={{ width: screenWidth, height: screenHeight, flex: 1 }} type={type} ratio="16:9" ref={cameraRef}>
      <TouchableOpacity
        onPress={() => {
          navigate(route.params.navigateTo);
        }}
      >
        <AntDesign name="close" size={30} color="white" style={{ marginLeft: 30, marginTop: 40 }} />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImage}>
          <MaterialIcons name="add-to-photos" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            cameraRef.current?.takePictureAsync({
              exif: false,
              quality: 1,
              onPictureSaved: data => setPhoto(data),
            });
          }}
        >
          <Ionicons name={'radio-button-on'} size={80} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setType(isFrontCameraOpen ? ExpoCamera.Constants.Type.back : ExpoCamera.Constants.Type.front);
          }}
        >
          <Ionicons name={'camera-reverse-outline'} size={40} color="white" />
        </TouchableOpacity>
      </View>
    </ExpoCamera>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    bottom: 40,
    position: 'absolute',
  },
});

export default Camera;

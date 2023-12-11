import { AppState, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './styles';
import AppText from '~components/AppText';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import AppIcon from '~components/AppIcon';
import { COLORS } from '~constants/colors';
import { uploadFile } from '~services/shared/files.services';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();
  const [isActive, setIsActive] = useState(false);
  const [cameraDirection, setCameraDirection] = useState('back');
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const appState = useRef(AppState.currentState);
  const cameraRef = useRef(null);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    if (devices.length > 0) {
      const actualDevice = devices.find(item => item.position === cameraDirection);
      setDevice(actualDevice);
    }
  }, [cameraDirection, devices]);

  const devices = useCameraDevices();

  const takePhoto = useCallback(async () => {
    if (isCameraInitialized) {
      try {
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
        });
        console.log('photo', photo);
        uploadFile({ path: `file://${photo.path}`, mime: 'image/jpeg' });
      } catch (error) {
        console.log('error', error);
      }
    }
  }, [isCameraInitialized]);

  const handleSwitchCamera = useCallback(() => {
    if (cameraDirection === 'back') {
      setCameraDirection('front');
    } else {
      setCameraDirection('back');
    }
  }, [cameraDirection]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log('appStateVisible', appStateVisible);
    console.log('isFocused', isFocused);
    if (appStateVisible === 'active' && isFocused) {
      setIsActive(true);
    }
  }, [appStateVisible, isFocused]);

  useEffect(() => {
    check(PERMISSIONS.ANDROID.CAMERA).then(status => {
      console.log('status', status);
      switch (status) {
        case RESULTS.GRANTED:
          setHasPermission(true);
          console.log('Camera Permisison granted');
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.CAMERA).then(reqStatus => {
            if (reqStatus === RESULTS.GRANTED) {
              setHasPermission(true);
              console.log('Camera Permisison granted');
            } else {
              console.log('Request camera permission failed');
            }
          });
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)');
          break;
        default:
          break;
      }
    });
  }, []);

  if (!hasPermission || !device) {
    return (
      <View style={styles.container}>
        <AppText align="center">Camera not ready yet!</AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        photo={true}
        // video={true}
        // audio={true}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        onInitialized={() => {
          setIsCameraInitialized(true);
        }}
      />
      <TouchableOpacity activeOpacity={0.5} onPress={takePhoto} style={styles.shotButton} />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleSwitchCamera}
        style={styles.switchButton}>
        <AppIcon
          type="material-community"
          name="camera-flip-outline"
          size={24}
          color={COLORS.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;

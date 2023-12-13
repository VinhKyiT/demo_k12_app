import { AppState, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './styles';
import AppText from '~components/AppText';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import { Camera, useCameraDevices, useCameraFormat } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import AppIcon from '~components/AppIcon';
import { COLORS } from '~constants/colors';
import { uploadFile } from '~services/shared/files.services';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { MODE } from './config';

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
  const [mode, setMode] = useState(MODE.PHOTO);
  const [isRecording, setIsRecording] = useState(false);
  const format = useCameraFormat(device, [
    { videoResolution: { width: 1280, height: 720 } },
    { fps: 30 },
  ]);

  useEffect(() => {
    if (devices.length > 0) {
      const actualDevice = devices.find(item => item.position === cameraDirection);
      setDevice(actualDevice);
    }
  }, [cameraDirection, devices]);

  const devices = useCameraDevices();

  const handleShot = useCallback(async () => {
    if (!isCameraInitialized) {
      return;
    }
    if (isRecording) {
      await cameraRef.current.stopRecording();
      setIsRecording(false);
      return;
    }
    if (mode === MODE.PHOTO) {
      try {
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
        });
        // console.log('photo', photo);
        // uploadFile({ path: `file://${photo.path}`, mime: 'image/jpeg' });
        await CameraRoll.save(`file://${photo.path}`, {
          type: 'photo',
        });
      } catch (error) {
        console.log('error', error);
      }
    } else if (mode === MODE.VIDEO) {
      cameraRef.current.startRecording({
        onRecordingFinished: async video => {
          const path = video.path;
          await CameraRoll.save(`file://${path}`, {
            type: 'video',
          });
        },
        onRecordingError: error => console.error(error),
      });
      setIsRecording(true);
    }
  }, [isCameraInitialized, isRecording, mode, setIsRecording]);

  const handleSwitchCamera = useCallback(() => {
    if (cameraDirection === 'back') {
      setCameraDirection('front');
    } else {
      setCameraDirection('back');
    }
  }, [cameraDirection]);

  const handleSwitchMode = useCallback(currentMode => {
    setMode(currentMode);
  }, []);

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
    requestMultiple([PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, PERMISSIONS.ANDROID.READ_MEDIA_VIDEO])
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
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
        format={format}
        ref={cameraRef}
        photo={mode === MODE.PHOTO ? true : undefined}
        video={mode === MODE.VIDEO ? true : undefined}
        // audio={true}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        onInitialized={() => {
          setIsCameraInitialized(true);
        }}
      />
      <View style={styles.cameraControlView}>
        <View style={styles.modeSwitcherView}>
          <TouchableOpacity onPress={() => handleSwitchMode(MODE.PHOTO)}>
            <AppText
              color={COLORS.WHITE}
              size={16}
              weight={mode === MODE.PHOTO ? 'bold' : 'regular'}>
              Photo
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSwitchMode(MODE.VIDEO)}>
            <AppText
              color={COLORS.WHITE}
              size={16}
              weight={mode === MODE.VIDEO ? 'bold' : 'regular'}>
              Video
            </AppText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleShot}
          style={[styles.shotButton, isRecording && { backgroundColor: COLORS.APP_RED }]}
        />
      </View>
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

import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet, View, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { IMAGES } from '~assets/images';
import AppText from '~components/AppText';
import styles from './styles';

const CodeScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();
  const [isActive, setIsActive] = useState(false);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const appState = useRef(AppState.currentState);
  const cameraRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      // console.log(`Scanned ${codes.length} codes!`);
      // console.log(codes[0].value);
      setScannedCode(codes[0].value);
    },
  });

  console.log('isActive', isActive);

  const device = useCameraDevice('back');

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
    if (scannedCode) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [appStateVisible, isFocused, scannedCode]);

  const handleScannedCode = useCallback(async code => {
    if (code && typeof code === 'string') {
      console.log('isURL', code.includes('https://'));
      // switch (code) {
      //   case code.includes('https://'):
      //     console.log('matched');
      //     await InAppBrowser.open(code);
      //     break;
      //   default:
      //     console.log('Code khong hop le');
      //     return;
      // }
      if (code.includes('https://')) {
        await InAppBrowser.open(code);
      }
      setTimeout(() => {
        setScannedCode(null);
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (scannedCode) {
      // Alert.alert('Message', scannedCode?.toString(), [
      //   {
      //     text: 'Ok',
      //     onPress: () => {
      //       setScannedCode(null);
      //     },
      //   },
      // ]);
      handleScannedCode(scannedCode);
    }
  }, [scannedCode, handleScannedCode]);

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
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        onInitialized={() => {
          setIsCameraInitialized(true);
        }}
        codeScanner={codeScanner}
      />
      <View style={StyleSheet.absoluteFill}>
        <FastImage
          source={IMAGES.CODE_SCANNER_FRAME}
          style={{ ...StyleSheet.absoluteFillObject }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default CodeScannerScreen;

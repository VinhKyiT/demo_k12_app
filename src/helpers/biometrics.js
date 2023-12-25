import ReactNativeBiometrics from 'react-native-biometrics';
import { setBiometricsEnable } from '~redux/auth/auth.actions';
import { store } from '~redux/store';

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

const setupBiometrics = async (successCallback, errorCallback) => {
  const isBiometricSupported = await rnBiometrics.isSensorAvailable();
  if (!isBiometricSupported) {
    console.log('Khong ho tro sinh trac hoc');
    errorCallback?.();
    return;
  }
  rnBiometrics
    .simplePrompt({ promptMessage: 'Confirm fingerprint' })
    .then(resultObj => {
      const { success } = resultObj;
      if (success) {
        console.log('confirm biometric success');
        store.dispatch(setBiometricsEnable(success));
        successCallback?.();
      } else {
        console.log('cancelled');
        errorCallback?.();
      }
    })
    .catch(() => {
      console.log('biometrics failed');
      errorCallback?.();
    });
};

export { setupBiometrics };

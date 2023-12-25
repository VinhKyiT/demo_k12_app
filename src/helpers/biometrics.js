import ReactNativeBiometrics from 'react-native-biometrics';
import { setBiometrics } from '~redux/auth/auth.actions';
import { store } from '~redux/store';
const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

const setupBiometrics = async (successCallback, errorCallback) => {
  const isBiometricSupported = await rnBiometrics.isSensorAvailable();
  if (!isBiometricSupported) {
    errorCallback?.();
    return false;
  }
  await rnBiometrics
    .simplePrompt({ promptMessage: 'Confirm fingerprint' })
    .then(resultObject => {
      const { success } = resultObject;

      if (success) {
        console.log('successful biometrics provided');
        store.dispatch(setBiometrics(success));
        successCallback?.();
        return true;
      } else {
        console.log('user cancelled biometric prompt');
        errorCallback?.();
        return false;
      }
    })
    .catch(() => {
      console.log('biometrics failed');
      return false;
    });
};

export { setupBiometrics };

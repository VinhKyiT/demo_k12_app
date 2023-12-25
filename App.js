import React, { useEffect, useLayoutEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppModal from '~components/AppModal';
import { initLocale } from '~i18n';
import MainNavigator from './src/routes/MainNavigator';
import { COLORS } from './src/constants/colors';
import { Provider } from 'react-redux';
import { persistor, store } from '~redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  allowPushNotification,
  createChanel,
  onDisplayNotification,
} from './src/services/shared/notification.service';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import codePush from 'react-native-code-push';
import CodePushProvider from '~contexts/CodePush';
import DeepLinkProvider from '~contexts/DeepLink';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-toast-message';

const App = () => {
  GoogleSignin.configure({
    webClientId: '39417402772-6pb0ovgbm9hsaoafelpk76ssl4cp72v7.apps.googleusercontent.com',
  });

  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
    enableBackgroundLocationUpdates: true,
  });

  useLayoutEffect(() => {
    initLocale();
  }, []);

  useEffect(() => {
    allowPushNotification(async () => {
      createChanel();
      const deviceToken = await messaging().getToken();
      console.log('deviceToken', deviceToken);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });
  // }, []);

  // Bootstrap sequence function
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log('Notification caused application to open', initialNotification.notification);
      console.log('Press action used to open the app', initialNotification.pressAction);
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => {})
      .catch(console.error);
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
        case EventType.ACTION_PRESS:
          if (detail.pressAction.id === 'mark-as-read') {
            console.log('Nhan vao nut da xem');
          } else if (detail.pressAction.id === 'reply') {
            console.log('Tra loi tin nhan', detail.input);
          }
      }
    });
  }, []);

  // console.log(store.getState());
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RootSiblingParent>
                <DeepLinkProvider>
                  <MainNavigator />
                  <AppModal />
                  <Toast />
                </DeepLinkProvider>
              </RootSiblingParent>
            </PersistGate>
          </Provider>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCREEN_BG,
  },
});

const AppWrapper = () => {
  return (
    <CodePushProvider>
      <App />
    </CodePushProvider>
  );
};

export default AppWrapper;

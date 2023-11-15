import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppModal from '~components/AppModal';
import { initLocale } from '~i18n';
import { persistor, store } from '~redux/store';
import { COLORS } from './src/constants/colors';
import MainNavigator from './src/routes/MainNavigator';
import { RootSiblingParent } from 'react-native-root-siblings';

const App = () => {
  useLayoutEffect(() => {
    initLocale();
  }, []);
  // console.log(store.getState());
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RootSiblingParent>
                <MainNavigator />
                <AppModal />
              </RootSiblingParent>
            </PersistGate>
          </Provider>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCREEN_BG,
  },
});

export default App;

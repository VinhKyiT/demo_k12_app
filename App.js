import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppModal from '~components/AppModal';
import { initLocale } from '~i18n';
import MainNavigator from './src/routes/MainNavigator';
import { COLORS } from './src/constants/colors';
import { Provider } from 'react-redux';
import { store } from '~redux/store';

const App = () => {
  useLayoutEffect(() => {
    initLocale();
  }, []);
  // console.log(store.getState());
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Provider store={store}>
            <MainNavigator />
            <AppModal />
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

export default App;

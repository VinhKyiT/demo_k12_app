import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppModal from '~components/AppModal';
import AuthContextProvider from '~contexts/AuthContext/AuthContextProvider';
import { initLocale } from '~i18n';
import MainNavigator from './src/routes/MainNavigator';

const App = () => {
  useLayoutEffect(() => {
    initLocale();
  }, []);
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <AuthContextProvider>
            <MainNavigator />
            <AppModal />
          </AuthContextProvider>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

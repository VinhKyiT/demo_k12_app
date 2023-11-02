import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppModal from '~components/AppModal';
import AuthContextProvider from '~contexts/AuthContext/AuthContextProvider';
import { initLocale } from '~i18n';
import MainNavigator from './src/routes/MainNavigator';
import CartContextProvider from '~contexts/CartContext/CartContextProvider';
import { COLORS } from './src/constants/colors';

const App = () => {
  useLayoutEffect(() => {
    initLocale();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <AuthContextProvider>
            <CartContextProvider>
              <MainNavigator />
              <AppModal />
            </CartContextProvider>
          </AuthContextProvider>
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

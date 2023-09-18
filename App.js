import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthContextProvider from '~contexts/AuthContext/AuthContextProvider';
import CartContextProvider from './src/contexts/CartContext/CartContextProvider';
import MainNavigator from './src/routes/MainNavigator';

const App = () => {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <AuthContextProvider>
            <CartContextProvider>
              <MainNavigator />
            </CartContextProvider>
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

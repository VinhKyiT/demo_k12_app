import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/routes/MainNavigator';
import AuthContextProvider from '~contexts/AuthContext/AuthContextProvider';

const App = () => {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <AuthContextProvider>
            <MainNavigator />
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

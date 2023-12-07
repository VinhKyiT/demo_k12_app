import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/colors';
import { RootSiblingPortal } from 'react-native-root-siblings';

const AppLoading = () => {
  return (
    <RootSiblingPortal>
      <View style={styles.container}>
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator size={'large'} color={COLORS.APP_ORANGE} />
        </View>
      </View>
    </RootSiblingPortal>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorWrapper: {
    width: 150,
    height: 100,
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

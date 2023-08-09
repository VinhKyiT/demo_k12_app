import React from 'react';
import { View, StyleSheet } from 'react-native';

const AbsoluteLayoutDemo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1} />
      <View style={styles.box2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Không cần đặt 'position', vì giá trị mặc định của 'position' là 'relative'
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: 'blue',
  },
  box1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    left: 20,
    top: 20,
    position: 'absolute',
  },
});

export default AbsoluteLayoutDemo;

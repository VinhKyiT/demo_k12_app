import React from 'react';
import { View, StyleSheet } from 'react-native';

const RelativeLayoutDemo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1} />
      <View style={styles.box2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Không cần đặt 'position', vì giá trị mặc định của 'position' là 'relative'
    position: 'relative',
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
  },
});

export default RelativeLayoutDemo;

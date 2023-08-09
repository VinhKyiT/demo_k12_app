import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LotsOfStyles = () => {
  return (
    <View style={{ marginTop: 50, backgroundColor: 'green', height: 300 }}>
      <Text style={{ color: 'red' }}>just red</Text>
      <Text
        style={{
          color: 'blue',
          fontWeight: 'bold',
          fontSize: 30,
        }}>
        just bigBlue
      </Text>
      <Text
        style={[
          {
            color: 'blue',
            fontWeight: 'bold',
            fontSize: 30,
          },
          {
            color: 'red',
          },
        ]}>
        bigBlue, then red
      </Text>
      <Text
        style={[
          {
            color: 'red',
          },
          {
            color: 'blue',
            fontWeight: 'bold',
            fontSize: 30,
          },
        ]}>
        red, then bigBlue
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default LotsOfStyles;

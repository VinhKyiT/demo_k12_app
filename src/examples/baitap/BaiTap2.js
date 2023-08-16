import { View, Text, Switch, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';

const BaiTap2 = () => {
  const [isDarkmode, setIsDarkmode] = useState(false);
  console.log('isDarkmode', isDarkmode);
  return (
    <View style={[styles.container, isDarkmode && styles.containerDark]}>
      <Text style={[styles.text, isDarkmode && styles.textDark]}>
        Đây là dòng chữ được in ra màn hình
      </Text>
      <CustomButton title="button" onPress={() => {}} />
      <Switch value={isDarkmode} onValueChange={setIsDarkmode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDark: {
    backgroundColor: '#333',
  },
  text: {
    color: '#333',
    fontSize: 18,
  },
  textDark: {
    color: '#fff',
  },
});

export default BaiTap2;

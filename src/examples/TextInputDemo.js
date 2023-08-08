import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';

const UselessTextInput = () => {
  const [text, setText] = React.useState('Vinh Ky');
  const [number, setNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setText(text);
        }}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={setNumber}
        value={number}
        placeholder="Hay nhap mat khau"
        keyboardType="number-pad"
        secureTextEntry
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UselessTextInput;

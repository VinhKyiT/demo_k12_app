import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const KeyboardAvoidingViewDemo = () => {
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 200,
      }}
      behavior="position" // Có thể sử dụng 'height', 'position', hoặc 'padding'
    >
      <View>
        <TextInput
          placeholder="Username"
          style={{
            marginBottom: 10,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 8,
            width: 250,
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 8,
            width: 250,
          }}
        />
        <TouchableOpacity onPress={() => {}}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingViewDemo;

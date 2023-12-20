import { View, Text, TextInput, TouchableOpacity, Linking } from 'react-native';
import React, { useState } from 'react';

const LoginAgentApp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const body = JSON.stringify({
        email,
        password,
      });
      const resJson = await fetch('https://store.kybuidev.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const res = await resJson.json();
      if (res?.access_token) {
        Linking.openURL(
          `nestechapp://loginSuccess?access_token=${res?.access_token}&refresh_token=${res?.refresh_token}`,
        );
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18 }}>Login</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Vui lòng nhập email"
        style={{
          marginVertical: 8,
          borderRadius: 8,
          borderColor: 'black',
          borderWidth: 1,
          paddingHorizontal: 8,
        }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Vui lòng nhập password"
        secureTextEntry
        style={{
          marginVertical: 8,
          borderRadius: 8,
          borderColor: 'black',
          borderWidth: 1,
          paddingHorizontal: 8,
        }}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: 'gray', borderRadius: 8, padding: 16 }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 16,
            color: 'white',
          }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginAgentApp;

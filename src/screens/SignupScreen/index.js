import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import CustomButton from '~components/CustomButton';
import { useAuth } from '~hooks/useAuth';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { handleSignup, isLoading } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>Đăng ký tài khoản</Text>
      <TextInput
        style={{
          borderColor: '#333',
          borderWidth: 1,
          borderRadius: 8,
          width: '100%',
          marginTop: 16,
          paddingHorizontal: 8,
        }}
        value={name}
        onChangeText={setName}
        placeholder="Vui lòng nhập họ tên"
      />
      <TextInput
        style={{
          borderColor: '#333',
          borderWidth: 1,
          borderRadius: 8,
          width: '100%',
          marginTop: 16,
          paddingHorizontal: 8,
        }}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholder="Vui lòng nhập email"
      />
      <TextInput
        style={{
          borderColor: '#333',
          borderWidth: 1,
          borderRadius: 8,
          width: '100%',
          marginTop: 16,
          paddingHorizontal: 8,
        }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Vui lòng nhập password"
      />

      <CustomButton
        onPress={() => handleSignup(name, email, password)}
        title={'Đăng Ký'}
        isLoading={isLoading}
        titleStyle={{ color: '#fff' }}
        loadingIndicatorProps={{ color: '#fff' }}
        style={{
          width: '100%',
          backgroundColor: '#2c9ee6',
          marginTop: 16,
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
      />
    </View>
  );
};

export default React.memo(SignupScreen);

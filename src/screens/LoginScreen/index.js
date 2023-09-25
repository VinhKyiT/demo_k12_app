import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import CustomButton from '~components/CustomButton';
import { useAuth } from '~hooks/useAuth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const { handleLogin, isLoading } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text>Vui lòng đăng nhập</Text>
      <TextInput
        style={{
          borderColor: '#333',
          borderWidth: 1,
          borderRadius: 8,
          width: '100%',
          marginTop: 16,
          paddingHorizontal: 8,
          paddingVertical: 12,
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
          paddingVertical: 12,
        }}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Vui lòng nhập password"
      />

      <CustomButton
        onPress={() => handleLogin(email, password)}
        title={'Đăng nhập'}
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
      <Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlignVertical: 'center',
          lineHeight: 24,
          marginTop: 16,
        }}>
        Chưa có tài khoản?{' '}
        <Text
          onPress={() => {
            navigation.navigate('SignupScreen');
          }}>
          Đăng ký ngay
        </Text>
      </Text>
    </View>
  );
};

export default React.memo(LoginScreen);

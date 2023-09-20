import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, ToastAndroid, View } from 'react-native';
import CustomButton from '~components/CustomButton';
import { useAuth } from '~hooks/useAuth';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const { handleSignup, isLoading } = useAuth();

  const onSignupButtonPress = async () => {
    try {
      if ((email, password, name)) {
        const result = await handleSignup(name, email, password);
        const error = result?.response?.data?.message;
        if (error) {
          ToastAndroid.show(error.toString(), ToastAndroid.LONG);
        }
        if (result) {
          navigation.goBack();
        }
      } else {
        ToastAndroid.show('Vui lòng nhập đủ thông tin', 3000);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

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
        onPress={onSignupButtonPress}
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

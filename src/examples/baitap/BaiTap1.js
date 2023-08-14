import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';

const BaiTap1 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const CustomButton = ({ onPress, title = '' }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingHorizontal: 40,
          paddingVertical: 20,
          backgroundColor: '#D9D9D9',
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  const handleLogin = async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/users/2');
    const responseJson = await response.json();
    if (
      responseJson.email.toLowerCase() === email.toLocaleLowerCase().trim() &&
      responseJson.password === password
    ) {
      setIsLoggedIn(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        {isLoggedIn ? (
          <Text>Email: {email}</Text>
        ) : (
          <>
            <TextInput
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
              placeholder="Hãy nhập email"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Hãy nhập mật khẩu"
            />
          </>
        )}
        <CustomButton
          onPress={isLoggedIn ? handleLogout : handleLogin}
          title={isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'}
        />
      </View>
    </View>
  );
};

export default BaiTap1;

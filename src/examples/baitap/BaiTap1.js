import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '../../components/CustomButton';

const BaiTap1 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingLoginButton, setIsLoadingLoginButton] = useState(false);
  const [isEmailNotValid, setIsEmailNotValid] = useState(false);

  const handleLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  const handleLogin = async () => {
    setIsLoadingLoginButton(true);
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/2');
      const responseJson = await response.json();
      if (
        responseJson.email.toLowerCase() === email.toLocaleLowerCase().trim() &&
        responseJson.password === password
      ) {
        setIsLoggedIn(true);
      }
      setIsLoadingLoginButton(false);
    } catch (error) {
      console.log(error);
      setIsLoadingLoginButton(false);
    }
  };

  const validateEmail = emailToValidate => {
    const expression =
      /^((?:[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.\-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/i;
    return expression.test(String(emailToValidate).toLowerCase());
  };

  useEffect(() => {
    if (email !== '') {
      const checkResult = validateEmail(email);
      setIsEmailNotValid(!checkResult);
    }
  }, [email]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
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
              style={styles.textInput}
            />
            {isEmailNotValid && (
              <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                Vui lòng nhập đúng định dạng email
              </Text>
            )}
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Hãy nhập mật khẩu"
              style={[styles.textInput, { marginTop: 16 }]}
            />
          </>
        )}
        <CustomButton
          onPress={isLoggedIn ? handleLogout : handleLogin}
          title={isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'}
          isLoading={isLoadingLoginButton}
          style={{ marginTop: 16 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
});

export default BaiTap1;

import { View, Text, SafeAreaView, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import { FONTS } from '../../constants/fonts';

const TextEditor = () => {
  const [content, setContent] = useState('');
  const [value, setValue] = useState('');
  const timerRef = useRef();

  const handleChangeContent = text => {
    setValue(text);
    if (text === '') {
      setContent('');
      clearTimeout(timerRef.current);
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      console.log('call');
      setContent(text);
    }, 1000);
  };

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <View>
        <TextInput
          placeholder={'Nhập nội dung'}
          multiline
          style={{
            width: '100%',
            backgroundColor: '#fff',
            alignSelf: 'center',
            borderRadius: 8,
            maxHeight: 150,
          }}
          value={value}
          onChangeText={handleChangeContent}
        />
      </View>
      <View>
        <Text style={{ fontFamily: FONTS.REGULAR, color: '#333' }}>{content}</Text>
      </View>
    </SafeAreaView>
  );
};

export default TextEditor;

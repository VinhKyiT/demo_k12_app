import { View, Text, SafeAreaView, TextInput } from 'react-native';
import React, { useState, useRef, useReducer } from 'react';
import { FONTS } from '../../constants/fonts';

// initialState
const initialState = {
  value: '',
  content: '',
};
// actions
const SET_VALUE = 'SET_VALUE';
const SET_CONTENT = 'SET_CONTENT';
// reducer
const textEditorReducer = (state, action) => {
  switch (action.type) {
    case SET_VALUE: {
      return {
        ...state,
        value: action?.payload,
      };
    }
    case SET_CONTENT: {
      return {
        ...state,
        content: action?.payload,
      };
    }
    default:
      return state;
  }
};
// dispatch

const TextEditor = () => {
  const [state, dispatch] = useReducer(textEditorReducer, initialState);

  const timerRef = useRef();

  const handleChangeContent = text => {
    dispatch({ type: SET_VALUE, payload: text });
    if (text === '') {
      dispatch({ type: SET_CONTENT, payload: '' });
      clearTimeout(timerRef.current);
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      console.log('call');
      dispatch({ type: SET_CONTENT, payload: text });
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
          value={state.value}
          onChangeText={handleChangeContent}
        />
      </View>
      <View>
        <Text style={{ fontFamily: FONTS.REGULAR, color: '#333' }}>{state.content}</Text>
      </View>
    </SafeAreaView>
  );
};

export default TextEditor;

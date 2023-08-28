import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { FONTS } from '../../constants/fonts';

const ThrottlingScreen = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    if (!isDisabled) {
      setClickCount(prev => prev + 1);
      setIsDisabled(true);

      setTimeout(() => setIsDisabled(false), 1000);
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleClick} disabled={isDisabled}>
        <Text style={{ fontSize: 20, fontFamily: FONTS.MEDIUM }}>Throttle Button</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontFamily: FONTS.MEDIUM }}>Click Count: {clickCount}</Text>
    </SafeAreaView>
  );
};

export default ThrottlingScreen;

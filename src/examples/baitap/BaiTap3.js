import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { isPortrait } from '../../utils/responsive';

const BaiTap3 = () => {
  const [isAppPortrait, setIsAppPortrait] = useState(isPortrait());
  useEffect(() => {
    Dimensions.addEventListener('change', ({ window }) => {
      if (window.width < window.height) {
        setIsAppPortrait(true);
      } else {
        setIsAppPortrait(false);
      }
    });
  }, []);

  useEffect(() => {
    console.log('isAppPortrait', isAppPortrait);
  }, [isAppPortrait]);

  return (
    <View style={{ flexDirection: isAppPortrait ? 'column' : 'row' }}>
      {new Array(3).fill('').map(() => {
        return (
          <View
            style={{
              width: 200,
              aspectRatio: 1,
              backgroundColor: 'red',
              marginTop: isAppPortrait ? 20 : 0,
              marginLeft: isAppPortrait ? 0 : 20,
              borderRadius: 16,
            }}
          />
        );
      })}
    </View>
  );
};

export default BaiTap3;

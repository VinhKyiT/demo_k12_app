import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  isPortrait,
  isTablet,
  moderateScale,
  scale,
  verticalScale,
} from '../utils/responsive';

const ResponsiveDemo = () => {
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
    <View>
      <Text style={{ fontSize: scale(40) }}>ResponsiveDemo</Text>
    </View>
  );
};

export default ResponsiveDemo;

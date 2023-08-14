import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { isPortrait } from '../utils/responsive';

const ConditionalExercise02 = () => {
  const [isInPortrait, setIsInPortrait] = useState(isPortrait());
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setIsInPortrait(isPortrait());
    });
  }, []);

  useEffect(() => {
    console.log('isInPortrait', isInPortrait);
  }, [isInPortrait]);

  return (
    <View style={{ flex: 1, padding: 40 }}>
      <View style={{ flex: 1, flexWrap: 'wrap' }}>
        {new Array(12).fill(0).map(_ => {
          return (
            <View
              style={{
                width: isPortrait() ? '40%' : '20%',
                aspectRatio: 1,
                backgroundColor: 'red',
                borderRadius: 20,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default ConditionalExercise02;

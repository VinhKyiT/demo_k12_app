import { View, Text } from 'react-native';
import React from 'react';
import { COLORS } from '~constants/colors';

const Dots = ({ data, currentIndex }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
      }}>
      {Array.isArray(data) && data.length > 0
        ? data.map((_, index) => {
            return (
              <View
                key={'DOT_' + index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: index === currentIndex ? COLORS.APP_ORANGE : COLORS.DOT_INACTIVE,
                  marginHorizontal: 4,
                }}
              />
            );
          })
        : null}
    </View>
  );
};

export default Dots;

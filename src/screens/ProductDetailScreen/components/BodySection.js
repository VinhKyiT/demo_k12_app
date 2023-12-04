import { View } from 'react-native';
import React from 'react';
import AppText from '~components/AppText';

const BodySection = ({ title, description }) => {
  return (
    <View>
      <AppText size={17} variant="rounded" weight="semibold">
        {title}
      </AppText>
      <AppText size={15}>{description}</AppText>
    </View>
  );
};

export default BodySection;

import { View } from 'react-native';
import React, { memo } from 'react';
import AppIcon from '../AppIcon';
import AppText from '../AppText';
import { COLORS } from '../../constants/colors';

const EmptyComponent = ({ icon, title, description }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!!icon && <AppIcon {...icon} />}
      <AppText size={28} weight="semibold" align="center" style={{ marginVertical: 16 }}>
        {title}
      </AppText>
      <AppText size={17} color={COLORS.TEXT_GRAY} align="center">
        {description}
      </AppText>
    </View>
  );
};

export default memo(EmptyComponent);

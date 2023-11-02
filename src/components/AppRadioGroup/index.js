import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS } from '~constants/colors';
import AppIcon from '../AppIcon';
import AppText from '../AppText';

const AppRadioGroup = ({ data, selectingItem, onItemPress }) => {
  return (
    <View style={{ backgroundColor: COLORS.WHITE, padding: 16, borderRadius: 20 }}>
      {data.map(item => {
        return (
          <TouchableOpacity
            onPress={() => onItemPress(item.id)}
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.WHITE,
              marginVertical: 16,
              alignItems: 'center',
            }}
            key={item?.id}>
            <AppIcon
              type="material"
              name={selectingItem === item?.id ? 'radio-button-on' : 'radio-button-off'}
              color={selectingItem === item?.id ? COLORS.LIGHT_ORANGE : COLORS.TEXT_DARK_GRAY}
            />
            {!!item?.icon && (
              <View
                style={{
                  padding: 16,
                  backgroundColor: item.iconBackground,
                  borderRadius: 10,
                  marginHorizontal: 8,
                }}>
                <AppIcon {...item.icon} />
              </View>
            )}
            <AppText>{item?.title}</AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AppRadioGroup;

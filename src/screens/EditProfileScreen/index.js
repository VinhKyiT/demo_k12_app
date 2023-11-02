import { View, ScrollView, TouchableOpacity } from 'react-native';
import React, { memo, useMemo, useState } from 'react';
import styles from './styles';
import AppText from '~components/AppText';
import { COLORS } from '~constants/colors';
import FastImage from 'react-native-fast-image';
import AppIcon from '~components/AppIcon';
import AppHeader from '~components/AppHeader';
import NavigationServices from '~utils/NavigationServices';
import AppRadioGroup from '../../components/AppRadioGroup';

const PAYMENT_OPTIONS = [
  {
    id: 'card',
    title: 'Card',
    icon: {
      type: 'ionicon',
      name: 'card',
      color: 'white',
      size: 16,
    },
    iconBackground: COLORS.LIGHT_ORANGE,
  },
  {
    id: 'bank',
    title: 'Bank account',
    icon: {
      type: 'material-community',
      name: 'bank',
      color: 'white',
      size: 16,
    },
    iconBackground: COLORS.APP_PINK,
  },
  {
    id: 'paypal',
    title: 'Paypal',
    icon: {
      type: 'ionicon',
      name: 'logo-paypal',
      color: 'white',
      size: 16,
    },
    iconBackground: COLORS.APP_SEA_BLUE,
  },
];

const EditProfileScreen = () => {
  const [selectingPayment, setSelectingPayment] = useState(PAYMENT_OPTIONS[0].id);
  const headerLeftIconProps = useMemo(
    () => ({
      leftIconType: 'antdesign',
      leftIconName: 'left',
      leftIconColor: COLORS.BLACK,
      onLeftIconPress: () => {
        NavigationServices.goBack();
      },
    }),
    [],
  );
  return (
    <View style={styles.container}>
      <AppHeader leftIcon={headerLeftIconProps} centerTitle={'My Profile'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileTopArea}>
          <AppText size={18} weight="semibold">
            Information
          </AppText>
        </View>
        <View style={styles.userInfoContainer}>
          <FastImage
            source={{
              uri: 'https://cdn.tuoitre.vn/zoom/480_300/471584752817336320/2023/10/29/mu-ngay-28-10-read-only-16985452171851876173143-156-0-1406-2000-crop-1698545275763112973407.jpg',
            }}
            style={styles.profileImage}
          />
          <View style={styles.infoWrapper}>
            <AppText size={18} weight="semibold">
              Vinh Ky
            </AppText>
            <AppText color={COLORS.TEXT_DARK_GRAY} size={15}>
              kybuidev@gmail.com
            </AppText>
            <AppText color={COLORS.TEXT_DARK_GRAY} size={15}>
              Đường D5, Bình Thạnh, Hồ Chí Minh, Việt Nam
            </AppText>
          </View>
        </View>
        <View style={styles.profileTopArea}>
          <AppText size={18} weight="semibold">
            Payment Method
          </AppText>
        </View>
        <AppRadioGroup
          data={PAYMENT_OPTIONS}
          selectingItem={selectingPayment}
          onItemPress={setSelectingPayment}
        />
      </ScrollView>
    </View>
  );
};

export default memo(EditProfileScreen);

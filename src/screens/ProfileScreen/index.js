import { View, ScrollView, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import styles from './styles';
import AppText from '~components/AppText';
import { COLORS } from '~constants/colors';
import FastImage from 'react-native-fast-image';
import AppIcon from '~components/AppIcon';
import NavigationServices from '~utils/NavigationServices';
import { ROUTES } from '~constants/routes';

const PROFILE_CHOICES = [
  {
    id: 1,
    title: 'Orders',
    onPress: () => console.log('Orders'),
  },
  {
    id: 2,
    title: 'Pending reviews',
    onPress: () => console.log('Pending reviews'),
  },
  {
    id: 3,
    title: 'Faq',
    onPress: () => console.log('Faq'),
  },
  {
    id: 4,
    title: 'Help',
    onPress: () => console.log('Help'),
  },
];

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.pageTitle}>
          <AppText size={34} weight="semibold">
            My Profile
          </AppText>
        </View>
        <View style={styles.profileTopArea}>
          <AppText size={18} weight="semibold">
            Personal details
          </AppText>
          <TouchableOpacity onPress={() => NavigationServices.navigate(ROUTES.EDIT_PROFILE_SCREEN)}>
            <AppText size={15} color={COLORS.BUTTON_ORANGE}>
              change
            </AppText>
          </TouchableOpacity>
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
            <View style={styles.profileDivider} />
            <AppText color={COLORS.TEXT_DARK_GRAY} size={15}>
              +84 123 456 789
            </AppText>
            <View style={styles.profileDivider} />
            <AppText color={COLORS.TEXT_DARK_GRAY} size={15}>
              Đường D5, Bình Thạnh, Hồ Chí Minh, Việt Nam
            </AppText>
          </View>
        </View>
        {PROFILE_CHOICES.map(item => {
          return (
            <TouchableOpacity
              onPress={item?.onPress}
              activeOpacity={0.8}
              key={item.id}
              style={styles.profileChoiceItem}>
              <AppText size={18} weight="semibold">
                {item.title}
              </AppText>
              <AppIcon type="antdesign" name="right" />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default memo(ProfileScreen);

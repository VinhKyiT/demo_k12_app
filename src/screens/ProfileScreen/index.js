import { View, ScrollView, TouchableOpacity, Linking, Image, Text } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import styles from './styles';
import AppText from '~components/AppText';
import { COLORS } from '~constants/colors';
import FastImage from 'react-native-fast-image';
import AppIcon from '~components/AppIcon';
import NavigationServices from '~utils/NavigationServices';
import { ROUTES } from '~constants/routes';
import { useSelector } from 'react-redux';
import { getUserInfoSelector } from '../../redux/profile/profile.selectors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { IMAGES } from '../../assets/images';
import { useFocusEffect } from '@react-navigation/native';

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
  const userInfo = useSelector(getUserInfoSelector);
  const [isLoading, setIsLoading] = useState(true);
  console.log('isLoading', isLoading);
  const callback = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  useFocusEffect(callback);
  const profileCardLoadingNode = useMemo(() => {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        <View style={styles.userInfoContainer}>
          <Image style={styles.profileImage} />
          <View style={styles.infoWrapper}>
            <Text style={{ height: 24, marginBottom: 8 }}></Text>
            <Text>{userInfo?.email}</Text>
            <Text style={{ height: 24, marginBottom: 8 }}></Text>
            <Text style={{ height: 24, marginBottom: 8 }}></Text>
            <Text style={{ height: 34, marginBottom: 8 }}></Text>
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }, []);

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
        {isLoading ? (
          profileCardLoadingNode
        ) : (
          <View style={styles.userInfoContainer}>
            <FastImage
              source={{
                uri: userInfo?.avatar,
              }}
              style={styles.profileImage}
            />
            <View style={styles.infoWrapper}>
              <AppText size={18} weight="semibold">
                {userInfo?.name}
              </AppText>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Linking.openURL(`mailto:${userInfo?.email}`);
                }}>
                <AppText color={COLORS.TEXT_DARK_GRAY} size={15}>
                  {userInfo?.email}
                </AppText>
              </TouchableOpacity>
              <View style={styles.profileDivider} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Linking.openURL('tel:0378383986');
                }}>
                <AppText color={COLORS.TEXT_DARK_GRAY} size={15}>
                  +84 123 456 789
                </AppText>
              </TouchableOpacity>
              <View style={styles.profileDivider} />
              <AppText color={COLORS.TEXT_DARK_GRAY} size={15}>
                Đường D5, Bình Thạnh, Hồ Chí Minh, Việt Nam
              </AppText>
            </View>
          </View>
        )}
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

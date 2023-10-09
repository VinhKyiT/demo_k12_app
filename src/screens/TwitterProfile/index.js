import { View, ScrollView, Animated } from 'react-native';
import React, { useRef } from 'react';
import AppText from '../../components/AppText';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../assets/images';
import { FONTS } from '../../constants/fonts';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

const TwitterProfile = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeightStyle = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileImageSizeStyle = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileImageMarginTopStyle = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2, HEADER_MAX_HEIGHT + 5],
    extrapolate: 'clamp',
  });

  const headerZIndex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
    outputRange: [0, 0, 99],
    extrapolate: 'clamp',
  });

  const headerTitleOpacityStyle = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26,
    ],
    outputRange: [0, 0, 0, 1],
    extrapolate: 'clamp',
  });

  const handleScroll = e => {
    console.log(e.nativeEvent.contentOffset.y);
  };
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          justifyContent: 'center',
          backgroundColor: 'lightskyblue',
          height: headerHeightStyle,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: headerZIndex,
        }}>
        <Animated.View style={{ marginLeft: 16, opacity: headerTitleOpacityStyle }}>
          <AppText style={{ color: '#fff', fontSize: 18, fontFamily: FONTS.BOLD }}>Vinh Ky</AppText>
          <AppText style={{ color: '#fff', fontFamily: FONTS.REGULAR }}>8 bài viết</AppText>
        </Animated.View>
      </Animated.View>
      <ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
          listener: handleScroll,
        })}
        scrollEventThrottle={16}
        contentContainerStyle={{ height: 1000, paddingHorizontal: 16 }}>
        <Animated.View
          style={{
            width: profileImageSizeStyle,
            height: profileImageSizeStyle,
            borderRadius: 999,
            overflow: 'hidden',
            borderColor: '#fff',
            borderWidth: 3,
            marginTop: profileImageMarginTopStyle,
          }}>
          <FastImage source={IMAGES.MEN} style={{ width: null, height: null, flex: 1 }} />
        </Animated.View>
        <View>
          <AppText style={{ fontFamily: FONTS.BOLD, fontSize: 26 }}>Vinh Ky</AppText>
        </View>
      </ScrollView>
    </View>
  );
};

export default TwitterProfile;

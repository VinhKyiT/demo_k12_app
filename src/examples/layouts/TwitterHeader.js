import React, { useRef } from 'react';
import { Animated, Image, ScrollView, View } from 'react-native';
import { IMAGES } from '../../assets/images';
import AppText from '../../components/AppText';
import { FONTS } from '../../constants/fonts';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

const TwitterHeader = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const profileImageSize = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2, HEADER_MAX_HEIGHT + 5],
    extrapolate: 'clamp',
  });
  const headerzIndex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
    outputRange: [0, 0, 1000],
    extrapolate: 'clamp',
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26,
    ],
    outputRange: [-20, -20, -20, 0],
    extrapolate: 'clamp',
  });
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26,
    ],
    outputRange: [0, 0, 0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          backgroundColor: 'lightskyblue',
          height: headerHeight,
          zIndex: headerzIndex,
          elevation: headerzIndex, //required for android
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            opacity: headerTitleOpacity,
            marginLeft: 10,
          }}>
          <AppText style={{ color: 'white', fontSize: 18, fontFamily: FONTS.BOLD }}>
            Vinh Ky
          </AppText>
          <AppText style={{ color: 'white', fontSize: 14, fontFamily: FONTS.REGULAR }}>
            8 Posts
          </AppText>
        </Animated.View>
      </Animated.View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ height: 1000 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}>
        <Animated.View
          style={{
            height: profileImageSize,
            width: profileImageSize,
            borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
            borderColor: 'white',
            borderWidth: 3,
            overflow: 'hidden',
            marginTop: profileImageMarginTop,
            marginLeft: 10,
          }}>
          <Image source={IMAGES.MEN} style={{ flex: 1, width: null, height: null }} />
        </Animated.View>
        <View>
          <AppText style={{ fontWeight: 'bold', fontSize: 26, paddingLeft: 10 }}>Vinh Ky</AppText>
        </View>
      </ScrollView>
    </View>
  );
};

export default TwitterHeader;

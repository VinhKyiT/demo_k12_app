import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import AppText from '../components/AppText';
import { FONTS } from '../constants/fonts';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const tabs = [
  { tabName: 'Men', imageSrc: require('~assets/images/men.jpeg') },
  { tabName: 'Women', imageSrc: require('~assets/images/women.jpeg') },
  { tabName: 'Kids', imageSrc: require('~assets/images/kid.jpeg') },
  { tabName: 'Home Decor', imageSrc: require('~assets/images/home-decor.jpeg') },
];

const FlatListImage = ({ item }) => {
  return (
    <Animated.View key={item.tabName} style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
      <Image style={{ height: '100%', width: '100%' }} source={item.imageSrc} />
    </Animated.View>
  );
};

const FlatListText = ({
  item,
  index,
  viewTranslatePoints,
  setViewTranslatePoints,
  tabWidths,
  setTabWidths,
}) => {
  const handleViewLayout = event => {
    const { x } = event.nativeEvent.layout;
    const currentPoints = [...viewTranslatePoints];
    currentPoints[index] = x;
    setViewTranslatePoints(currentPoints);
  };

  const handleTextLayout = event => {
    const { width } = event.nativeEvent.layout;
    const currentTabWidths = [...tabWidths];
    currentTabWidths[index] = width;
    setTabWidths(currentTabWidths);
  };

  return (
    <Animated.View onLayout={handleViewLayout} key={item.tabName}>
      <AppText
        onLayout={handleTextLayout}
        style={{ fontFamily: FONTS.BOLD, fontSize: 18, color: '#fff' }}>
        {item.tabName}
      </AppText>
    </Animated.View>
  );
};

const Tabs = ({ scrollXValue }) => {
  const [viewTranslatePoints, setViewTranslatePoints] = useState([]);
  const [tabWidths, setTabWidths] = useState([]);
  const indicatorStyle = useAnimatedStyle(() => {
    return tabWidths.length === 4 && viewTranslatePoints.length === 4
      ? {
          width: interpolate(
            scrollXValue.value,
            [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH, 3 * SCREEN_WIDTH],
            [tabWidths[0], tabWidths[1], tabWidths[2], tabWidths[3]],
            Extrapolation.CLAMP,
          ),
          transform: [
            {
              translateX: interpolate(
                scrollXValue.value,
                [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH, 3 * SCREEN_WIDTH],
                [
                  viewTranslatePoints[0],
                  viewTranslatePoints[1],
                  viewTranslatePoints[2],
                  viewTranslatePoints[3],
                ],
                Extrapolation.CLAMP,
              ),
            },
          ],
        }
      : {
          width: 0,
          transform: [{ translateX: 0 }],
        };
  });
  return (
    <Animated.View style={{ width: '100%', zIndex: 20, paddingHorizontal: 16 }}>
      <View
        style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        {tabs.map((value, index) => {
          return (
            <FlatListText
              key={value.tabName}
              item={value}
              index={index}
              viewTranslatePoints={viewTranslatePoints}
              setViewTranslatePoints={setViewTranslatePoints}
              tabWidths={tabWidths}
              setTabWidths={setTabWidths}
            />
          );
        })}
      </View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 8,
            width: 30,
            backgroundColor: '#fff',
            borderRadius: 8,
            left: 16,
            bottom: -6,
          },
          indicatorStyle,
        ]}
      />
    </Animated.View>
  );
};

export const DynamicTabBar = () => {
  const scrollValue = useSharedValue(0);
  const scrollRef = useAnimatedRef();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollValue.value = event.contentOffset.x;
    },
  });

  const scrollMomentumEndHandler = useAnimatedScrollHandler({
    onMomentumEnd: event => {
      const scrollDiff = event.contentOffset.x % SCREEN_WIDTH;
      if (scrollDiff > SCREEN_WIDTH / 2) {
        const scrollMultiplier = Math.ceil(event.contentOffset.x / SCREEN_WIDTH);
        scrollTo(scrollRef, scrollMultiplier * SCREEN_WIDTH, 0, true);
      } else {
        const scrollMultiplier = Math.floor(event.contentOffset.x / SCREEN_WIDTH);
        scrollTo(scrollRef, scrollMultiplier * SCREEN_WIDTH, 0, true);
      }
    },
  });

  return (
    <View style={{ flex: 1, paddingTop: 16, backgroundColor: '#141414' }}>
      <StatusBar barStyle={'light-content'} />
      <Tabs scrollXValue={scrollValue} />
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={{ position: 'absolute', height: 64, zIndex: 10, width: '100%' }}
      />
      <AnimatedFlatlist
        ref={scrollRef}
        onMomentumScrollEnd={scrollMomentumEndHandler}
        onScroll={scrollHandler}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEventThrottle={16}
        style={{ position: 'absolute', zIndex: 0 }}
        data={tabs}
        renderItem={({ item }) => {
          return <FlatListImage item={item} />;
        }}
      />
    </View>
  );
};

import { View } from 'react-native';
import React, { memo, useMemo, useState } from 'react';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import AppHeader from '~components/AppHeader';
import { COLORS } from '~constants/colors';
import NavigationServices from '~utils/NavigationServices';
import Carousel from 'react-native-reanimated-carousel';
import { DIMENSIONS } from '~constants/dimensions';
import FastImage from 'react-native-fast-image';
import Dots from '~components/Dots';
import AppText from '~components/AppText';
import BodySection from './components/BodySection';

const ProductDetailScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { params } = useRoute();
  const { productDetail } = params || {};
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
  const headerRightIconProps = useMemo(
    () => ({
      rightIconType: 'antdesign',
      rightIconName: 'hearto',
      rightIconColor: COLORS.BLACK,
      onRightIconPress: () => {},
    }),
    [],
  );
  return (
    <View style={styles.container}>
      <AppHeader leftIcon={headerLeftIconProps} rightIcon={headerRightIconProps} />
      <Carousel
        loop
        width={DIMENSIONS.SCREEN_WIDTH}
        height={DIMENSIONS.SCREEN_WIDTH / 2}
        autoPlay={true}
        data={productDetail.photos}
        autoPlayInterval={2000}
        scrollAnimationDuration={500}
        // onSnapToItem={setCurrentIndex}
        onProgressChange={(_, absoluteProgress) => {
          setCurrentIndex(Math.round(absoluteProgress));
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <FastImage source={{ uri: item }} style={styles.carouselImage} />
          </View>
        )}
      />
      <View style={styles.dotContainer}>
        <Dots data={productDetail.photos} currentIndex={currentIndex} />
      </View>
      <View style={styles.productNameContainer}>
        <AppText size={28} weight="semibold" variant="rounded">
          {productDetail.name}
        </AppText>
        <AppText size={22} weight="bold" variant="rounded" color={COLORS.APP_ORANGE}>
          {productDetail.price}
        </AppText>
      </View>
      <View style={styles.bodyContainer}>
        <BodySection
          title="Delivery info"
          description={'Delivered between monday aug and thursday 20 from 8pm to 91:32 pm'}
        />
        <BodySection
          title="Return policy"
          description={
            'All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.'
          }
        />
      </View>
    </View>
  );
};

export default memo(ProductDetailScreen);

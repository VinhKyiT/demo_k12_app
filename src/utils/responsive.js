import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard iPhone 11
const GUIDELINE_BASE_WIDTH = 375;
const GUIDELINE_BASE_HEIGHT = 812;

const scale = size => {
  const newSize = (SCREEN_WIDTH / GUIDELINE_BASE_WIDTH) * size;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

const verticalScale = size => {
  const newSize = (SCREEN_HEIGHT / GUIDELINE_BASE_HEIGHT) * size;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const isPortrait = () => {
  return SCREEN_WIDTH < SCREEN_HEIGHT;
};

const isTablet = () =>
  isPortrait() ? SCREEN_WIDTH > 550 : SCREEN_HEIGHT > 550;

export { scale, verticalScale, moderateScale, isPortrait, isTablet };

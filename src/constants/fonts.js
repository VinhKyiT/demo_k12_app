import { Platform } from 'react-native';

const TEXT_FONT_PREFIX = Platform.OS === 'ios' ? 'SFProText' : 'SF-Pro-Text';
const ROUNDED_FONT_PREFIX = Platform.OS === 'ios' ? 'SFProRounded' : 'SF-Pro-Rounded';

const FONTS = {
  TEXT: {
    REGULAR: `${TEXT_FONT_PREFIX}-Regular`,
    MEDIUM: `${TEXT_FONT_PREFIX}-Medium`,
    SEMIBOLD: `${TEXT_FONT_PREFIX}-Semibold`,
    BOLD: `${TEXT_FONT_PREFIX}-Bold`,
    HEAVY: `${TEXT_FONT_PREFIX}-Heavy`,
  },
  ROUNDED: {
    REGULAR: `${ROUNDED_FONT_PREFIX}-Regular`,
    MEDIUM: `${ROUNDED_FONT_PREFIX}-Medium`,
    SEMIBOLD: `${ROUNDED_FONT_PREFIX}-Semibold`,
    BOLD: `${ROUNDED_FONT_PREFIX}-Bold`,
    HEAVY: `${ROUNDED_FONT_PREFIX}-Heavy`,
  },
};

export { FONTS };

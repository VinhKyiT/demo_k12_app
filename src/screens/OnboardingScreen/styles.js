import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';
import { DIMENSIONS } from '../../constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ONBOARDING_ORANGE,
    paddingHorizontal: 32,
  },
  miniLogo: {
    width: 68,
    height: 68,
    borderRadius: 99,
  },
  logoContainer: {
    marginTop: 32,
  },
  text: {
    fontFamily: FONTS.ROUNDED.HEAVY,
    fontSize: 50,
    color: COLORS.WHITE,
  },
  onboardingWomanImg: {
    width: DIMENSIONS.SCREEN_WIDTH - 64,
    height: 380,
  },
  buttonContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    height: 60,
    marginTop: 16,
  },
  buttonTitle: {
    color: COLORS.APP_ORANGE,
    fontFamily: FONTS.TEXT.SEMIBOLD,
  },
});

export default styles;

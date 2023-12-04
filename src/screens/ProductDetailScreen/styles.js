import { StyleSheet } from 'react-native';
import { COLORS } from '~constants/colors';
import { FONTS } from '~constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  dotContainer: {
    marginTop: 16,
  },
  productNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },

  bodyContainer: {
    paddingHorizontal: 32,
    marginTop: 32,
  },
  buttonTitle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.TEXT.SEMIBOLD,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: COLORS.BUTTON_ORANGE,
    marginHorizontal: 32,
    marginVertical: 16,
    borderRadius: 30,
  },
});

export default styles;

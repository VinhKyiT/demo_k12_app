import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    justifyContent: 'center',
  },
  itemWrapper: {
    height: 270,
    width: 200,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  itemImage: {
    width: 164,
    height: 164,
    marginTop: -40,
    borderRadius: 999,
  },
  itemNameText: {
    marginVertical: 8,
    lineHeight: 26,
    height: 52,
    fontFamily: FONTS.ROUNDED.SEMIBOLD,
    fontSize: 22,
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  itemPriceText: {
    fontFamily: FONTS.ROUNDED.BOLD,
    fontSize: 18,
    color: COLORS.APP_ORANGE,
    textAlign: 'center',
  },
});

export default styles;

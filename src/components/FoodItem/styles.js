import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  itemWrapper: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  itemImage: {
    width: 140,
    height: 140,
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
    marginHorizontal: 16,
  },
  itemPriceText: {
    fontFamily: FONTS.ROUNDED.BOLD,
    fontSize: 18,
    color: COLORS.APP_ORANGE,
    textAlign: 'center',
  },
});

export default styles;

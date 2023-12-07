import { StyleSheet } from 'react-native';
import { FONTS } from '../../constants/fonts';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  centerTitleContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTitle: {
    fontFamily: FONTS.TEXT.SEMIBOLD,
    fontSize: 18,
    color: COLORS.BLACK,
  },
});

export default styles;

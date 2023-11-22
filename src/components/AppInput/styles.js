import { StyleSheet } from 'react-native';
import { FONTS } from '../../constants/fonts';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {},
  titleStyle: {
    fontSize: 15,
    fontFamily: FONTS.TEXT.SEMIBOLD,
    color: COLORS.GRAY,
  },
  inputContainer: {
    borderBottomWidth: 0.5,
    borderBlockColor: COLORS.BLACK,
  },
  inputStyle: {
    fontFamily: FONTS.TEXT.REGULAR,
    height: 45,
  },
  errorText: {
    marginHorizontal: 4,
    marginTop: 4,
  },
});

export default styles;

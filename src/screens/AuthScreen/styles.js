import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCREEN_BG,
  },
  topPart: {
    backgroundColor: COLORS.WHITE,
    height: '40%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    margin: 0,
  },
  logoImg: {
    width: 150,
    height: 150,
    marginTop: 55,
  },
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabItemContainer: {
    paddingVertical: 12,
    width: 134,
    alignItems: 'center',
  },
  tabTile: {
    fontFamily: FONTS.TEXT.SEMIBOLD,
    fontSize: 16,
    color: COLORS.BLACK,
  },
  activeTabIndicator: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.APP_ORANGE,
  },
  bottomPart: {
    paddingHorizontal: 32,
    flexGrow: 1,
  },
  inputWrapper: {
    marginTop: 32,
    flexGrow: 1,
  },
  inputStyle: {
    fontFamily: FONTS.TEXT.SEMIBOLD,
    fontSize: 15,
    color: COLORS.BLACK,
    paddingHorizontal: 0,
  },
  forgotContainer: {
    marginTop: 16,
  },
  forgotText: {
    color: COLORS.APP_ORANGE,
    fontFamily: FONTS.TEXT.SEMIBOLD,
    fontSize: 16,
  },
  buttonTitle: {
    fontFamily: FONTS.TEXT.SEMIBOLD,
    fontSize: 16,
    color: COLORS.WHITE,
  },
  buttonContainer: {
    borderRadius: 30,
    height: 70,
    backgroundColor: COLORS.APP_ORANGE,
    marginBottom: 32,
  },
});

export default styles;

import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  avatarWrapper: {
    marginTop: 50,
    width: 100,
    height: 100,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.APP_ORANGE,
    padding: 4,
    borderRadius: 99,
  },
  inputStyle: {
    fontFamily: FONTS.TEXT.SEMIBOLD,
    fontSize: 15,
    color: COLORS.BLACK,
    paddingHorizontal: 0,
  },
  inputWrapper: {
    marginTop: 50,
    width: '100%',
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginBottom: 8,
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

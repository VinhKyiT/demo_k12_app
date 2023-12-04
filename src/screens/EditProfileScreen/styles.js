import { StyleSheet } from 'react-native';
import { COLORS } from '~constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCREEN_BG,
  },
  scrollViewContent: {
    paddingHorizontal: 32,
  },
  profileTopArea: {
    paddingVertical: 16,
  },
  userInfoContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 32,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  infoWrapper: {
    marginLeft: 16,
    width: 232,
  },
  profileDivider: {
    height: 1,
    backgroundColor: COLORS.TEXT_DARK_GRAY,
  },
});

export default styles;

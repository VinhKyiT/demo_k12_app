import { StyleSheet } from 'react-native';
import { COLORS } from '~constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCREEN_BG,
  },
  pageTitle: {
    marginTop: 32,
  },
  scrollViewContent: {
    paddingHorizontal: 32,
  },
  profileTopArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: 90,
    height: 100,
    borderRadius: 10,
  },
  infoWrapper: {
    marginLeft: 16,
    width: 202,
  },
  profileDivider: {
    height: 1,
    backgroundColor: COLORS.TEXT_DARK_GRAY,
  },
  profileChoiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
  },
});

export default styles;

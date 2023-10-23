import { StyleSheet } from 'react-native';
import { COLORS } from '~constants/colors';
import { DIMENSIONS } from '~constants/dimensions';
import { FONTS } from '~constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCREEN_BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  headerInputContainer: {
    flexGrow: 1,
    marginLeft: 32,
    marginRight: 16,
    borderBottomWidth: 0,
  },
  headerInput: {
    fontFamily: FONTS.ROUNDED.SEMIBOLD,
    fontSize: 16,
    color: COLORS.BLACK,
  },
  listContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.WHITE_LIST_BG,
    paddingBottom: 32,
  },
  listWrapper: {},
  itemContainer: {
    width: DIMENSIONS.SCREEN_WIDTH / 2 - 48,
    height: 250,
    marginTop: 48,
  },
  itemWrapper: {
    width: DIMENSIONS.SCREEN_WIDTH / 2,
  },
  listHeaderContainer: {
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

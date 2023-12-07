import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCREEN_BG,
  },
  sloganContainer: {
    paddingHorizontal: 32,
    marginVertical: 32,
  },
  sloganText: {
    fontFamily: FONTS.ROUNDED.BOLD,
    color: COLORS.APP_SEA_BLUE,
    fontSize: 34,
  },
  searchContainer: {
    backgroundColor: COLORS.SUPER_LIGHT_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 32,
    borderRadius: 320,
  },
  searchText: {
    color: COLORS.BlackWithOpacity(50),
    paddingLeft: 16,
  },
  foodCategoryScrollView: {
    flexGrow: 0,
  },
  foodCategoryContainer: {
    paddingVertical: 32,
    paddingLeft: 50,
  },
  foodCategoryItem: {
    width: 100,
  },
  foodCategoryText: {
    fontFamily: FONTS.TEXT.REGULAR,
    fontSize: 16,
    color: COLORS.TEXT_GRAY,
    textAlign: 'center',
  },
  indicator: {
    height: 3,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 40,
    backgroundColor: COLORS.TAB_BAR_ACTIVE,
    marginTop: 4,
  },
  seeMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
  },
  seeMoreText: {
    color: COLORS.APP_ORANGE,
    fontFamily: FONTS.ROUNDED.REGULAR,
  },
  itemContainer: {
    marginLeft: 32,
    height: 270,
    width: 200,
  },
});

export default styles;

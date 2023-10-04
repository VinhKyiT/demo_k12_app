// import { FONT_SIZE } from 'constants/appFonts';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContent: {
    // marginHorizontal: SPACING * 3,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  itemImage: {
    width: width,
    height: 207,
    resizeMode: 'cover',
  },
  flatListContent: { alignItems: 'center' },
  itemBannerStyle: { width: width, height: 200 },
  dotsContainer: {
    flex: 1,
    position: 'absolute',
    height: 10,
    alignSelf: 'center',
    bottom: 5,
    flexDirection: 'row',
  },
  dot: {
    // backgroundColor: colors.alto,
    width: 6,
    height: 6,
    borderRadius: 10,
    marginRight: 4,
  },
  activeDot: {
    // backgroundColor: colors.primary_color
  },
});

export default styles;

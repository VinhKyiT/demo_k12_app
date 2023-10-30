import { StyleSheet } from 'react-native';
import { COLORS } from '~constants/colors';
import { DIMENSIONS } from '~constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SCREEN_BG,
  },
  listContentStyle: {
    paddingHorizontal: 32,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 24,
  },
  itemContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 16,
    marginBottom: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  itemBody: {
    marginLeft: 16,
  },
  itemName: {
    width: DIMENSIONS.SCREEN_WIDTH - 182,
  },
  itemQuantity: {
    position: 'absolute',
    backgroundColor: COLORS.BUTTON_ORANGE,
    paddingHorizontal: 4,
    borderRadius: 20,
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;

import { StyleSheet } from 'react-native';
import { COLORS } from '~constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shotButton: {
    backgroundColor: COLORS.WHITE,
    width: 70,
    height: 70,
    borderRadius: 40,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  switchButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default styles;

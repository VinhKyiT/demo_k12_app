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
  },
  switchButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  cameraControlView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  modeSwitcherView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 20,
  },
});

export default styles;

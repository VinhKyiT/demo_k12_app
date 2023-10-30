import { StyleSheet } from 'react-native';
import { FONTS } from '../../constants/fonts';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalHeaderText: {
    fontFamily: FONTS.TEXT.MEDIUM,
    fontSize: 20,
    color: '#000',
  },
  buttonPrimary: {
    backgroundColor: '#FA4A0C',
    paddingVertical: 8,
    borderRadius: 99,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
  },
  textPrimary: {
    color: '#fff',
    fontFamily: FONTS.BOLD,
    fontSize: 16,
  },
  textSecondary: {},
});

export default styles;

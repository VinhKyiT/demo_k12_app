import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../assets/images';
import styles from './styles';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import NavigationServices from '../../utils/NavigationServices';
import { ROUTES } from '../../constants/routes';
import LocalStorage from '../../helpers/storage';

const OnboardingScreen = () => {
  const handleButtonClick = () => {
    NavigationServices.navigate(ROUTES.AUTH_SCREEN);
    LocalStorage.storeData('IS_SHOWN_ONBOARDING', 'true');
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <FastImage
          source={IMAGES.MINI_LOGO}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.miniLogo}
        />
      </View>
      <View>
        <AppText style={styles.text}>{'Food for\nEveryone'}</AppText>
      </View>
      <View>
        <FastImage
          source={IMAGES.ONBOARDING_WOMAN}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.onboardingWomanImg}
        />
      </View>
      <View>
        <AppButton
          onPress={handleButtonClick}
          title="Get started"
          style={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

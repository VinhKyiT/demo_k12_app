import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../assets/images';
import styles from './styles';
import AppText from '../../components/AppText';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

const AuthScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleTabChange = tab => {
    setCurrentTab(tab);
  };
  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <FastImage source={IMAGES.MINI_LOGO} style={styles.logoImg} />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => {
              handleTabChange(0);
            }}
            activeOpacity={0.8}
            style={[styles.tabItemContainer, currentTab === 0 && styles.activeTabIndicator]}>
            <AppText style={styles.tabTile}>Login</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleTabChange(1);
            }}
            activeOpacity={0.8}
            style={[styles.tabItemContainer, currentTab === 1 && styles.activeTabIndicator]}>
            <AppText style={styles.tabTile}>Sign-up</AppText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomPart}>
        <View style={styles.inputWrapper}>
          <AppInput
            style={styles.inputStyle}
            title="Email address"
            value={email}
            onChangeText={setEmail}
            placeholder="Eg: nguyenvana@gmail.com"
          />
          <AppInput
            style={[styles.inputStyle]}
            containerStyle={{ marginTop: 16 }}
            title="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            secureTextEntry
          />
          <TouchableOpacity style={styles.forgotContainer}>
            <AppText style={styles.forgotText}>Forgot password?</AppText>
          </TouchableOpacity>
        </View>
        <AppButton title="Login" titleStyle={styles.buttonTitle} style={styles.buttonContainer} />
      </View>
    </View>
  );
};

export default React.memo(AuthScreen);

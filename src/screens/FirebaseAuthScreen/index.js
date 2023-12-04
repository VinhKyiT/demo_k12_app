import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '~assets/images';
import styles from './styles';
import AppText from '~components/AppText';
import AppInput from '~components/AppInput';
import AppButton from '~components/AppButton';
import { useSelector, useDispatch } from 'react-redux';
import { loginErrorSelector, loginStateSelector } from '~redux/auth/auth.selectors';
import axios from 'axios';
import { loginFailed, loginRequest, loginSuccess } from '~redux/auth/auth.actions';
import NavigationServices from '~utils/NavigationServices';
import { ROUTES } from '~constants/routes';
import { getUserProfile } from '../../redux/profile/profile.actions';
import { getLoadingSelector } from '../../redux/loading/loading.selectors';
import { LOGIN } from '../../redux/auth/auth.constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { validationLoginSchema } from '../../utils/schemas/loginSchema';
import auth from '@react-native-firebase/auth';
import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin';

const FirebaseAuthScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);
  // const loginError = useSelector(loginErrorSelector);
  // const dispatch = useDispatch();
  const isLoggedIn = useSelector(loginStateSelector);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    resUser => {
      console.log('resUser', resUser);
      setUser(resUser);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  const formRef = useRef();

  const handleTabChange = tab => {
    setCurrentTab(tab);
  };

  const isLoggingIn = useSelector(state => getLoadingSelector(state, [LOGIN.REQUEST]));

  const onLoginPress = useCallback(async ({ email, password }) => {
    console.log(email, password);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    // dispatch(loginRequest({ email, password }));
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const handleLoginWithGoogle = () => {
    onGoogleButtonPress().then(() => console.log('Signed in with Google!'));
  };

  useEffect(() => {
    if (isLoggedIn) {
      NavigationServices.reset({ routes: [{ name: ROUTES.DRAWER }], index: 0 });
    }
  }, [isLoggedIn]);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled">
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
          <Formik
            innerRef={formRef}
            initialValues={{ email: '', password: '' }}
            onSubmit={onLoginPress}
            validationSchema={validationLoginSchema}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              handleBlur,
              handleReset,
              touched,
              setFieldTouched,
              dirty,
            }) => {
              return (
                <View style={styles.inputWrapper}>
                  <AppInput
                    style={styles.inputStyle}
                    title="Email address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Eg: nguyenvana@gmail.com"
                    error={dirty && touched.email && errors.email}
                    onBlur={handleBlur('email')}
                    onFocus={() => {
                      setFieldTouched('email');
                    }}
                  />
                  <AppInput
                    style={[styles.inputStyle]}
                    containerStyle={{ marginTop: 16 }}
                    title="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Enter Password"
                    secureTextEntry
                    onBlur={handleBlur('password')}
                    error={dirty && touched.password && errors.password}
                    onFocus={() => {
                      setFieldTouched('password');
                    }}
                  />
                  <TouchableOpacity
                    style={styles.forgotContainer}
                    onPress={() => {
                      auth()
                        .signOut()
                        .then(() => {
                          console.log('User signed out!');
                          GoogleSignin.revokeAccess()
                            .then(res => {
                              console.log('revoke google access success', res);
                            })
                            .catch(err => {
                              console.log('revoke google access error', err);
                            });
                        });
                    }}>
                    <AppText style={styles.forgotText}>Sign out?</AppText>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleLoginWithGoogle}
            disabled={false}
          />
          <AppButton
            isLoading={isLoggingIn}
            onPress={formRef.current?.handleSubmit}
            title="Login"
            titleStyle={styles.buttonTitle}
            style={styles.buttonContainer}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default React.memo(FirebaseAuthScreen);

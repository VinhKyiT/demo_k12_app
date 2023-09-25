import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';

const AppImage = props => {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  function onLoadStart() {
    setLoading(true);
    setErrorMessage(null);
  }

  function onLoadEnd() {
    setLoading(false);
  }

  function onError() {
    setLoading(false);
    setErrorMessage('Loi anh');
  }

  return (
    <View style={styles.imageContainer}>
      <FastImage
        onError={onError}
        fallback={true}
        onLoadStart={onLoadStart}
        defaultSource={require('../assets/images/default_image.png')}
        onLoadEnd={onLoadEnd}
        {...props}
      />
      {isLoading && <ActivityIndicator style={styles.loaderStyle} size={'large'} />}
      {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderStyle: {
    color: 'green',
    position: 'absolute',
  },
  errorText: {
    position: 'absolute',
    color: 'red',
  },
});

export default AppImage;

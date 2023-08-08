import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TextInANest = () => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText =
    'This is not really a bird nest This is not really a bird nest This is not really a bird nest This is not really a bird nest ';

  return (
    <View>
      <Text style={styles.titleText}>
        {titleText}
        {'\n'}
        {'\n'}
      </Text>
      <Text numberOfLines={2} ellipsizeMode="head">
        {bodyText}
      </Text>
      <Text>Toi ten la Bui Pham Vinh Ky</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TextInANest;

import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import ViewBoxesWithColorAndText from './src/examples/ViewDemo';
import TextInANest from './src/examples/TextDemo';
import DisplayAnImage from './src/examples/ImageDemo';
import UselessTextInput from './src/examples/TextInputDemo';
import StyleSheetExample from './src/examples/StyleSheetDemo';
import TOExample from './src/examples/TouchableOpacityDemo';
import ModalExample from './src/examples/ModalDemo';

const App = () => {
  // const scrViewRef = useRef(null);
  // useEffect(() => {
  //   setTimeout(() => {
  //     scrViewRef.current.scrollToEnd();
  //   }, 2000);
  // }, []);
  const [value, setValue] = useState(false);
  return (
    <ScrollView
      // ref={scrViewRef}
      style={styles.container}
      showsVerticalScrollIndicator>
      <ViewBoxesWithColorAndText />
      <TextInANest />
      <DisplayAnImage />
      <UselessTextInput />
      <StyleSheetExample />
      <TOExample />
      <ModalExample />
      <ActivityIndicator
        size={'large'}
        color={'red'}
        style={{ marginTop: 20, marginBottom: 30 }}
      />
      <ImageBackground
        style={{
          width: 200,
          height: 200,
        }}
        source={{
          uri: 'https://static.tuoitre.vn/tto/r/2015/08/02/a-1438493457.jpg',
        }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Toi ten la ky</Text>
        <Text style={{ color: 'white', fontSize: 20 }}>Toi ten la ky</Text>
        <Text style={{ color: 'white', fontSize: 20 }}>Toi ten la ky</Text>
      </ImageBackground>
      <StatusBar backgroundColor={'yellow'} barStyle={'dark-content'} />
      <Switch
        value={value}
        onValueChange={state => {
          setValue(state);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

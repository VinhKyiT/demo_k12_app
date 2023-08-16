import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BaiTap1Demo from './src/prepare/BaiTap1Demo';

const App = () => {
  // const scrViewRef = useRef(null);
  // useEffect(() => {
  //   setTimeout(() => {
  //     scrViewRef.current.scrollToEnd();
  //   }, 2000);
  // }, []);
  const [value, setValue] = useState(false);
  return (
    // <ScrollView
    //   // ref={scrViewRef}
    //   style={styles.container}
    //   showsVerticalScrollIndicator>
    //   <ViewBoxesWithColorAndText />
    //   <TextInANest />
    //   <DisplayAnImage />
    //   <UselessTextInput />
    //   <StyleSheetExample />
    //   <TOExample />
    //   <ModalExample />
    //   <ActivityIndicator
    //     size={'large'}
    //     color={'red'}
    //     style={{ marginTop: 20, marginBottom: 30 }}
    //   />
    //   <ImageBackground
    //     style={{
    //       width: 200,
    //       height: 200,
    //     }}
    //     source={{
    //       uri: 'https://static.tuoitre.vn/tto/r/2015/08/02/a-1438493457.jpg',
    //     }}>
    //     <Text style={{ color: 'white', fontSize: 20 }}>Toi ten la ky</Text>
    //     <Text style={{ color: 'white', fontSize: 20 }}>Toi ten la ky</Text>
    //     <Text style={{ color: 'white', fontSize: 20 }}>Toi ten la ky</Text>
    //   </ImageBackground>
    //   <StatusBar backgroundColor={'yellow'} barStyle={'dark-content'} />
    //   <Switch
    //     value={value}
    //     onValueChange={state => {
    //       setValue(state);
    //     }}
    //   />
    // </ScrollView>
    <View style={styles.container}>
      <></>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

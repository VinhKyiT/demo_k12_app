import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FlexDimensionsBasics from './src/examples/layouts/FlexDimensionBasics';
import Layout1 from './src/examples/layouts/Layout1';
import LotsOfStyles from './src/examples/layouts/LotsOfStyles';
import FixedDimensionsBasics from './src/examples/layouts/FixedDimensionBasics';
import PercentageDimensionsBasics from './src/examples/layouts/PercentageDimensionBasics';
import JustifyContentBasics from './src/examples/layouts/JustifyContentBasics';
import AlignItemsDemo from './src/examples/layouts/AlignItemsDemo';
import FlexWrapDemo from './src/examples/layouts/FlexWrapDemo';
import RelativeLayoutDemo from './src/examples/layouts/RelativeLayoutDemo';
import AbsoluteLayoutDemo from './src/examples/layouts/AbsoluteLayoutDemo';
import PracticeLayout01 from './src/examples/PracticeLayout01';

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
      <PracticeLayout01 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

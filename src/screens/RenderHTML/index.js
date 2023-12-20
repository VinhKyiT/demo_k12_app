import { View, Text, useWindowDimensions } from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';

const source = {
  html: `
  <ol style="list-style-type: upper-roman; color: blue; font-weight: bold;">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
  <li>Six</li>
  <li>Seven</li>
  <li>Eight</li>
</ol>`,
};

const RenderHTMLScreen = () => {
  const { width } = useWindowDimensions();
  return (
    <View>
      <RenderHTML contentWidth={width} source={source} />
    </View>
  );
};

export default RenderHTMLScreen;

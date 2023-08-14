import React from 'react';
import { View, Text } from 'react-native';

function IfElseConditional({ condition }) {
  if (condition) {
    return <Text>This is rendered when condition is true.</Text>;
  }
  return (
    <View>
      <Text>This is rendered when condition is false.</Text>
    </View>
  );
}

function TernaryConditional({ condition }) {
  return (
    <View>
      {condition ? (
        <Text>Đây là dòng chữ được in ra khi điều kiện là true.</Text>
      ) : (
        <Text>Đây là dòng chữ được in ra khi điều kiện là false.</Text>
      )}
    </View>
  );
}

function LogicalOne({ condition }) {
  return (
    <View>
      {!!condition && <Text>This is rendered when condition is true.</Text>}
    </View>
  );
}
function LogicalTwo({ condition }) {
  return (
    <View>
      {!!condition || <Text>This is rendered when condition is true.</Text>}
    </View>
  );
}

function SwitchCaseConditional({ value }) {
  switch (value) {
    case 'option1':
      return <Text>Render option 1.</Text>;
    case 'option2':
      return <Text>Render option 2.</Text>;
    default:
      return <Text>Render default option.</Text>;
  }
}

export default SwitchCaseConditional;

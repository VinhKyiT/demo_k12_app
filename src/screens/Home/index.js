import * as React from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import MyListComponent from '../../examples/MyListComponent';

const HomeScreen = ({ navigation }) => {
  const users = [
    {
      id: 60,
      name: 'Finland',
    },
    {
      id: 54,
      name: 'El Salvador',
    },
    {
      id: 3,
      name: 'France',
    },
    {
      id: 9,
      name: 'Diego Garcia',
    },
    {
      id: 14,
      name: 'Serbia',
    },
  ];
  return (
    <View>
      <Text>Home Screen</Text>
      <CustomButton
        title="Đi tới màn hình Detail"
        onPress={() => navigation.navigate('Detail', { fullName: 'Vinh Ky' })}
      />
      <CustomButton title="Push Home" onPress={() => navigation.push('Home')} />
      <CustomButton
        onPress={() => navigation.replace('Detail')}
        title="Replace Detail"
      />
      <MyListComponent data={users} />
    </View>
  );
};

export default HomeScreen;

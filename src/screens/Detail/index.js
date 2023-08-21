import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const fullNameFromParams = route.params?.fullName;

  console.log('navigation.isFocused()', navigation.isFocused());

  useLayoutEffect(() => {
    if (fullNameFromParams) {
      navigation.setOptions({
        headerShown: true,
        title: fullNameFromParams,
      });
    }
  }, [fullNameFromParams, navigation]);

  console.log(navigation.getState());

  return (
    <View>
      <Text>Detail Screen</Text>
      <CustomButton onPress={() => navigation.goBack()} title="Quay về màn hình Home" />
      <CustomButton onPress={() => navigation.push('Home')} title="Push Home" />
      <CustomButton onPress={() => navigation.navigate('Home')} title="Navigate Home" />
      <CustomButton onPress={() => navigation.push('Detail')} title="Push Detail" />
      <CustomButton onPress={() => navigation.pop(5)} title="Pop" />
    </View>
  );
};

export default DetailScreen;

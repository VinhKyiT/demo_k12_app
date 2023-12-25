import Geolocation from '@react-native-community/geolocation';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import AppText from '~components/AppText';
import axiosClient from '~utils/axiosClient';
const GeoLocationScreen = () => {
  const [position, setPosition] = useState('');
  const [address, setAddress] = useState('');
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setPosition({ lat: info.coords.latitude, lng: info.coords.longitude });
    });
  }, []);

  const getAddress = useCallback(async position => {
    if (position) {
      const url = queryString.stringifyUrl({
        url: 'https://api.geoapify.com/v1/geocode/reverse',
        query: {
          lat: position?.lat,
          lon: position?.lng,
          format: 'json',
          apiKey: Config.GEOAPIFY_KEY,
        },
      });
      const result = await axiosClient.get(url);
      console.log('result', result);
      if (result) {
        setAddress(result.results?.[0]?.formatted);
      }
    }
  }, []);

  useEffect(() => {
    getAddress(position);
  }, [getAddress, position]);
  return (
    <View>
      <AppText>{address}</AppText>
    </View>
  );
};

export default GeoLocationScreen;

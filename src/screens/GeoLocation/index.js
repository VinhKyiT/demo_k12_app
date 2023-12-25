import Geolocation from '@react-native-community/geolocation';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import AppInput from '~components/AppInput';
import AppText from '~components/AppText';
import axiosClient from '~utils/axiosClient';
const GeoLocationScreen = () => {
  const [position, setPosition] = useState('');
  const [address, setAddress] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [autocompleteData, setAutocompleteData] = useState([]);

  const timerRef = useRef();
  const handleInputChange = useCallback(text => {
    setSearchTerm(text);
    if (text === '') {
      clearTimeout(timerRef?.current);
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(async () => {
      const url = queryString.stringifyUrl({
        url: 'https://api.geoapify.com/v1/geocode/autocomplete',
        query: {
          text,
          format: 'json',
          apiKey: Config.GEOAPIFY_KEY,
        },
      });
      const result = await axiosClient.get(url);
      console.log('result', result);
      if (result) {
        setAutocompleteData(result?.results);
      }
    }, 1000);
  }, []);

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
      if (result) {
        setAddress(result.results?.[0]?.formatted);
      }
    }
  }, []);

  useEffect(() => {
    getAddress(position);
  }, [getAddress, position]);
  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <AppText>{address}</AppText>
      <AppInput value={searchTerm} onChangeText={handleInputChange} />
      {Array.isArray(autocompleteData)
        ? autocompleteData.map(item => (
            <TouchableOpacity key={item?.place_id}>
              <AppText>{item.formatted}</AppText>
            </TouchableOpacity>
          ))
        : null}
    </View>
  );
};

export default GeoLocationScreen;

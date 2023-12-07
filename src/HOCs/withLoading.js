import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { getLoadingSelector } from '~redux/loading/loading.selectors';
import AppLoading from '../components/AppLoading';

function withLoading(WrappedComponent, actionTypes) {
  function HOC({ ...props }) {
    const isLoading = useSelector(state => getLoadingSelector(state, actionTypes));
    return (
      <View style={{ flex: 1 }}>
        <WrappedComponent {...props} />
        {isLoading && <AppLoading />}
      </View>
    );
  }
  return HOC;
}
export default withLoading;

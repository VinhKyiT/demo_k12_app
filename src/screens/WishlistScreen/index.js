import React, { memo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import { COLORS } from '../../constants/colors';
import styles from './styles';
import { fetchData, incrementRequest } from '../../redux/counter/counter.actions';
import withLoading from '../../HOCs/withLoading';

const WishlistScreen = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <AppText size={50} align="center">
        {count}
      </AppText>
      <AppButton
        title="Increase"
        style={{ backgroundColor: COLORS.APP_ORANGE }}
        onPress={() => {
          dispatch(fetchData());
        }}
      />
    </View>
  );
};

export default memo(withLoading(WishlistScreen, ['FETCH_DATA_REQUEST']));

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from '../../components/CustomButton';

const BottomSheetDemo = () => {
  // ref
  const bottomSheetRef = useRef(null);

  const [bottomSheetState, setBottomSheetState] = useState(-1);

  // snap point
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setBottomSheetState(index);
  }, []);

  const handleToggleBottomSheet = () => {
    if (bottomSheetState < snapPoints.length - 1) {
      bottomSheetRef.current.snapToIndex(bottomSheetState + 1);
    } else {
      bottomSheetRef.current.close();
    }
  };

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: 'red' }}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
      <CustomButton onPress={handleToggleBottomSheet} title="Open Bottom Sheet" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomSheetDemo;

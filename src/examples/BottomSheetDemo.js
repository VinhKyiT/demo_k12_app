import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../components/AppText';
import CustomButton from '../components/CustomButton';

const BottomSheetDemo = () => {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  // ref
  const bottomSheetRef = useRef(null);

  // snap point
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    if (index === -1) {
      setIsOpenBottomSheet(false);
    } else {
      setIsOpenBottomSheet(true);
    }
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <CustomButton
        title="Open Bottom Sheet"
        onPress={() => {
          if (!isOpenBottomSheet) {
            bottomSheetRef.current?.expand();
          } else {
            bottomSheetRef.current?.close();
          }
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <AppText>Awesome 🎉</AppText>
        </View>
      </BottomSheet>
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

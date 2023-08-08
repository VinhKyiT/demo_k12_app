import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Layout1 = () => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewPart}>
        <View style={styles.viewPartChild}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameText, styles.commonText]}>
              Tôi tên là Kỳ!
            </Text>
          </View>
        </View>
        <View style={styles.viewPartChild}>
          <View style={styles.centerTextContainer}>
            <Text style={styles.commonText}>Dòng chữ này nằm ở giữa</Text>
          </View>
          <View style={styles.twoColorsContainer}>
            <View style={styles.colorElement1} />
            <View
              style={[styles.colorElement1, { backgroundColor: '#4CAF50' }]}
            />
          </View>
        </View>
        <View style={styles.viewPartChild}>
          <View style={styles.colorElement2} />
          <View
            style={[styles.colorElement2, { backgroundColor: '#9098B1' }]}
          />
          <View
            style={[styles.colorElement2, { backgroundColor: '#FF3D00' }]}
          />
        </View>
      </View>
      <View style={styles.viewPart}>
        <View style={styles.blueContainer}>
          <View style={styles.pinkBlock} />
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPartChild: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 1,
    borderColor: 'black',
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 2,
  },
  avatar: {
    width: 90,
    height: 90,
    backgroundColor: '#FB7181',
    borderRadius: 15,
  },
  nameText: {
    marginTop: 20,
    marginLeft: 20,
  },
  centerTextContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
  },
  twoColorsContainer: {
    flex: 1,
  },
  colorElement1: {
    flex: 1,
    backgroundColor: '#5C61F4',
  },
  colorElement2: {
    flex: 1,
    backgroundColor: '#223263',
  },
  commonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  blueContainer: {
    backgroundColor: '#4092FF',
    width: 220,
    height: 220,
    borderRadius: 15,
  },
  pinkBlock: {
    width: 90,
    height: 90,
    backgroundColor: '#FB7181',
    borderRadius: 15,
    position: 'absolute',
    right: -45,
    top: -45,
  },
  buttonArea: {
    position: 'absolute',
    height: 80,
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    width: 160,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default React.memo(Layout1);

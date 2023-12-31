import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

const PracticeLayout01 = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: 'black' }}>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              borderRightColor: 'black',
              borderRightWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 90,
                height: 90,
                backgroundColor: '#FB7181',
                borderRadius: 15,
              }}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                marginTop: 20,
                marginLeft: 20,
              }}>
              Tôi tên là Kỳ!
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 2,
              borderRightColor: 'black',
              borderRightWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>
              Dòng chữ này nằm ở giữa
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#5C61F4' }} />
            <View style={{ flex: 1, backgroundColor: '#4CAF50' }} />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: '#223263' }} />
          <View style={{ flex: 1, backgroundColor: '#9098B1' }} />
          <View style={{ flex: 1, backgroundColor: '#FF3D00' }} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: '#4092FF',
              borderRadius: 15,
              position: 'relative',
              zIndex: 1,
              elevation: 1,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 80,
              height: 80,
              backgroundColor: '#FB7181',
              borderRadius: 15,
              top: 10,
              right: 50,
              zIndex: -1,
              elevation: 0,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={{
              width: 160,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#D9D9D9',
              borderRadius: 8,
            }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 160,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#D9D9D9',
              borderRadius: 8,
            }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PracticeLayout01;

import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { scale } from '../utils/responsive';

const Layout02 = () => {
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
                paddingLeft: 20,
                textAlignVertical: 'center',
                flex: 1,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              Tôi tên là Kỳ!
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                paddingLeft: 20,
                textAlignVertical: 'center',
                flex: 1,
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
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, backgroundColor: '#5C61F4' }} />
              <View style={{ flex: 1 }} />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                flex: 1,
                textAlignVertical: 'center',
              }}>
              Dòng chữ này nằm ở giữa
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, backgroundColor: '#4CAF50' }} />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#223263',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: scale(16),
                fontWeight: '500',
              }}>
              Text1
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#9098B1',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: scale(16),
                fontWeight: '500',
              }}>
              Text1
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FF3D00',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: scale(16),
                fontWeight: '500',
              }}>
              Text1
            </Text>
          </View>
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
              elevation: 0,
              marginTop: 20,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 80,
              height: 80,
              backgroundColor: '#FB7181',
              borderRadius: 15,
              top: 20,
              right: 50,
              zIndex: -1,
              elevation: 1,
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

export default Layout02;

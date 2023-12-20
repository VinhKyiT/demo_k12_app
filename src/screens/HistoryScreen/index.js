import { View, Text } from 'react-native';
import React, { memo } from 'react';
import styles from './styles';
import AppButton from '../../components/AppButton';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadFile } from '../../services/shared/files.services';
import { onDisplayNotification } from '../../services/shared/notification.service';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
const HistoryScreen = () => {
  const handleDisplayNotification = async () => {
    await notifee.createChannel({
      id: 'new-channel',
      name: 'New Channel',
      importance: AndroidImportance.DEFAULT,
      sound: 'iphone_sound',
    });
    const notifId = await notifee.displayNotification({
      title: 'Fake Notification',
      body: 'Here is the body of notification',
      android: {
        channelId: 'new-channel',
        smallIcon: 'ic_notfication',
        sound: 'iphone_sound',
        autoCancel: false,
        showTimestamp: true,
        // timestamp: Date.now() + 480000,
        // showChronometer: true,
        // chronometerDirection: 'down',
        progress: {
          max: 10,
          current: 5,
          indeterminate: true,
        },
        style: {
          type: AndroidStyle.BIGPICTURE,
          title: 'Fake Notification 2',
          picture:
            'https://cdn.tuoitre.vn/thumb_w/640/471584752817336320/2023/1/5/khoi-tai-san-cua-ca-si-son-tung-mtp-do-so-co-nao-091145-16729038226001862283060.jpg',
        },
        // style: {
        //   type: AndroidStyle.INBOX,
        //   lines: [
        //     '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
        //     'Second Message',
        //     'Third Message',
        //     'Forth Message',
        //   ],
        // },
        // style: {
        //   type: AndroidStyle.MESSAGING,
        //   person: {
        //     name: 'John Doe',
        //     icon: 'https://my-cdn.com/avatars/123.png',
        //   },
        //   messages: [
        //     {
        //       text: 'Hey, how are you?',
        //       timestamp: Date.now() - 600000, // 10 minutes ago
        //     },
        //     {
        //       text: 'Great thanks, food later?',
        //       timestamp: Date.now(), // Now
        //       person: {
        //         name: 'Sarah Lane',
        //         icon: 'https://my-cdn.com/avatars/567.png',
        //       },
        //     },
        //   ],
        // },
      },
    });
    console.log('notifId', notifId);
    // setTimeout(async () => {
    //   // await notifee.cancelNotification(notifId);
    //   await notifee.displayNotification({
    //     id: notifId,
    //     title: 'Fake Notification',
    //     body: 'Here is the body of notification',
    //     android: {
    //       channelId: 'new-channel',
    //       smallIcon: 'ic_notfication',
    //       sound: 'iphone_sound',
    //       autoCancel: false,
    //       showTimestamp: true,
    //       onlyAlertOnce: true,
    //       progress: {
    //         max: 10,
    //         current: 7,
    //       },
    //     },
    //   });
    // }, 2000);
  };

  const onOpenInAppBrowser = async () => {
    const isAvailable = await InAppBrowser.isAvailable();
    if (isAvailable) {
      await InAppBrowser.open('https://vinhkyit.com/product/1', {
        showTitle: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppButton
        title="Select Image"
        onPress={() => {
          ImagePicker.openPicker({ cropping: false }).then(image => {
            uploadFile(image);
            console.log(image);
          });
        }}
      />
      <AppButton title="Display Notification" onPress={handleDisplayNotification} />
      <AppButton title="Open InAppBrowser" onPress={onOpenInAppBrowser} />
    </View>
  );
};

export default memo(HistoryScreen);

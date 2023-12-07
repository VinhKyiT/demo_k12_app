/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {onDisplayNotification} from './src/services/shared/notification.service';
import notifee, {EventType} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await onDisplayNotification(remoteMessage);
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS) {
    switch (pressAction.id) {
      case 'mark-as-read': {
        // Update external API
        // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
        //   method: 'POST',
        // });

        // Remove the notification
        await notifee.cancelNotification(notification.id);
        break;
      }
      case 'reply': {
        console.log('reply', detail.input);
      }
    }
  }
});

AppRegistry.registerComponent(appName, () => App);

import { RESULTS, checkNotifications, requestNotifications } from 'react-native-permissions';
import notifee, { AndroidImportance } from '@notifee/react-native';

const allowPushNotification = successCallback => {
  checkNotifications().then(({ status }) => {
    console.log('status', status);
    switch (status) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        break;
      case RESULTS.DENIED:
        console.log('The permission has not been requested / is denied but requestable');
        requestNotifications(['alert', 'badge', 'sound']).then(({ status: reqStaus }) => {
          if (reqStaus === RESULTS.GRANTED) {
            successCallback?.();
            console.log('Request Notification permission success');
          } else {
            console.log('Request Notification permission failed');
          }
        });
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        successCallback?.();
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  });
};

const createChanel = async options => {
  const chanelOptions = options
    ? options
    : {
        id: 'default',
        name: 'Default Notifications',
        vibration: true,
        importance: AndroidImportance.HIGH,
        description: 'Common notifications',
      };
  await notifee.createChannel(chanelOptions);
};

async function onDisplayNotification(remoteMessage) {
  console.log(remoteMessage);
  const { data } = remoteMessage;
  // Display a notification
  await notifee.displayNotification({
    title: data?.title,
    body: data?.body,
    android: {
      channelId: 'default',
      smallIcon: 'ic_notfication', // optional, defaults to 'ic_launcher'.
      largeIcon:
        'https://toppng.com/uploads/preview/react-native-svg-transformer-allows-you-import-svg-aperture-science-innovators-logo-11562851994zqcpwozsvy.png',
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      actions: [
        {
          pressAction: { id: 'mark-as-read' },
          title: 'Mark as read',
        },
        {
          pressAction: { id: 'reply' },
          title: 'Reply',
          input: {
            placeholder: 'Nhap cau tra loi',
            choices: ['Yes', 'No', 'Maybe'],
          },
        },
      ],
    },
  });
}

export { allowPushNotification, createChanel, onDisplayNotification };

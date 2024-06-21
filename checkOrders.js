import {Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import BackgroundFetch from 'react-native-background-fetch';

export async function onDisplayNotification() {
  // Request permissions (required for iOS)
  console.log('onDisplayNotification');

  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'sounds.notify',
    name: 'General Notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    description: 'A channel for general notifications',
  });

  // Display a notification
  await notifee.displayNotification({
    // work in  backgeound

    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}
export const getTime = () => {
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const onEvent = async taskId => {
  console.log('started task time', getTime());
  onDisplayNotification();
  // BackgroundFetch.finish(taskId);
  console.log('finished task time', getTime());
};

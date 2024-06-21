import React, {useEffect} from 'react';
import {Pressable, SafeAreaView, StatusBar, Text} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import {onEvent, onDisplayNotification, getTime} from './checkOrders';

// Define the type for event

const App: React.FC = () => {
  useEffect(() => {
    initBackgroundFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initBackgroundFetch = async () => {
    const onTimeout = async (taskId: string) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        forceAlarmManager: true,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
      },
      onEvent,
      onTimeout,
    );

    console.log('[BackgroundFetch] configure status: ', getTime());
    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('Background fetch restricted');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('Background fetch denied');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('Background fetch is enabled');
          break;
      }
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Pressable
          onPress={() => onDisplayNotification()}
          style={{backgroundColor: 'blue', padding: 20, margin: 20}}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Press me
          </Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default App;

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { CODE_PUSH_CONTEXT_VALUE, CODE_PUSH_OPTIONS } from './config';
import CodePush from 'react-native-code-push';
import { Alert, StyleSheet, View } from 'react-native';
import AppText from '~components/AppText';
import { COLORS } from '~constants/colors';

export const CodePushContext = createContext(CODE_PUSH_CONTEXT_VALUE);

const CodePushProvider = ({ children }) => {
  const [hasNewUpdate, setHasNewUpdate] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(null);
  const [message, setMessage] = useState(null);
  const [isStartedSyncing, setIsStartedSyncing] = useState(null);

  const popupUpdateDialog = useCallback(
    (updateDescription = 'We have a new update to improve your experience!') => {
      Alert.alert('Your app has new update!', updateDescription, [
        {
          text: 'Update now!',
          onPress: () => {
            setIsStartedSyncing(true);
          },
        },
      ]);
    },
    [],
  );

  const codePushStatusChange = useCallback(_status => {
    setStatus(_status);
    switch (_status) {
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log('[CodePush] UP_TO_DATE');
        setIsUpdated(true);
        setIsStartedSyncing(false);
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        console.log('[CodePush] UNKNOWN_ERROR');
        setIsUpdated(true);
        setIsStartedSyncing(false);
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log('[CodePush] UPDATE_INSTALLED');
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        console.log('[CodePush] UPDATE_IGNORED');
        break;
      case CodePush.SyncStatus.SYNC_IN_PROGRESS:
        console.log('[CodePush] SYNC_IN_PROGRESS');
        break;
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('[CodePush] CHECKING_FOR_UPDATE');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('[CodePush] AWAITING_USER_ACTION');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('[CodePush] DOWNLOADING_PACKAGE');
        setMessage('Downloading update...');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log('[CodePush] INSTALLING_UPDATE');
        setMessage('Installing...');
        break;
      default:
        break;
    }
  }, []);

  const downloadProgressCallback = useCallback(_progess => {
    setProgress(_progess);
    console.log('_progess', _progess);
  }, []);

  useEffect(() => {
    CodePush.checkForUpdate()
      .then(update => {
        if (update) {
          setHasNewUpdate(!!update);
          popupUpdateDialog(update?.description);
        } else {
          setIsStartedSyncing(true);
        }
      })
      .catch(() => {
        setIsUpdated(true);
        setIsStartedSyncing(false);
      });
  }, [popupUpdateDialog]);

  useEffect(() => {
    if (isStartedSyncing) {
      CodePush.sync(CODE_PUSH_OPTIONS, codePushStatusChange, downloadProgressCallback);
    }
  }, [codePushStatusChange, downloadProgressCallback, isStartedSyncing]);

  return (
    <CodePushContext.Provider
      value={{
        hasNewUpdate,
        isUpdated,
        status,
        progress,
        isStartedSyncing,
        message,
      }}>
      {children}
      {!isUpdated && hasNewUpdate ? (
        <View style={styles.updateContainer}>
          {!!progress && (
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressBarActive,
                  { width: `${(progress.receivedBytes / progress.totalBytes) * 100}%` },
                ]}
              />
            </View>
          )}
          {!!message && (
            <AppText weight="semibold" size={16}>
              {message}
            </AppText>
          )}
        </View>
      ) : null}
    </CodePushContext.Provider>
  );
};

export default CodePushProvider;

const styles = StyleSheet.create({
  updateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    ...StyleSheet.absoluteFillObject,
  },
  progressBar: {
    width: '90%',
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.GRAY,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: COLORS.APP_ORANGE,
  },
});

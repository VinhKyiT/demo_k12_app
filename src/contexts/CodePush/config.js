import CodePush from 'react-native-code-push';

export const CODE_PUSH_OPTIONS = {
  installMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: false,
};

export const CODE_PUSH_CONTEXT_VALUE = {
  hasNewUpdate: false,
  isUpdated: false,
  status: null,
  progress: null,
  isSyncing: false,
  message: null,
};

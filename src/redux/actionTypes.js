export const createTypes = action => ({
  ORIGIN: action,
  REQUEST: `${action}_REQUEST`,
  SUCCESS: `${action}_SUCCESS`,
  FAILED: `${action}_FAILED`,
  RESET: `${action}_RESET`,
});

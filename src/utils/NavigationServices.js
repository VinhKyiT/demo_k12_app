import {
  CommonActions,
  createNavigationContainerRef,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

function navigate(routeName, params) {
  navigationRef.current.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

function goBack() {
  navigationRef.current.goBack();
}

function replace(routeName, params, key) {
  navigationRef.current.dispatch({
    ...StackActions.replace(routeName, params),
    key,
  });
}

function push(routeName, params, key) {
  navigationRef.current.dispatch({
    ...StackActions.push(routeName, params),
    key,
  });
}

function toggleDrawer() {
  navigationRef.current.dispatch(DrawerActions.toggleDrawer());
}

function closeDrawer() {
  navigationRef.current.dispatch(DrawerActions.closeDrawer());
}

function openDrawer() {
  navigationRef.current.dispatch(DrawerActions.openDrawer());
}

function reset(config) {
  navigationRef.current.dispatch(CommonActions.reset(config));
}

const getCurrentRoute = () => {
  const route = navigationRef.current.getCurrentRoute().name;
  return route;
};

const getState = () => {
  return navigationRef.current.getState();
};

// add other navigation functions that you need and export them
const NavigationServices = {
  isReady: navigationRef.isReady(),
  navigate,
  goBack,
  reset,
  navigationRef,
  push,
  replace,
  getCurrentRoute,
  toggleDrawer,
  closeDrawer,
  openDrawer,
  getState,
};
export default NavigationServices;

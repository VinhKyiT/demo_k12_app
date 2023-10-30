const COLORS = {
  ONBOARDING_ORANGE: '#FF4B3A',
  WHITE: '#ffffff',
  APP_ORANGE: '#FF460A',
  BLACK: '#000000',
  GRAY: '#919191',
  LIGHT_ORANGE: '#F47B0A',
  APP_PINK: '#EB4796',
  APP_SEA_BLUE: '#0038FF',
  APP_RED: '#DF2C2C',
  SCREEN_BG: '#F2F2F2',
  LIGHT_GRAY: 'rgb(196, 196, 196)',
  TAB_BAR_INACTIVE: '#ADADAF',
  TAB_BAR_ACTIVE: '#FA4A0D',
  ICON_GRAY: '#A9A9A9',
  SUPER_LIGHT_GRAY: '#EFEEEE',
  TEXT_GRAY: '#9A9A9D',
  SHADOW: '#3939391A',
  WHITE_LIST_BG: '#F9F9F9',
  DOT_INACTIVE: '#C4C4C4',
  BUTTON_ORANGE: '#FA4A0C',
  TEXT_DARK_GRAY: '#808080',
  /**
   *
   * @param {number} opacityPercent - from 0 to 100
   * @returns Color value
   */
  BlackWithOpacity: opacityPercent => `rgba(0, 0, 0, ${opacityPercent / 100})`,
  /**
   *
   * @param {number} opacityPercent - from 0 to 100
   * @returns Color value
   */
  WhiteWithOpacity: opacityPercent => `rgba(255, 255, 255, ${opacityPercent / 100})`,
};

export { COLORS };

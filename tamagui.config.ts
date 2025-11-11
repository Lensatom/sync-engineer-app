import { fonts, generateSizeTokens } from '@/tokens';
import { createAnimations } from '@tamagui/animations-react-native';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { createTamagui } from 'tamagui';

const animations = createAnimations({
  bouncy: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    type: 'spring',
  },
  lazy: {
    damping: 20,
    type: 'spring',
    stiffness: 60,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
    type: 'spring',
  },
});

// const headingFont = createInterFont();
// const bodyFont = createInterFont();

const themes = {
  light: {
    "primary1": "#FFFCFB",
    "primary2": "#FFF7F5",
    "primary3": "#FFEBE4",
    "primary4": "#FFDACB",
    "primary5": "#FFCBB8",
    "primary6": "#FFBBA6",
    "primary7": "#F8A88F",
    "primary8": "#EF8E70",
    "primary9": "#EB5017",
    "primary10": "#DD4100",
    "primary11": "#D43900",
    "primary12": "#5C2919",

    "gray1": "#FCFCFD",
    "gray2": "#F9F9FB",
    "gray3": "#EFF0F3",
    "gray4": "#E7E8EC",
    "gray5": "#E0E1E6",
    "gray6": "#D8D9E0",
    "gray7": "#CDCED7",
    "gray8": "#B9BBC6",
    "gray9": "#8B8D98",
    "gray10": "#80828D",
    "gray11": "#747682",
    "gray12": "#62636C",
    "gray13": "#1E1F24",
  
    "white": "#FFFFFF",
    "black": "#141414",
    "success": "#0CC963",
    "error": "#EE0001",
    "access": "#1E874B",
    "main": "#D43900",
    "input": "#EFF0F3",
    "transparent": "transparent"
  },
};

// build a well-typed tokens object so TS/IDE can infer literal token keys (improves intellisense)
const tokensObj = {
  color: {
    white: '#FFFFFF',
    black: '#000000',
  },
  radius: {
    0: 0,
    ...generateSizeTokens(),
    full: 99,
  },
  space: {
    true: 4,
    0: 0,
    ...generateSizeTokens(),
  },
  size: {
    true: 4,
    0: 0,
    ...generateSizeTokens(),
    full: '100%',
  },
  zIndex: {
    0: 0,
    10: 10,
    20: 20,
    100: 100,
  },
} as const;

export type AppTokens = typeof tokensObj;

const config = createTamagui({
  themes,
  // defaultTheme: 'light',
  // defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: fonts,
  tokens: tokensObj, // <- use the well-typed tokens object
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 661 },
    gtSm: { minWidth: 801 },
    gtMd: { minWidth: 1021 },
    gtLg: { minWidth: 1281 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
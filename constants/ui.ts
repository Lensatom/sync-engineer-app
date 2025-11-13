import { Dimensions } from "react-native";

export const PADDING_X = 16;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const statusColors: Record<string, { fg: string; bg: string }> = {
  warning: {
    fg: "#FF9500",
    bg: "#FFDD3326"
  },
  critical: {
    fg: "#F18401",
    bg: "#F184011F"
  },
  degraded: {
    fg: "#FF0000",
    bg: "#FF000014"
  },
  offline: {
    fg: "#62636C",
    bg: "#62636C1A"
  },
  available: {
    fg: "#138041",
    bg: "#03FF771F"
  },
  running: {
    fg: "#138041",
    bg: "#03FF771F"
  }
}
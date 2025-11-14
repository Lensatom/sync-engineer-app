import { Dimensions } from "react-native";

export const PADDING_X = 16;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const statusColors: Record<string, { fg: string; bg: string }> = {
  warning: {
    fg: "#FF9500",
    bg: "#FFDD3326"
  },
  assigned: {
    fg: "#FF9500",
    bg: "#FFDD3326"
  },
  critical: {
    fg: "#F18401",
    bg: "#F184011F"
  },
  inprogress: {
    fg: "#F18401",
    bg: "#F184011F"
  },
  degraded: {
    fg: "#FF0000",
    bg: "#FF000014"
  },
  unresolved: {
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
  },
  fixed: {
    fg: "#138041",
    bg: "#03FF771F"
  },
  " healthy": {
    fg: "#138041",
    bg: "#03FF771F"
  },
  resolved: {
    fg: "#138041",
    bg: "#03FF771F"
  },
  online: {
    fg: "#138041",
    bg: "#03FF771F"
  },
  reassigned: {
    fg: "#FF19FF",
    bg: "#FF19FF1F"
  }, 
}
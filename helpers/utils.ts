import { Linking, Platform } from "react-native";

export const formatDate = (
  input: string | number | Date,
  overrides?: Intl.DateTimeFormatOptions,
  locale: string = 'en-US'
) => {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) {
    return String(input ?? '');
  }

  const baseTime: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
  const baseDate: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

  const timeRelated: (keyof Intl.DateTimeFormatOptions)[] = ['hour', 'minute', 'second', 'hour12', 'timeZoneName'];
  const dateRelated: (keyof Intl.DateTimeFormatOptions)[] = ['weekday', 'era', 'year', 'month', 'day'];

  const timeOverrides: Intl.DateTimeFormatOptions = {};
  const dateOverrides: Intl.DateTimeFormatOptions = {};
  if (overrides) {
    for (const k of timeRelated) {
      if (k in overrides) (timeOverrides as any)[k] = (overrides as any)[k];
    }
    for (const k of dateRelated) {
      if (k in overrides) (dateOverrides as any)[k] = (overrides as any)[k];
    }
    if ('timeZone' in overrides) {
      (timeOverrides as any).timeZone = (overrides as any).timeZone;
      (dateOverrides as any).timeZone = (overrides as any).timeZone;
    }
  }

  const timeStr = new Intl.DateTimeFormat(locale, { ...baseTime, ...timeOverrides }).format(date);
  const dateStr = new Intl.DateTimeFormat(locale, { ...baseDate, ...dateOverrides }).format(date);

  return `${timeStr}, ${dateStr}`;
};

export async function openRouteTo(address: string) {
  const query = encodeURIComponent(address);
  try {
    if (Platform.OS === 'android') {
      const gnav = `google.navigation:q=${query}`; // Google Maps turn-by-turn
      if (await Linking.canOpenURL(gnav)) return Linking.openURL(gnav);
      const geo = `geo:0,0?q=${query}`; // geo fallback
      if (await Linking.canOpenURL(geo)) return Linking.openURL(geo);
      return Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${query}`); // web fallback
    } else {
      const gmaps = `comgooglemaps://?daddr=${query}&directionsmode=driving`;
      if (await Linking.canOpenURL(gmaps)) return Linking.openURL(gmaps);
      return Linking.openURL(`http://maps.apple.com/?daddr=${query}`); // Apple Maps fallback
    }
  } catch (e) {
    console.warn('[maps] openRouteTo error', e);
  }
}

export const getEfficiencyScore = (email:string) => {
  const scores:any = {
    "inuoluwadunsimi1@gmail.com": 82,
    "desiredestiny04@gmail.com": 76,
  }
  return scores[email] || 0;
};
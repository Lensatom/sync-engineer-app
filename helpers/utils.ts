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
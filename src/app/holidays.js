// Common US holidays, computed for any year. Months are 0-based (Jan = 0).
// Dates are the holidays themselves, not the observed day off when one lands on a weekend.

const SUN = 0, MON = 1, THU = 4;

/** Date of the nth `weekday` in a month (n = 1 for the first). */
function nthWeekday(year, month, weekday, n) {
  const firstDay = new Date(year, month, 1).getDay();
  return 1 + ((weekday - firstDay + 7) % 7) + (n - 1) * 7;
}

/** Date of the last `weekday` in a month. */
function lastWeekday(year, month, weekday) {
  const last = new Date(year, month + 1, 0);
  return last.getDate() - ((last.getDay() - weekday + 7) % 7);
}

/** Easter Sunday (Gregorian calendar). Returns {month, day}. */
export function easter(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return {month, day};
}

/** All holidays for a year as [{month, day, name}], in date order. */
export function holidaysForYear(year) {
  const e = easter(year);
  const list = [
    {month: 0, day: 1, name: "New Year's Day"},
    {month: 0, day: nthWeekday(year, 0, MON, 3), name: 'Martin Luther King Jr. Day'},
    {month: 1, day: 14, name: "Valentine's Day"},
    {month: 1, day: nthWeekday(year, 1, MON, 3), name: "Presidents' Day"},
    {month: 2, day: 17, name: "St. Patrick's Day"},
    {month: e.month, day: e.day, name: 'Easter'},
    {month: 4, day: nthWeekday(year, 4, SUN, 2), name: "Mother's Day"},
    {month: 4, day: lastWeekday(year, 4, MON), name: 'Memorial Day'},
    {month: 5, day: nthWeekday(year, 5, SUN, 3), name: "Father's Day"},
    {month: 5, day: 19, name: 'Juneteenth'},
    {month: 6, day: 4, name: 'Independence Day'},
    {month: 8, day: nthWeekday(year, 8, MON, 1), name: 'Labor Day'},
    {month: 9, day: nthWeekday(year, 9, MON, 2), name: 'Columbus Day'},
    {month: 9, day: 31, name: 'Halloween'},
    {month: 10, day: 11, name: 'Veterans Day'},
    {month: 10, day: nthWeekday(year, 10, THU, 4), name: 'Thanksgiving'},
    {month: 11, day: 24, name: 'Christmas Eve'},
    {month: 11, day: 25, name: 'Christmas'},
    {month: 11, day: 31, name: "New Year's Eve"},
  ];
  return list.sort((x, y) => x.month - y.month || x.day - y.day);
}

/** Holidays in one month as a Map of day → [names]. */
export function holidaysForMonth(year, month) {
  const byDay = new Map();
  for (const h of holidaysForYear(year)) {
    if (h.month !== month) continue;
    byDay.set(h.day, [...(byDay.get(h.day) ?? []), h.name]);
  }
  return byDay;
}

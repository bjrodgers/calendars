// Pure calendar helpers. Months are 0-based (Jan = 0) everywhere in this file.

// Weeks always start on Sunday.

export const View = {Month: 'month', Year: 'year'};

/** Number of days in a month; Date handles leap years (incl. 1900/2000/2100). */
export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Day numbers laid out in a fixed 6-week grid (42 cells), `null` for padding.
 * Always 6 rows so every month prints at the same size.
 */
export function monthGrid(year, month) {
  const cells = new Array(42).fill(null);
  const offset = new Date(year, month, 1).getDay();
  const count = daysInMonth(year, month);
  for (let day = 1; day <= count; day++) {
    cells[offset + day - 1] = day;
  }
  return cells;
}

/** Split a flat list of cells into weeks of 7. */
export function toWeeks(cells) {
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/** Localized weekday names, Sunday first; width is 'long' | 'short' | 'narrow'. */
export function weekdayNames(locale, width = 'long') {
  const format = new Intl.DateTimeFormat(locale, {weekday: width});
  // Jan 4 2026 is a Sunday.
  return Array.from({length: 7}, (_, i) => format.format(new Date(2026, 0, 4 + i)));
}

/** Localized month names, January first. */
export function monthNames(locale, width = 'long') {
  const format = new Intl.DateTimeFormat(locale, {month: width});
  return Array.from({length: 12}, (_, i) => format.format(new Date(2026, i, 1)));
}

/** Years offered in the year picker: always includes both the selected and current year. */
export function yearOptions(selectedYear, currentYear) {
  const from = Math.min(selectedYear, currentYear) - 2;
  const to = Math.max(selectedYear, currentYear) + 5;
  return Array.from({length: to - from + 1}, (_, i) => from + i);
}

/** Move by `delta` months, rolling the year over. Returns {year, month}. */
export function addMonths(year, month, delta) {
  const total = year * 12 + month + delta;
  return {year: Math.floor(total / 12), month: ((total % 12) + 12) % 12};
}

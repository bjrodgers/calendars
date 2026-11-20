import {View} from './calendar';

// Saved view settings. URL parameters win over localStorage, which wins over defaults.
// URL form: ?view=month&y=2026&m=11   (m is 1-12 for readability)

const storageKeys = {
  view: 'calendars-view',
  year: 'calendars-year',
  month: 'calendars-month',
};

// Keys used before 2.0 (with the old spelling); read once so saved choices carry over.
const legacyKeys = {
  view: 'calenders-display',
  year: 'calenders-year',
  month: 'calenders-month',
};

function toInt(value, min, max) {
  if (value === null || value === undefined || value === '') return undefined;
  const n = Number(value);
  return Number.isInteger(n) && n >= min && n <= max ? n : undefined;
}

function toView(value) {
  const v = value?.toString().toLowerCase();
  return v === View.Month || v === View.Year ? v : undefined;
}

/** Storage that never throws (private mode, blocked site data). */
export function safeStorage(getStorage = () => window.localStorage) {
  let storage;
  try {
    storage = getStorage();
  } catch {
    storage = null;
  }
  return {
    get(key) {
      try {
        return storage?.getItem(key) ?? null;
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        storage?.setItem(key, value);
      } catch {
        // ignore
      }
    },
  };
}

/** Returns {view, year, month (0-11)}. */
export function readSettings(search, storage, today = new Date()) {
  const params = new URLSearchParams(search);
  const stored = (name) => storage.get(storageKeys[name]) ?? storage.get(legacyKeys[name]);

  const month1 = toInt(params.get('m'), 1, 12) ?? toInt(stored('month'), 1, 12);

  return {
    view: toView(params.get('view')) ?? toView(stored('view')) ?? View.Year,
    year: toInt(params.get('y'), 1, 9999) ?? toInt(stored('year'), 1, 9999) ?? today.getFullYear(),
    month: month1 !== undefined ? month1 - 1 : today.getMonth(),
  };
}

/** Query string for the given settings (month view includes the month). */
export function settingsToSearch({view, year, month}) {
  const params = new URLSearchParams({view, y: String(year)});
  if (view === View.Month) params.set('m', String(month + 1));
  return '?' + params.toString();
}

export function saveSettings(storage, {view, year, month}) {
  storage.set(storageKeys.view, view);
  storage.set(storageKeys.year, String(year));
  storage.set(storageKeys.month, String(month + 1));
}

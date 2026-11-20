import {describe, expect, it} from 'vitest';
import {View} from './calendar';
import {readSettings, saveSettings, settingsToSearch} from './settings';

function memoryStorage(initial = {}) {
  const data = {...initial};
  return {get: (k) => data[k] ?? null, set: (k, v) => (data[k] = v), data};
}

const today = new Date(2026, 10, 20);

describe('readSettings', () => {
  it('defaults to this year in year view', () => {
    expect(readSettings('', memoryStorage(), today)).toEqual({view: View.Year, year: 2026, month: 10});
  });

  it('returns numbers from stored strings', () => {
    const s = readSettings('', memoryStorage({'calendars-year': '2027', 'calendars-month': '3'}), today);
    expect(s.year).toBe(2027);
    expect(s.month).toBe(2);
  });

  it('reads the old misspelled keys', () => {
    const storage = memoryStorage({'calenders-display': 'Month', 'calenders-year': '2025', 'calenders-month': '12'});
    expect(readSettings('', storage, today)).toEqual({view: View.Month, year: 2025, month: 11});
  });

  it('prefers URL parameters over storage', () => {
    const storage = memoryStorage({'calendars-year': '2027'});
    expect(readSettings('?view=month&y=2030&m=2', storage, today)).toEqual({view: View.Month, year: 2030, month: 1});
  });

  it('ignores invalid values', () => {
    expect(readSettings('?view=week&y=abc&m=13', memoryStorage(), today)).toEqual({
      view: View.Year, year: 2026, month: 10,
    });
  });
});

describe('round trip', () => {
  it('writes settings that read back the same', () => {
    const settings = {view: View.Month, year: 2028, month: 6};
    const storage = memoryStorage();
    saveSettings(storage, settings);
    expect(readSettings('', storage, today)).toEqual(settings);
    expect(readSettings(settingsToSearch(settings), memoryStorage(), today)).toEqual(settings);
  });

  it('leaves the month out of year-view URLs', () => {
    expect(settingsToSearch({view: View.Year, year: 2026, month: 3})).toBe('?view=year&y=2026');
  });
});

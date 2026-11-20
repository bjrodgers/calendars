import {describe, expect, it} from 'vitest';
import {addMonths, daysInMonth, monthGrid, monthNames, weekdayNames, yearOptions} from './calendar';

describe('daysInMonth', () => {
  it('handles leap years, including century rules', () => {
    expect(daysInMonth(2024, 1)).toBe(29);
    expect(daysInMonth(2026, 1)).toBe(28);
    expect(daysInMonth(2000, 1)).toBe(29);
    expect(daysInMonth(2100, 1)).toBe(28);
    expect(daysInMonth(2026, 10)).toBe(30);
    expect(daysInMonth(2026, 11)).toBe(31);
  });
});

describe('monthGrid', () => {
  it('always has 42 cells (6 weeks)', () => {
    // Feb 2026 starts on Sunday and fits in exactly 4 weeks.
    expect(monthGrid(2026, 1)).toHaveLength(42);
  });

  it('places the 1st on the right weekday, weeks starting Sunday', () => {
    // Nov 1 2026 is a Sunday.
    const grid = monthGrid(2026, 10);
    expect(grid[0]).toBe(1);
    expect(grid[29]).toBe(30);
    expect(grid[30]).toBeNull();
    // Dec 1 2026 is a Tuesday.
    expect(monthGrid(2026, 11).slice(0, 3)).toEqual([null, null, 1]);
  });

  it('fills a month that needs all 6 weeks', () => {
    // Aug 2026 starts Saturday: 31 days need 6 rows.
    const grid = monthGrid(2026, 7);
    expect(grid[6]).toBe(1);
    expect(grid[36]).toBe(31);
  });
});

describe('names', () => {
  it('lists weekdays Sunday first', () => {
    expect(weekdayNames('en-US', 'short')[0]).toBe('Sun');
    expect(weekdayNames('en-US', 'long')[6]).toBe('Saturday');
  });

  it('localizes month names', () => {
    expect(monthNames('en-US')[0]).toBe('January');
    expect(monthNames('fr-FR')[1]).toBe('février');
  });
});

describe('yearOptions', () => {
  it('includes a past selected year and the current year', () => {
    const years = yearOptions(2020, 2026);
    expect(years).toContain(2020);
    expect(years).toContain(2026);
    expect(years[0]).toBe(2018);
    expect(years.at(-1)).toBe(2031);
  });
});

describe('addMonths', () => {
  it('rolls over year boundaries both ways', () => {
    expect(addMonths(2026, 11, 1)).toEqual({year: 2027, month: 0});
    expect(addMonths(2026, 0, -1)).toEqual({year: 2025, month: 11});
    expect(addMonths(2026, 5, 0)).toEqual({year: 2026, month: 5});
  });
});

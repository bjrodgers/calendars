import {describe, expect, it} from 'vitest';
import {easter, holidaysForMonth, holidaysForYear} from './holidays';

const dateOf = (year, name) => {
  const h = holidaysForYear(year).find((x) => x.name === name);
  return `${h.month + 1}/${h.day}`;
};

describe('holidays', () => {
  it('computes Easter', () => {
    expect(easter(2024)).toEqual({month: 2, day: 31});
    expect(easter(2025)).toEqual({month: 3, day: 20});
    expect(easter(2026)).toEqual({month: 3, day: 5});
    expect(easter(2027)).toEqual({month: 2, day: 28});
  });

  it('computes the weekday-based holidays for 2026', () => {
    expect(dateOf(2026, 'Martin Luther King Jr. Day')).toBe('1/19');
    expect(dateOf(2026, "Presidents' Day")).toBe('2/16');
    expect(dateOf(2026, "Mother's Day")).toBe('5/10');
    expect(dateOf(2026, 'Memorial Day')).toBe('5/25');
    expect(dateOf(2026, "Father's Day")).toBe('6/21');
    expect(dateOf(2026, 'Labor Day')).toBe('9/7');
    expect(dateOf(2026, 'Columbus Day')).toBe('10/12');
    expect(dateOf(2026, 'Thanksgiving')).toBe('11/26');
  });

  it('handles months where the target weekday is the 1st', () => {
    // Sep 1 2025 is a Monday; Memorial Day 2027 is May 31.
    expect(dateOf(2025, 'Labor Day')).toBe('9/1');
    expect(dateOf(2027, 'Memorial Day')).toBe('5/31');
    expect(dateOf(2027, 'Thanksgiving')).toBe('11/25');
  });

  it('groups a month by day', () => {
    const dec = holidaysForMonth(2026, 11);
    expect(dec.get(25)).toEqual(['Christmas']);
    expect([...dec.keys()]).toEqual([24, 25, 31]);
    expect(holidaysForMonth(2026, 7).size).toBe(0); // August
  });
});

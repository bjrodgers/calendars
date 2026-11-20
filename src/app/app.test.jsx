import {afterEach, describe, expect, it, vi} from 'vitest';
import {cleanup, fireEvent, render, screen, within} from '@testing-library/react';
import App from './app';
import {View} from './calendar';

function setup(initial) {
  const storage = {get: () => null, set: vi.fn()};
  render(<App initial={{view: View.Month, year: 2026, month: 10, ...initial}}
              storage={storage}/>);
  return storage;
}

afterEach(cleanup);

describe('App', () => {
  it('always renders 6 week rows in month view', () => {
    setup({month: 1}); // Feb 2026 fits in 4 weeks
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('row')).toHaveLength(2 + 6);
  });

  it('steps across the year boundary with the arrows', () => {
    setup({month: 11});
    fireEvent.click(screen.getByRole('button', {name: 'Next month'}));
    expect(screen.getByRole('columnheader', {name: 'January 2027'})).toBeInTheDocument();
  });

  it('switches to year view and disables the month picker', () => {
    setup();
    fireEvent.click(screen.getByRole('radio', {name: 'Year'}));
    expect(screen.getAllByRole('table')).toHaveLength(12);
    expect(screen.getByRole('combobox', {name: 'Month'})).toBeDisabled();
  });

  it('keeps the selected year visible when it is in the past', () => {
    setup({year: 2019});
    expect(screen.getByRole('combobox', {name: 'Year'})).toHaveValue('2019');
  });

  it('labels the print button', () => {
    setup();
    expect(screen.getByRole('button', {name: 'Print'})).toBeInTheDocument();
  });

  it('starts weeks on Sunday', () => {
    setup();
    const headers = within(screen.getByRole('table')).getAllByRole('columnheader');
    expect(headers[1]).toHaveTextContent('Sunday');
  });
});

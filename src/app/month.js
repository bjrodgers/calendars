import React from 'react';
import {dayNames, daysInMonth} from "./constants";

import '../styles/month.css';

/// Props: month = Jan (0) - Dec (11)
export default function Month({year, month, large}) {
  let daysCount = daysInMonth[month];
  if (month === 1 && year % 4 === 0) daysCount++; // Account for leap year

  function _renderWeeks(days) {
    const cellClass = large ? 'cell cell-large' : 'cell';

    let weeks = Array(6);

    let week = Array(7);
    for (let i = 1; i <= days.length; i++) {
      const data = days[i - 1];

      week.push(<td key={i} className={cellClass}>{data}</td>);
      if (i % 7 === 0) {
        weeks.push(<tr key={i / 7}>{week}</tr>);
        week = Array(7);
      }
    }
    return weeks;
  }

  function _renderDayName(dayName) {
    const name = large ? dayName : dayName.substring(0, 3);

    return (
      <td key={name} className='cell bold'>{name}</td>
    );
  }

  function _render() {
    const date = new Date(year, month, 1);

    let monthLabel = date.toLocaleDateString('en-US', {month: 'long'});
    if (large) monthLabel += ' ' + year;

    const days = new Array(42).fill('');

    let dayOfWeek = date.getDay();
    for (let i = 0; i < daysCount; i++) {
      days[i + dayOfWeek] = i + 1;
    }

    const tableClass = large ? 'month month-large' : 'month';
    const titleClass = large ? 'title title-large' : 'title';

    return (
      <table className={tableClass}>
        <thead>
        <tr key='label'>
          <th className={titleClass} colSpan='7'>
            {monthLabel}
          </th>
        </tr>
        <tr key='day-labels'>
          {dayNames.map((name) => _renderDayName(name))}
        </tr>
        </thead>
        <tbody>
        {_renderWeeks(days)}
        </tbody>
      </table>
    );
  }

  return _render();
}


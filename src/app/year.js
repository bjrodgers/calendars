import React from 'react';
import Month from './month.js';
import '../styles/year.css';

export default function Year({year}) {
  const breakAt = 4;

  function _render() {
    const rows = [];
    let row = [];

    for (let i = 1; i <= 12; i++) {
      row.push(
        <td key={i} className='year-month'>
          <Month year={year} month={i - 1}/>
        </td>);

      if (i % breakAt === 0) {
        rows.push(<tr key={i / breakAt}>{row}</tr>);
        row = [];
      }
    }

    return (
      <>
        <div className="year-title">
          {year}
        </div>
        <table className='year'>
          <tbody>
          {rows}
          </tbody>
        </table>
      </>
    );
  }

  return _render();
}

import {monthGrid, monthNames, toWeeks, weekdayNames} from './calendar';
import {holidaysForMonth} from './holidays';
import '../styles/month.css';

/** One month as a table. `month` is 0-11. Always renders 6 week rows. */
export default function Month({year, month, large = false, locale, today}) {
  const weeks = toWeeks(monthGrid(year, month));
  const longNames = weekdayNames(locale, 'long');
  const shortNames = weekdayNames(locale, 'short');
  const title = monthNames(locale)[month] + (large ? ` ${year}` : '');
  const isThisMonth = today && today.getFullYear() === year && today.getMonth() === month;
  const holidays = holidaysForMonth(year, month);

  // Large months show holiday names under the date; small (year view) months mark the date
  // and give the name as a tooltip, since there's no room for text.
  function renderDay(day) {
    if (day === null) return '';
    const names = holidays.get(day);
    if (!large || !names) return day;
    return (
      <>
        <span className='day-number'>{day}</span>
        {names.map((name) => <span key={name} className='holiday-name'>{name}</span>)}
      </>
    );
  }

  function dayClass(day) {
    const classes = ['day'];
    if (holidays.has(day)) classes.push('holiday');
    if (isThisMonth && day === today.getDate()) classes.push('today');
    return classes.join(' ');
  }

  return (
    <table className={large ? 'month month-large' : 'month'}>
      <thead>
        <tr>
          <th className='month-title' colSpan={7}>{title}</th>
        </tr>
        <tr>
          {shortNames.map((short, i) => (
            <th key={i} className='day-name' scope='col' abbr={longNames[i]}>
              {large
                ? <><span className='long'>{longNames[i]}</span><span className='short'>{short}</span></>
                : short}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, w) => (
          <tr key={w}>
            {week.map((day, d) => (
              <td key={d}
                  className={dayClass(day)}
                  title={!large && holidays.has(day) ? holidays.get(day).join(', ') : undefined}
                  aria-current={isThisMonth && day === today.getDate() ? 'date' : undefined}>
                {renderDay(day)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

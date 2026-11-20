import {monthGrid, monthNames, toWeeks, weekdayNames} from './calendar';
import '../styles/month.css';

/** One month as a table. `month` is 0-11. Always renders 6 week rows. */
export default function Month({year, month, large = false, locale, today}) {
  const weeks = toWeeks(monthGrid(year, month));
  const longNames = weekdayNames(locale, 'long');
  const shortNames = weekdayNames(locale, 'short');
  const title = monthNames(locale)[month] + (large ? ` ${year}` : '');
  const isThisMonth = today && today.getFullYear() === year && today.getMonth() === month;

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
                  className={isThisMonth && day === today.getDate() ? 'day today' : 'day'}
                  aria-current={isThisMonth && day === today.getDate() ? 'date' : undefined}>
                {day ?? ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

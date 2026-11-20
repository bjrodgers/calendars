import {monthNames, View, yearOptions} from './calendar';
import '../styles/title_bar.css';

function Segmented({label, value, options, onChange}) {
  return (
    <div className='segmented' role='radiogroup' aria-label={label}>
      {options.map((opt) => (
        <button key={opt.value}
                type='button'
                role='radio'
                aria-checked={value === opt.value}
                className={value === opt.value ? 'segment selected' : 'segment'}
                onClick={() => onChange(opt.value)}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const PrintIcon = () => (
  <svg viewBox='0 0 24 24' width='20' height='20' aria-hidden='true' fill='currentColor'>
    <path d='M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z'/>
  </svg>
);

/** Screen-only toolbar. Hidden when printing. */
export function TitleBar({settings, locale, onChange, onStep, onToday, onPrint, onPrintAllMonths}) {
  const {view, year, month} = settings;
  const isYear = view === View.Year;
  const names = monthNames(locale);
  const stepLabel = isYear ? 'year' : 'month';

  return (
    <header className='title-bar'>
      <span className='app-name'>Printable Calendar</span>

      <div className='group'>
        <button type='button' className='icon-button' aria-label={`Previous ${stepLabel}`} onClick={() => onStep(-1)}>‹</button>
        <select aria-label='Month'
                className='month-select'
                value={month}
                disabled={isYear}
                onChange={(e) => onChange({month: Number(e.target.value)})}>
          {names.map((name, i) => <option key={i} value={i}>{name}</option>)}
        </select>
        <select aria-label='Year'
                className='year-select'
                value={year}
                onChange={(e) => onChange({year: Number(e.target.value)})}>
          {yearOptions(year, new Date().getFullYear()).map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <button type='button' className='icon-button' aria-label={`Next ${stepLabel}`} onClick={() => onStep(1)}>›</button>
        <button type='button' className='pill' onClick={onToday}>Today</button>
      </div>

      <div className='group'>
        <Segmented label='View'
                   value={view}
                   onChange={(v) => onChange({view: v})}
                   options={[{value: View.Month, label: 'Month'}, {value: View.Year, label: 'Year'}]}/>
      </div>

      <div className='group group-end'>
        <button type='button' className='pill pill-quiet' onClick={onPrintAllMonths}
                title={`Print all 12 months of ${year}, one month per page`}>
          Print each month
        </button>
        <button type='button' className='icon-button' aria-label='Print' title='Print' onClick={onPrint}>
          <PrintIcon/>
        </button>
      </div>
    </header>
  );
}

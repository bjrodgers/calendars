import {useEffect, useRef, useState} from 'react';
import {addMonths, View} from './calendar';
import {saveSettings, settingsToSearch} from './settings';
import {TitleBar} from './title_bar';
import Year from './year';
import Month from './month';

const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';

export default function App({initial, storage}) {
  const [settings, setSettings] = useState(initial);
  const [printAllMonths, setPrintAllMonths] = useState(false);
  const {view, year, month} = settings;
  const today = new Date();

  // Persist to localStorage and keep the URL shareable.
  useEffect(() => {
    saveSettings(storage, settings);
    const search = settingsToSearch(settings);
    if (window.location.search !== search) {
      window.history.replaceState(null, '', window.location.pathname + search);
    }
  }, [settings, storage]);

  // "Print each month": render all 12 months as pages, print, then go back.
  // The ref keeps React StrictMode's double effect run (dev only) from opening two dialogs.
  const printing = useRef(false);
  useEffect(() => {
    if (!printAllMonths) {
      printing.current = false;
      return;
    }
    if (printing.current) return;
    printing.current = true;
    window.addEventListener('afterprint', () => setPrintAllMonths(false), {once: true});
    window.print();
  }, [printAllMonths]);

  const update = (changes) => setSettings((s) => ({...s, ...changes}));

  function step(delta) {
    if (view === View.Year) update({year: year + delta});
    else update(addMonths(year, month, delta));
  }

  function goToToday() {
    update({year: today.getFullYear(), month: today.getMonth()});
  }

  const monthProps = {locale, today};

  let content;
  if (printAllMonths) {
    content = Array.from({length: 12}, (_, m) => (
      <div key={m} className='print-page'>
        <Month year={year} month={m} large {...monthProps}/>
      </div>
    ));
  } else if (view === View.Year) {
    content = <Year year={year} {...monthProps}/>;
  } else {
    content = <Month year={year} month={month} large {...monthProps}/>;
  }

  return (
    <>
      <TitleBar settings={settings}
                locale={locale}
                onChange={update}
                onStep={step}
                onToday={goToToday}
                onPrint={() => window.print()}
                onPrintAllMonths={() => setPrintAllMonths(true)}
      />
      <main className={view === View.Year && !printAllMonths ? 'page page-year' : 'page page-month'}>
        {content}
      </main>
    </>
  );
}

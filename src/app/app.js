import {TitleBar} from "./title_bar";
import {useEffect, useState} from "react";
import {displayKey, DisplayOption, monthKey, yearKey} from "./constants";
import Year from "./year";
import Month from "./month";

export default function App({
                              defaultDisplay,
                              defaultMonth,
                              defaultYear,
                            }) {

  const [display, setDisplay] = useState(defaultDisplay);
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);

  useEffect(() => {
    window.localStorage.setItem(displayKey, display.toString());
    window.localStorage.setItem(yearKey, year.toString());
    window.localStorage.setItem(monthKey, month.toString());
  }, [display, year, month]);

  /// Render the year view
  function _renderYear() {
    if (display !== DisplayOption.Year) return null;

    return <Year year={year}/>
  }

  /// Render the month view
  function _renderMonth() {
    if (display !== DisplayOption.Month) return null;

    return <Month year={year} month={month - 1} large={true}/>
  }

  /// Main render
  function _render() {
    return (
      <>
        <TitleBar defaultDisplay={defaultDisplay}
                  defaultMonth={defaultMonth}
                  defaultYear={defaultYear}
                  onDisplayOptionChange={setDisplay}
                  onYearChange={setYear}
                  onMonthChange={setMonth}
        />
        {_renderYear()}
        {_renderMonth()}
      </>
    )
  }

  return _render();
}

import {AppBar, IconButton, MenuItem, Select, Stack, Switch, Toolbar, Typography} from "@mui/material";
import {DisplayOption, months, selectStyles} from "./constants";
import {useState} from "react";
import PrintIcon from '@mui/icons-material/Print';

/**
 * TitleBar component
 */
export function TitleBar({
                           defaultDisplay,
                           defaultMonth,
                           defaultYear,
                           onDisplayOptionChange,
                           onYearChange,
                           onMonthChange,
                         }) {

  const [disableMonth, setDisableMonth] = useState(defaultDisplay === DisplayOption.Year);

  /// Handle print button click
  function _onPrintClick(_) {
    window.print();
  }

  /// Handle display type switch
  function _onOptionChange(event) {
    const option = event.target.checked;
    onDisplayOptionChange(option ? DisplayOption.Year : DisplayOption.Month);
    setDisableMonth(option);
  }

  /// Render toggle between Month view and Year view
  function _renderMonthYearSwitch() {
    return (
      <Stack direction="row" spacing={0} alignItems="center">
        <Typography>Month</Typography>
        <Switch color='default'
                defaultChecked={defaultDisplay === DisplayOption.Year}
                onChange={_onOptionChange}
        />
        <Typography>Year</Typography>
      </Stack>
    )
  }

  /// Render Year selector
  function _renderYearSwitcher() {
    const thisYear = new Date().getFullYear();

    const options = [0, 1, 2, 3, 4].map((idx) => {
      const year = thisYear + idx;
      const selected = year === defaultYear;
      return <MenuItem key={idx} value={year} selected={selected}>{year}</MenuItem>
    });

    return (
      <Select
        defaultValue={defaultYear}
        label='Year'
        onChange={(e) => onYearChange(e.target.value)}
        size='small'
        sx={selectStyles}
      >{options}
      </Select>
    )
  }

  /// Render Month selector
  function _renderMonthSwitcher() {
    const options = months.map((m) => {
      return <MenuItem key={m} value={months.indexOf(m) + 1}>{m}</MenuItem>
    });

    return (
      <Select
        defaultValue={defaultMonth}
        disabled={disableMonth}
        label='Month'
        onChange={(e) => onMonthChange(e.target.value)}
        size='small'
        sx={selectStyles}
      >{options}
      </Select>
    )
  }

  function _renderPrintButton() {
    return (
      <IconButton aria-label="add"
                  color='inherit'
                  onClick={_onPrintClick}>
        <PrintIcon/>
      </IconButton>
    )
  }

  function _render() {
    return (
      <AppBar className='no-print'
              position='static'>
        <Toolbar>
          <Stack direction="row" spacing={2} alignItems="center" sx={{flexGrow: 1}}>
            <Typography variant="h6" component="div">
              Printable Calendar
            </Typography>
            {_renderMonthSwitcher()}
            {_renderYearSwitcher()}
            {_renderMonthYearSwitch()}
          </Stack>
          {_renderPrintButton()}
        </Toolbar>
      </AppBar>
    )
  }

  return _render();
}

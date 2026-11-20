# Printable Calendar

A small React app for printing clean month and year calendars. Live at
<https://brandonjrodgers.com/calendars>.

The toolbar is screen-only; it never appears on paper.

## Using it

- **Month / Year** switches between one large month and a 4 × 3 year grid.
- **‹ ›** step by a month (month view) or a year (year view). **Today** jumps to now.
- **Print** prints the current view. **Print each month** prints all 12 months of
  the selected year, one month per page.
- Both views are sized for a landscape page (US Letter or A4). Weeks start on
  Sunday, and month view always shows 6 week rows so every month prints at the
  same size.
- Settings are remembered in the browser and kept in the URL, so a link like
  `?view=month&y=2027&m=3` opens that exact calendar.
- Month and weekday names follow the browser's language.

## Development

Built with [Vite](https://vite.dev) and tested with [Vitest](https://vitest.dev).

```bash
npm install
npm start        # dev server at http://localhost:3000/calendars/
npm test         # tests in watch mode (npx vitest run for a single run)
npm run build    # production build into build/
npm run preview  # serve the production build locally
```

The app is built for the `/calendars/` path; change `base` in
`vite.config.js` to host it somewhere else.

## Layout

- `src/app/calendar.js` – date math (days in month, the 6-week grid, names)
- `src/app/settings.js` – reading and saving settings (URL and localStorage)
- `src/app/app.jsx` – app state and printing
- `src/app/title_bar.jsx` – the toolbar
- `src/app/month.jsx`, `src/app/year.jsx` – the calendar views
- `src/styles/` – screen and print styles

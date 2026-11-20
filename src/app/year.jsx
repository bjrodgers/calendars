import Month from './month';
import '../styles/year.css';

/** Twelve small months in a 4 × 3 grid. */
export default function Year({year, ...monthProps}) {
  return (
    <section className='year'>
      <h1 className='year-title'>{year}</h1>
      <div className='year-grid'>
        {Array.from({length: 12}, (_, m) => (
          <Month key={m} year={year} month={m} {...monthProps}/>
        ))}
      </div>
    </section>
  );
}

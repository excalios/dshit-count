import React, { useState, useEffect } from 'react';
import styles from './pagination.module.css';

const Pagination: React.FC = () => {
  const [value, setValue] = useState(1);
  const [show, setShow] = useState(5); // Default number of items to show per page

  const handlePrevious = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleNext = () => {
    setValue(value + 1);
  };

  useEffect(() => {
    console.log('Value has changed:', value);
  }, [value]);

  useEffect(() => {
    console.log('Show has changed:', show);
  }, [show]);


  const handleShowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedShow = parseInt(e.target.value, 10);
    setShow(selectedShow);
  };

  return (
    <div className={styles.page}>
      <section className={styles.show}>
        Show Page :
        <select
          className={styles.select}
          title="Show Page"
          id="page"
          name="page"
          value={show}
          onChange={handleShowChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </section>
      <main className={styles.main}>
        <button className={styles.buttonText} onClick={handlePrevious}>
          Previous
        </button>
        <div>
          <input placeholder='number here'  title='' type="number" value={value} className={styles.text} disabled />
        </div>
        <button className={styles.buttonText} onClick={handleNext}>
          Next
        </button>
      </main>
    </div>
  );
};

export default Pagination;

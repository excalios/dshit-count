import React from 'react';
import styles from './pagination.module.css';

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  total_count: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  size,
  setSize,
  total_count,
}) => {
  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlesizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = parseInt(e.target.value, 10);
    setSize(selectedSize);
    setPage(1);
  };

  return (
    <div className={styles.page}>
      <section className={styles.size}>
        Page Size:
        <select
          className={styles.select}
          style={{ marginLeft: '10px' }}
          title="size Page"
          id="page"
          name="page"
          value={size}
          onChange={handlesizeChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </section>
      <main className={styles.main}>
        <button
          className={styles.buttonText}
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous
        </button>
        <div>
          <input
            placeholder="number here"
            title=""
            type="number"
            value={page}
            className={styles.text}
            disabled
          />
        </div>
        <button
          className={styles.buttonText}
          onClick={handleNext}
          disabled={page * size >= total_count}
        >
          Next
        </button>
      </main>
    </div>
  );
};

export default Pagination;

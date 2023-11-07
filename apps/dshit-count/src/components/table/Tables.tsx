import React from 'react';

import Pagination from '../pagination/pagination';

import styles from './table.module.css';

import { HitCount, RecursiveStatic } from '@dshit-count/shared/schema';

interface TablesProps {
  logs: RecursiveStatic<typeof HitCount[]>;
  size: number;
  page: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total_count: number;
}

const Tables: React.FC<TablesProps> = ({
  logs,
  page,
  setPage,
  size,
  setSize,
  total_count,
}) => {
  return (
    <main className={styles.main}>
      <h1>Hit Count Logs</h1>
      <table border={0} className={styles.table}>
        <tbody>
          <tr className={`${styles.head}`}>
            <th className={` ${styles.column1}`}>No.</th>
            <th className={`${styles.column2}`}>Instance</th>
            <th className={`${styles.column3}`}>Date and Time</th>
          </tr>
          {logs.map((log, index) => (
            <tr key={index} className={`${styles.row}`}>
              <td className={`${styles.cell} ${styles.number}`}>
                {size * (page - 1) + index + 1}
              </td>
              <td className={`${styles.cell}`}>{log.pid}</td>
              <td className={`${styles.cell}`}>
                {`${
                  new Date(Number(log.created_at)).getDate() < 10 ? '0' : ''
                }${new Date(Number(log.created_at)).getDate()}/${
                  new Date(Number(log.created_at)).getMonth() + 1
                }/${new Date(
                  Number(log.created_at)
                ).getFullYear()} - ${new Date(
                  Number(log.created_at)
                ).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        page={page}
        setPage={setPage}
        size={size}
        setSize={setSize}
        total_count={total_count}
      />
    </main>
  );
};

export default Tables;

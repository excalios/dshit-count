import React from 'react';
import styles from './table.module.css';
import Pagination from '../pagination/pagination';

const Tables = () => {
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
          {tablelist.map((table, index) => (
            <tr key={index} className={`${styles.row}`}>
              <td className={`${styles.cell} ${styles.number}`}>{index + 1}</td>
              <td className={`${styles.cell}`}>{table.instance}</td>
              <td className={`${styles.cell}`}>
                {`${
                  table.date.getDate() < 10 ? '0' : ''
                }${table.date.getDate()}/${
                  table.date.getMonth() + 1
                }/${table.date.getFullYear()} - ${table.date.toLocaleTimeString(
                  [],
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                )}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
        <Pagination />
    </main>
  );
};

export default Tables;

const tablelist = [
  {
    instance: 'instance 1',
    date: new Date(2023, 10, 6, 1, 0, 0),
  },
  {
    instance: 'instance 2',
    date: new Date(2023, 10, 6, 1, 0, 0),
  },
  {
    instance: 'instance 3',
    date: new Date(2023, 10, 6, 1, 0, 0),
  },
  {
    instance: 'instance 4',
    date: new Date(2023, 10, 6, 1, 0, 0),
  },
];

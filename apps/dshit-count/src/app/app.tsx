// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Button from '../components/button/button';
import Tables from '../components/table/Tables';

import styles from './app.module.css';

import { HitCount, RecursiveStatic } from '@dshit-count/shared/schema';

const api_url = `http://localhost:9090/api/v1`;

export function App() {
  const [logs, setLogs] = useState<RecursiveStatic<typeof HitCount[]>>([]);
  const [count, setCount] = useState(0);

  const [size, setSize] = useState(5);
  const [page, setPage] = useState(1);

  const [isReady, setIsReady] = useState(true);

  const handleClick = async () => {
    try {
      const res = await axios.post(`${api_url}/count`);
      if (res.status >= 400) {
        throw new Error(res.data);
      }
      setCount((prev) => prev + 1);
      setIsReady(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getLogs = useCallback(async () => {
    try {
      const res = await axios.get(`${api_url}/count?page=${page}&size=${size}`);
      console.log(res.data);
      const list = res.data.data.list as RecursiveStatic<typeof HitCount[]>;
      const count = Number(res.data.data.total_count);
      setLogs(list);
      setCount(count);
    } catch (error) {
      console.error(error);
    }
  }, [page, size]);

  useEffect(() => {
    getLogs();
  }, [page, size, getLogs]);

  useEffect(() => {
    if (isReady) {
      getLogs();
      setIsReady(false);
    }
  }, [isReady, getLogs]);

  return (
    <div className={styles.main}>
      <Button onClick={handleClick} value={count} />
      <Tables
        logs={logs}
        size={size}
        page={page}
        setSize={setSize}
        setPage={setPage}
        total_count={count}
      />
    </div>
  );
}

export default App;

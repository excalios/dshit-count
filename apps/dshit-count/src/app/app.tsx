// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import axios from 'axios';
import Button from '../components/button/button';

// import NxWelcome from './nx-welcome';

export function App() {
  axios.get('http://localhost:8080/health').then((data) => {
    // __AUTO_GENERATED_PRINT_VAR_START__
    console.log('App res: ', data); // __AUTO_GENERATED_PRINT_VAR_END__
  });

  return (
    <div className={styles.main}>
      {/* <NxWelcome title="dshit-count" /> */}
      <Button onClick={() => {
        axios.get('http://localhost:8080/hit').then((data) => {
          // __AUTO_GENERATED_PRINT_VAR_START__
          console.log('App res: ', data); // __AUTO_GENERATED_PRINT_VAR_END__
        });
      }} />
    </div>
  );
}

export default App;

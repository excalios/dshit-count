// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import axios from 'axios';

import NxWelcome from './nx-welcome';

export async function App() {
  const res = await axios.get('http://localhost:3333/api');
  // __AUTO_GENERATED_PRINT_VAR_START__
  console.log('App res: ', res); // __AUTO_GENERATED_PRINT_VAR_END__

  return (
    <div>
      <NxWelcome title="dshit-count" />
    </div>
  );
}

export default App;

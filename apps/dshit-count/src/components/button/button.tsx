// import React from 'react'
// import styles from'./button.module.css'

// const Button = () => {
//   return (
//     <div className={styles.container}>
//         <button className={styles.button}>Hit Counter</button>
//     </div>
//   )
// }


// export default Button

import React, { useState } from "react";
import styles from "./button.module.css";


export interface ButtonProps {
  onClick: () => void;
}
const HitCounterButton: React.FC<ButtonProps> = ({ onClick }) => {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => { setCount(count + 1); onClick() }}>Hit Counter: {count}</button>
    </div>
  );
}

export default HitCounterButton;
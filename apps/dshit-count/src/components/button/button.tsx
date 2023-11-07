import React from 'react';
import styles from './button.module.css';

export interface ButtonProps {
  onClick: () => void;
  value: number;
}
const HitCounterButton: React.FC<ButtonProps> = ({ onClick, value }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClick}>
        Hit Counter: {value}
      </button>
    </div>
  );
};

export default HitCounterButton;

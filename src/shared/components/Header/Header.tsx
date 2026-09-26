import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <span className={styles.brand}>transavia</span>
      </div>
    </header>
  );
}
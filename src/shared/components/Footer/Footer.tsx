import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© 2026 Flight Search</p>
      </div>
    </footer>
  );
}
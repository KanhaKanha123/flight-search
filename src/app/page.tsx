import { Footer, Header } from '@/shared';
import { FlightSearch } from '@/features/flights/components';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <section
            className={styles.titleSection}
            aria-labelledby="page-title"
          >
            <p className={styles.eyebrow}>
              Where do you want to go?
            </p>

            <h1
              id="page-title"
              className={styles.title}
            >
              Find your flight
            </h1>

            <p className={styles.introduction}>
              Search available flights departing from Amsterdam Schiphol.
            </p>
          </section>

          <FlightSearch />
        </div>
      </main>

      <Footer />
    </>
  );
}
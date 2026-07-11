import ApplicationForm from '@/components/ApplicationForm';
import styles from './page.module.css';
import Link from 'next/link';

export default function ApplyPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>Velvet</Link>
      </nav>
      <main className={styles.main}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>The Application</span>
          <h1 className={styles.headline}>Request an Invitation</h1>
          <p className={styles.subheadline}>
            Membership to Velvet is highly selective. Please complete the following application truthfully. Our committee reviews all submissions carefully.
          </p>
        </div>
        <div className={styles.formContainer}>
          <ApplicationForm />
        </div>
      </main>
    </div>
  );
}

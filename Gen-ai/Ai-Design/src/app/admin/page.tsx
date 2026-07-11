import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
import ApplicationCard from '@/components/ApplicationCard';

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    redirect('/apply');
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userData.user.id)
    .single();
    
  if (!profile?.is_admin) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <h2>Access Denied</h2>
          <p>You do not have administrative privileges.</p>
          <Link href="/" className={styles.homeLink}>Return Home</Link>
        </div>
      </div>
    );
  }
  
  // Fetch pending applications
  const { data: pendingApps, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      gender,
      bio,
      created_at,
      profile_hobbies (
        hobbies (
          name
        )
      )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching applications:', error);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>Velvet</Link>
        <span className={styles.adminBadge}>Committee Dashboard</span>
      </header>
      
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.headline}>Pending Applications</h1>
          <p className={styles.subheadline}>Review incoming requests for membership.</p>
        </div>
        
        {pendingApps && pendingApps.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No pending applications at this time.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {pendingApps?.map((app: any) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

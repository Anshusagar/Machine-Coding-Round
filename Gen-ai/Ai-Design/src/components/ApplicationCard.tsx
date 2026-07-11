'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './ApplicationCard.module.css';

export default function ApplicationCard({ application }: { application: any }) {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  
  const handleAction = async (newStatus: 'approved' | 'rejected') => {
    setLoading(true);
    
    const { error } = await supabase
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', application.id);
      
    setLoading(false);
    if (!error) {
      setStatus(newStatus);
    } else {
      console.error('Update error:', error);
      alert('Failed to update status');
    }
  };

  if (status !== 'pending') return null; // hide from list once actioned

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{application.full_name}</h3>
        <span className={styles.gender}>{application.gender}</span>
      </div>
      
      <div className={styles.body}>
        <p className={styles.bio}>"{application.bio}"</p>
        
        <div className={styles.hobbies}>
          {application.profile_hobbies?.map((ph: any, idx: number) => (
            <span key={idx} className={styles.hobbyTag}>{ph.hobbies.name}</span>
          ))}
        </div>
      </div>
      
      <div className={styles.actions}>
        <button 
          onClick={() => handleAction('rejected')} 
          disabled={loading}
          className={`${styles.btn} ${styles.btnReject}`}
        >
          Reject
        </button>
        <button 
          onClick={() => handleAction('approved')} 
          disabled={loading}
          className={`${styles.btn} ${styles.btnApprove}`}
        >
          Approve
        </button>
      </div>
    </div>
  );
}

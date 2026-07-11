'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './ApplicationForm.module.css';

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  
  // Hobbies from Supabase
  const [availableHobbies, setAvailableHobbies] = useState<{id: string, name: string}[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const supabase = createClient();
  
  useEffect(() => {
    async function fetchHobbies() {
      const { data } = await supabase.from('hobbies').select('id, name');
      if (data) {
        setAvailableHobbies(data);
      }
    }
    fetchHobbies();
  }, []);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(s => s + 1);
  };
  
  const handleHobbyToggle = (hobby: string) => {
    setSelectedHobbies(prev => 
      prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create account');
      
      const userId = authData.user.id;
      
      // 2. Insert profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: fullName,
          gender: gender,
          bio: bio,
        });
        
      if (profileError) {
        console.error('Profile insertion error:', profileError);
      }
      
      // 3. Insert Hobbies
      if (selectedHobbies.length > 0) {
        const hobbyInserts = selectedHobbies.map(hobbyId => ({
          profile_id: userId,
          hobby_id: hobbyId
        }));
        
        await supabase.from('profile_hobbies').insert(hobbyInserts);
      }
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred during application.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.success}>
        <h3>Application Received</h3>
        <p>Your profile has been submitted to the Velvet committee for review. We will notify you via email regarding your status.</p>
      </div>
    );
  }

  const progressPercent = ((step - 1) / 2) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.progress}>
        <div className={styles.progressLine} style={{ width: `${progressPercent}%` }} />
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1. Account</div>
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2. Identity</div>
        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3. Interests</div>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={step === 3 ? handleSubmit : handleNext} className={styles.form}>
        {step === 1 && (
          <div key="step1" className={`${styles.section} ${styles.formSection}`}>
            <h3>Create your credentials</h3>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} minLength={6} />
            </div>
            <button type="submit" className={styles.btnPrimary}>Next: Identity</button>
          </div>
        )}

        {step === 2 && (
          <div key="step2" className={`${styles.section} ${styles.formSection}`}>
            <h3>Tell us about yourself</h3>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Gender Identity</label>
              <select required value={gender} onChange={e => setGender(e.target.value)}>
                <option value="" disabled>Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Short Bio / Intent</label>
              <textarea required value={bio} onChange={e => setBio(e.target.value)} rows={4} placeholder="What are you seeking at Velvet?" />
            </div>
            <div className={styles.actions}>
              <button type="button" onClick={() => setStep(1)} className={styles.btnSecondary}>Back</button>
              <button type="submit" className={styles.btnPrimary}>Next: Interests</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div key="step3" className={`${styles.section} ${styles.formSection}`}>
            <h3>Select your refined interests</h3>
            <p className={styles.hint}>This powers our intelligent matching algorithm.</p>
            <div className={styles.hobbyGrid}>
              {availableHobbies.map(hobby => (
                <button 
                  key={hobby.id}
                  type="button" 
                  className={`${styles.hobbyPill} ${selectedHobbies.includes(hobby.id) ? styles.selected : ''}`}
                  onClick={() => handleHobbyToggle(hobby.id)}
                >
                  {hobby.name}
                </button>
              ))}
            </div>
            <div className={styles.actions}>
              <button type="button" onClick={() => setStep(2)} className={styles.btnSecondary}>Back</button>
              <button type="submit" disabled={loading} className={styles.btnPrimary}>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}


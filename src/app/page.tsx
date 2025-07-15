'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/TextFiled/Input';
import Button from '@/components/Button/Button';
import { useAuth } from '@/contexts/AuthContext';
import { validateIranianPhoneNumber } from '@/utils/validation';
import { useRandomUser } from '@/hooks/useRandomUser';
import styles from './page.module.scss';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const { login, user } = useAuth();
  const router = useRouter();
  const { getRandomUser, loading: isLoading, error: authError } = useRandomUser();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    
    // Clear error when user starts typing
    if (phoneError) {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    const validation = validateIranianPhoneNumber(phoneNumber);
    if (!validation.isValid) {
      setPhoneError(validation.error || 'شماره تلفن نامعتبر است');
      return;
    }

    setPhoneError('');

    try {
      // Use the simplified API to get random user with Iranian phone
      const userData = await getRandomUser(phoneNumber);
      
      if (userData) {
        // Store user data and redirect
        login(userData);
        router.push('/dashboard');
      } else {
        setPhoneError(authError || 'خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setPhoneError('خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>ورود به سیستم</h1>
          <p className={styles.authSubtitle}>
            برای ورود به داشبورد، شماره موبایل خود را وارد کنید
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <Input
            type="tel"
            label="شماره موبایل"
            placeholder="09xx xxx xxxx"
            value={phoneNumber}
            onChange={handlePhoneChange}
            error={phoneError}
            required
            dir="ltr"
          />

          <Button
            type="submit"
            fullWidth
            size="large"
            loading={isLoading}
            disabled={!phoneNumber.trim() || isLoading}
          >
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </Button>
        </form>

        
      </div>
    </div>
  );
}

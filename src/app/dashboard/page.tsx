'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { useAuth } from '@/contexts/AuthContext';
import styles from './dashboard.module.scss';

const DashboardPage: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to home page if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p> in loading ...</p>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <div className={styles.userInfo}>
            <img 
              src={user.picture.medium} 
              alt={`${user.name.first} ${user.name.last}`}
              className={styles.userAvatar}
            />
            <div className={styles.userDetails}>
              <h2 className={styles.userName}>
                {user.name.first} {user.name.last}
              </h2>
              <p className={styles.userContact}>
                {user.email} • {user.phone}
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="small" 
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            خروج
          </Button>
        </div>
      </header>

      <main className={styles.dashboardMain}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>
            خوش آمدید به داشبورد! 🎉
          </h1>
          <p className={styles.welcomeMessage}>
            سلام {user.name.first}، شما با موفقیت وارد سیستم شده‌اید.
          </p>
        </div>

        <div className={styles.dashboardContent}>
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>اطلاعات کاربری</h3>
            <div className={styles.cardContent}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>نام:</span>
                <span className={styles.infoValue}>
                  {user.name.first} {user.name.last}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ایمیل:</span>
                <span className={styles.infoValue}>{user.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>تلفن:</span>
                <span className={styles.infoValue}>{user.phone}</span>
              </div>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📊</div>
              <div className={styles.statInfo}>
                <h4 className={styles.statTitle}>آمار کلی</h4>
                <p className={styles.statDescription}>
                  اطلاعات آماری سیستم
                </p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>⚙️</div>
              <div className={styles.statInfo}>
                <h4 className={styles.statTitle}>تنظیمات</h4>
                <p className={styles.statDescription}>
                  مدیریت تنظیمات کاربری
                </p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>📋</div>
              <div className={styles.statInfo}>
                <h4 className={styles.statTitle}>گزارش‌ها</h4>
                <p className={styles.statDescription}>
                  مشاهده گزارش‌های سیستم
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 
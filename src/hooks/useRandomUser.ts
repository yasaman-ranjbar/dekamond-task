import { useState } from 'react';
import { fetchRandomUser } from '@/api';
import type { User } from '@/api';

export function useRandomUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomUser = async (phoneNumber: string): Promise<User | null> => {
    setLoading(true);
    setError(null);

    try {
      const user = await fetchRandomUser();
      
      // Replace API phone with Iranian phone number
      return {
        ...user,
        phone: phoneNumber,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'خطا در دریافت اطلاعات کاربر';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getRandomUser,
    loading,
    error,
  };
} 
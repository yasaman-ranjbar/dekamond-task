import { RandomUserResponse, User } from './types';

const API_URL = 'https://randomuser.me/api/?results=1&nat=us';

export async function fetchRandomUser(): Promise<User> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('خطا در دریافت اطلاعات کاربر');
    }

    const data: RandomUserResponse = await response.json();
    const randomUser = data.results[0];

    // Transform to our User type
    return {
      name: {
        first: randomUser.name.first,
        last: randomUser.name.last,
      },
      email: randomUser.email,
      phone: randomUser.phone,
      picture: {
        large: randomUser.picture.large,
        medium: randomUser.picture.medium,
        thumbnail: randomUser.picture.thumbnail,
      },
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
} 
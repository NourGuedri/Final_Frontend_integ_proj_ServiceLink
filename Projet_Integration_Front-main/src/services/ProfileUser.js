// src/services/ProfileUser.js
const API_URL = import.meta.env.VITE_API_URL;

export async function getUserProfile() {
  try {
    const response = await fetch(`${API_URL}/auth/profile/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch user profile');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
export async function updateUserProfile(profileData) {
  try {
    const response = await fetch(`${API_URL}/auth/update_profile/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        
      },
      body: profileData, // Send the FormData object directly
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error('Failed to update user profile');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

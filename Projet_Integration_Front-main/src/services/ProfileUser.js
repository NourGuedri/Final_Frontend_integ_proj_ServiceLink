// src/services/ProfileUser.js

export async function getUserProfile() {
  try {
    const response = await fetch('http://127.0.0.1:8000/auth/profile/', {
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
    console.log('Updating profile with data:', profileData); // Debugging information
    const response = await fetch('http://127.0.0.1:8000/auth/update_profile/', {
      method: 'PATCH', // Use PUT method
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(profileData)
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      console.error('Error data:', errorData); // Debugging information
      throw new Error('Failed to update user profile');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
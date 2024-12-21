// src/services/ServiceService.js

const API_BASE_URL = import.meta.env.VITE_API_URL;


export const fetchServices = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/service/list_service/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      console.error("Unauthorized request");
      return { success: false, error: "Unauthorized request" };
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      return { success: true, data };
    } else {
      console.error("Unexpected response format:", data);
      return { success: false, error: "Unexpected response format" };
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    return { success: false, error: "Error fetching services" };
  }
};

// src/services/ServiceLinkClientService.js

export async function createOrder(formData) {
  try {
    console.log('FormData entries:', Array.from(formData.entries())); // Log form data entries
    const response = await fetch(`${API_BASE_URL}/service/create_order/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      console.error('Error data:', errorData); // Log error data from server
      throw new Error('Failed to create order');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


export async function getClientOrders() {
  try {
    const response = await fetch(`${API_BASE_URL}/service/list_orders/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch client orders');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
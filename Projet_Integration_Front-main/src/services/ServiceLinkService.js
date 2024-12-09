// src/services/ServiceService.js

export const fetchServices = async (token) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/service/list_service/", {
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
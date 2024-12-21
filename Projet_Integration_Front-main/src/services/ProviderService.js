
const API_BASE_URL = import.meta.env.VITE_API_URL;


export async function fetchServices(token) {
	try {
	  const response = await fetch(`${API_BASE_URL}/service/list_service/`, {
		method: "GET",
		headers: {
		  "Authorization": `Bearer ${token}`, // Ajouter le jeton d'authentification
		},
	  });
  
	  if (!response.ok) {
		const errorData = await response.json();
		console.error("Backend Error:", errorData);
		throw new Error(errorData.detail || "Failed to fetch services");
	  }
  
	  const services = await response.json();
	  return services;
	} catch (error) {
	  console.error("Request Error:", error);
	  throw new Error("Failed to fetch services");
	}
  }
  
  
// Exemple de la fonction createProviderRequest
export const createProviderRequest = async (formData, token) => {
	const response = await fetch(`${API_BASE_URL}/provider/create/`, {
	  method: "POST",
	  headers: {
		"Authorization": `Bearer ${token}`, // Si vous utilisez un token pour l'authentification
	  },
	  body: formData, // Utilise FormData pour l'envoi des fichiers
	});
  
	if (!response.ok) {
	  throw new Error(`HTTP error! status: ${response.status}`);
	}
  
	const data = await response.json(); // Récupère la réponse JSON
	return data; // Retourne la réponse
  };
  
  
  
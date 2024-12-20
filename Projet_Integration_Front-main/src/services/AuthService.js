const API_BASE_URL = 'http://127.0.0.1:8000/auth'; // Changez cette URL selon votre backend


export async function send_login(phoneNubmer, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      credentials: 'include',

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phoneNubmer,
        password: password,
      }),
    });

	if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const errorData = await response.json();

      return {
        success: false,
        error: errorData.error 
      };
    }
  } catch (error) {
    return { success: false, error: "Network error or server not reachable" };
  }
}


export async function registerPhoneNumber (data) {
  try{
    const response = await fetch(`${API_BASE_URL}/register_phone_number/`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      return { success: true, phoneNumber: responseData.phone_number, data: responseData };
    } else {
      const errorData = await response.json();

      return {
        success: false,
        error: errorData.error 
      };
    }
  }catch (error) {
    return { success: false, error: "Network error or server not reachable" };
  }
};


// Appel de l'API pour vérifier le code de confirmation
export async function verifyCode(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/verify_code/`, {
      method: 'POST',
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      return { success: true, data: responseData };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error,
      };
    }
  } catch (error) {
    return { success: false, error: 'Network error or server not reachable' };
  }
}

// Appel de l'API pour renvoyer le code de vérification
export async function resendVerificationCode(phoneNumber) {
  try {
    const response = await fetch(`${API_BASE_URL}/resend_verification_code/`, {
      method: 'POST',
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return { success: true, data: responseData };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error,
      };
    }
  } catch (error) {
    return { success: false, error: 'Network error or server not reachable' };
  }
}

// Appel de l'API pour enregistrer un utilisateur après vérification du numéro

export const registerUser = async (password, passwordConfirm) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      credentials: 'include',

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        password_confirm: passwordConfirm,
      }),
    });

    if (!response.ok) {
      // Si la réponse n'est pas OK, on lance une erreur
      const data = await response.json();
      return { error: data.error || "An error occurred." };
    } 

    const data = await response.json(); // Si tout se passe bien, on récupère la réponse JSON
    return data; // Retourne la réponse
  } catch (error) {
    // Gestion des erreurs réseau ou autre
    return { error: "Server is unavailable. Please try again later." };
  }
};

export async function logout() {
  try {
    const response = await fetch('http://localhost:8000/auth/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // Successfully logged out.
      localStorage.removeItem('token');
    } else {
      console.error('Failed to log out');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
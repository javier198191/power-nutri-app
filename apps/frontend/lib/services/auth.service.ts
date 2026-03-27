import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3002';

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Credenciales incorrectas');
      }
      throw new Error('Algo salió mal');
    }

    const data = await response.json();
    
    if (data.access_token) {
      // Set cookie for 7 days
      Cookies.set('access_token', data.access_token, { expires: 7 });
      return data;
    }

    throw new Error('Token no recibido');
  },

  logout() {
    Cookies.remove('access_token');
  },

  getToken() {
    return Cookies.get('access_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};

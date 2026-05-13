const API_BASE_URL = 'http://localhost:5000/api';

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  level?: string;
}

interface GoogleLoginRequest {
  token: string;
}

interface AuthResponse {
  message: string;
  data: {
    user_id: number;
    username: string;
    email: string;
    role: string;
  };
  token?: string;
}

export const authAPI = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        role: 'learner',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    return response.json();
  },

  async googleLogin(tokenData: GoogleLoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/users/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokenData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Google login failed');
    }

    return response.json();
  },
};

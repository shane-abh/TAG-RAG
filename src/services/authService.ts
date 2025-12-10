import { API_BASE_URL } from '../config';
import type { AuthMeResponse, RegisterResponse } from '../types';

export const authService = {
  async checkAuth(): Promise<AuthMeResponse | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include'
      });
      return response.ok ? response.json() : null;
    } catch (error) {
      console.error('Auth check error:', error);
      return null;
    }
  },

  async register(name: string): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    return response.json();
  },

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};


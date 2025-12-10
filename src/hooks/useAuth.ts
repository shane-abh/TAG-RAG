import { useState, useEffect, useCallback, useRef } from 'react';
import type { AuthState } from '../types';
import { authService } from '../services/authService';

const initialAuthState: AuthState = {
  userName: null,
  sessionId: null,
  authToken: null,
  questionsRemaining: null,
  isAuthenticated: false,
};

interface UseAuthOptions {
  onAuthSuccess?: (name: string | null) => void;
}

export function useAuth(options: UseAuthOptions = {}) {
  const [auth, setAuth] = useState<AuthState>(initialAuthState);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const onAuthSuccessRef = useRef(options.onAuthSuccess);
  
  // Keep the callback ref updated
  useEffect(() => {
    onAuthSuccessRef.current = options.onAuthSuccess;
  }, [options.onAuthSuccess]);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const data = await authService.checkAuth();
      if (data) {
        setAuth({
          userName: data.name,
          sessionId: data.session_id,
          authToken: null, // Cookie-based auth
          questionsRemaining: data.questions_remaining,
          isAuthenticated: true,
        });
        onAuthSuccessRef.current?.(data.name);
      }
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, []);

  const register = useCallback(async (name: string): Promise<boolean> => {
    setRegisterError(null);
    try {
      const data = await authService.register(name);
      setAuth({
        userName: data.name,
        sessionId: data.session_id,
        authToken: data.token,
        questionsRemaining: data.questions_remaining,
        isAuthenticated: true,
      });
      onAuthSuccessRef.current?.(data.name);
      return true;
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : 'Registration failed');
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setAuth(initialAuthState);
    setRegisterError(null);
  }, []);

  const updateAuth = useCallback((updates: Partial<AuthState>) => {
    setAuth(prev => ({ ...prev, ...updates }));
  }, []);

  const resetError = useCallback(() => {
    setRegisterError(null);
  }, []);

  return {
    auth,
    isCheckingAuth,
    registerError,
    register,
    logout,
    updateAuth,
    resetError,
  };
}


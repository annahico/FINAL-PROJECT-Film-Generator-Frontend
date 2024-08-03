// hooks/useRegister.ts
import axios from 'axios';
import { useState } from 'react';
import { SignUPdata } from "../interface/types";

interface UseRegisterResponse {
  register: (newUser: SignUPdata) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useRegister = (): UseRegisterResponse => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (newUser: SignUPdata) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('/api/register', newUser);
      
      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError('Registration failed with status: ' + response.status);
      }
    } catch (error: any) {
      // Capturar y manejar el error
      setError(error.response?.data?.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
    success,
  };
};

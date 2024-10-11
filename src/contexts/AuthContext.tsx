import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

interface User {
  id: string;
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simular uma chamada de API para autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'user@example.com' && password === 'password') {
      const user = { id: '1', email, name: 'Usuário Teste' };
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simular uma chamada de API para cadastro
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = { id: '2', email, name };
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const resetPassword = async (email: string) => {
    // Simular uma chamada de API para redefinição de senha
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Em uma implementação real, você enviaria um email com instruções de redefinição
    console.log(`Email de redefinição de senha enviado para ${email}`);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
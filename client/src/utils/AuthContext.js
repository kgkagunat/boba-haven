import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';  // Import Apollo Client hooks
import { LOGIN_USER, SIGNUP_USER } from './mutations'; // Import mutations
import AuthService from './auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginUser, { error: loginError }] = useMutation(LOGIN_USER);
  const [signupUser, { error: signupError }] = useMutation(SIGNUP_USER);
  const errors = { loginError, signupError };

  useEffect(() => {
    if (AuthService.loggedIn()) {
      setCurrentUser(AuthService.getProfile());
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await loginUser({ variables: { email, password } });
      AuthService.login(data.login.token);
      setCurrentUser(AuthService.getProfile());
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const signup = async (username, email, password) => {
    try {
      const { data } = await signupUser({ variables: { username, email, password } });
      AuthService.login(data.signup.token);
      setCurrentUser(AuthService.getProfile());
    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    errors  // Exposing the errors so that you can use them in your components
  };

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  );
}

import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children, user }) => (
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
);

export const useAuthContext = () => useContext(AuthContext);

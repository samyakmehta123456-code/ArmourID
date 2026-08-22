import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    name: 'Siddharth R. Sharma',
    email: 'siddharth.sharma@example.in',
    phone: '+91 98******10',
    masterSeed: 'usr_master_seed_armour_9981',
    mfaEnabled: true,
    biometricsEnabled: true,
    digiLockerLinked: true,
    lastLoginDevice: 'iPhone 15 Pro (iOS 17.5)',
    lastLoginLocation: 'Mumbai, MH, India',
  });

  const [isLocked, setIsLocked] = useState(false);

  const lockVault = () => setIsLocked(true);
  const unlockVault = () => setIsLocked(false);

  const toggleMFA = () => {
    setUser(prev => ({ ...prev, mfaEnabled: !prev.mfaEnabled }));
  };

  const toggleBiometrics = () => {
    setUser(prev => ({ ...prev, biometricsEnabled: !prev.biometricsEnabled }));
  };

  const linkDigiLocker = () => {
    setUser(prev => ({ ...prev, digiLockerLinked: true }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLocked,
        lockVault,
        unlockVault,
        toggleMFA,
        toggleBiometrics,
        linkDigiLocker,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

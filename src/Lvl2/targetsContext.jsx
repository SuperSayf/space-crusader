import React, { createContext, useContext, useState } from 'react';

// Create a context
const TargetsContext = createContext();

// Create a provider component to wrap your Targets component
export const TargetsProvider = ({ children }) => {
  const [collectedTargets, setCollectedTargets] = useState(0);

  console.log('collectedTargets', collectedTargets);

  return (
    <TargetsContext.Provider value={{ collectedTargets, setCollectedTargets }}>
      {children}
    </TargetsContext.Provider>
  );
};

// Create a custom hook to use the context
export const useTargets = () => {
  const context = useContext(TargetsContext);
  if (!context) {
    throw new Error('useTargets must be used within a TargetsProvider');
  }
  return context;
};

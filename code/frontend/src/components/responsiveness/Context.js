import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [navSize, setNavSize] = useState('large');

  return (
    <SidebarContext.Provider value={{ navSize, setNavSize }}>
      {children}
    </SidebarContext.Provider>
  );
};

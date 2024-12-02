'use client'
import React, { createContext, useContext, useState } from 'react';

const ActiveButtonContext = createContext();

export const ActiveButtonProvider = ({ children }) => {
    const [isActiveButton, setIsActiveButton] = useState(false);

    return (
        <ActiveButtonContext.Provider value={{ isActiveButton, setIsActiveButton }}>
            {children}
        </ActiveButtonContext.Provider>
    );
};

export const useActiveButton = () => useContext(ActiveButtonContext);
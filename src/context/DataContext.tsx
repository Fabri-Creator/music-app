import React, { createContext, useContext, ReactNode } from 'react';
import useData from '../hooks/useData';
import { RootObject } from '../types';

// Define the shape of the context data
interface DataContextType {
    data: RootObject | undefined;
    loading: boolean;
    error: boolean;
}

// Create the context with an initial value of null
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, loading, error] = useData();
    return (
        <DataContext.Provider value={{ data, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDataContext = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};

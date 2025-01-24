"use client";

import { createContext, ReactNode, useState } from "react";

interface ILoadingContext {
  isLoading: boolean;
  handleLoadingClick: (loading: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext>({
  isLoading: false,
  handleLoadingClick: () => {},
});

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, handleLoadingClick }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;

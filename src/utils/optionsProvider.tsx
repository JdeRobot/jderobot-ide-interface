import React, { createContext, ReactNode, useContext } from "react";
import { merge } from "lodash";
import { Options } from "Types";

interface OptionsProviderProps {
  options?: Options;
  children: ReactNode;
}

const defaultOptions: Options = {
  explorer: {
    showAccentColors: false,
  },
};

const OptionsContext = createContext(defaultOptions);
export const useOptions = () => useContext(OptionsContext) ?? defaultOptions;

export const OptionsProvider = ({
  options,
  children,
}: OptionsProviderProps) => {
  return (
    <OptionsContext.Provider value={merge(defaultOptions, options)}>
      {children}
    </OptionsContext.Provider>
  );
};

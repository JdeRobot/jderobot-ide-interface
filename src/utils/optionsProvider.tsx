import React, { createContext, useContext } from "react";
import { merge } from "lodash";

export interface Options {
  editor: {
    showAccentColors?: boolean;
  };
}

interface OptionsProviderProps {
  options?: Options;
  children?: React.ReactNode;
}

const defaultOptions: Options = {
  editor: {
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

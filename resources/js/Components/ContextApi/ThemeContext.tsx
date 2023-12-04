import React, { createContext, useState } from "react";

export const ThemeContext = createContext<any>("");

export const ThemeProvider = (context: any) => {
  const [darkmode, setDarkmode] = useState();
  return (
    <div>
      <ThemeContext.Provider value={{ darkmode, setDarkmode }}>
        {context.children}
      </ThemeContext.Provider>
    </div>
  );
};
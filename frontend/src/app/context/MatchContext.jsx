import { createContext, useState } from 'react';

export const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <MatchContext.Provider value={{ selectedMatch, setSelectedMatch }}>
      {children}
    </MatchContext.Provider>
  );
};

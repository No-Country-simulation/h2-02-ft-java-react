import { createContext, useContext, useState } from 'react';

const MatchContext = createContext();

export const useMatch = () => useContext(MatchContext);

export const MatchProvider = ({ children }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const selectMatch = (match) => {
    setSelectedMatch(match);
  };

  return (
    <MatchContext.Provider value={{ selectedMatch, selectMatch }}>
      {children}
    </MatchContext.Provider>
  );
};

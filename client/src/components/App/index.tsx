import React, { useState } from "react";
import styled from "styled-components";
import SearchInput from "../InputControls";
import SearchResults from "../DnaResults";
import pattern from "../../assets/pattern.svg";
import { DNARow } from "../../api/dna";

interface DnaResultContext {
  result: Array<DNARow>;
  setResult: (r: Array<DNARow>) => void;
}

const Page = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  background-image: url(${pattern});
  background-size: 30rem 30rem;
  background-repeat: repeat;
`;

const MainContainer = styled.div`
  width: 40rem;
  border-radius: 15px;
  background-color: #fff;
  padding: 2rem;
  filter: drop-shadow(10px 10px 15rem #979797);
`;

/**
 * We can use a state management system, but to keep it lean and mean, we just utilize ReactContext to share data between components
 */
export const DnaContext = React.createContext<DnaResultContext>({
  result: [],
  setResult: () => {},
});

/**
 *  Main App component
 */
const App = () => {
  const [searchResult, setSearchResult] = useState<Array<DNARow>>([]);
  // By giving this to the provider, consumers can also update the context.
  const setResult = (results: Array<DNARow>) => setSearchResult(results);

  return (
    <Page>
      <DnaContext.Provider
        value={{
          result: searchResult,
          setResult,
        }}
      >
        <MainContainer>
          <SearchInput />
          <SearchResults />
        </MainContainer>
      </DnaContext.Provider>
    </Page>
  );
};

export default App;

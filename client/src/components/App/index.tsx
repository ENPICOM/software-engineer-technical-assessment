import React, { useState } from "react";
import styled from "styled-components";
import SearchInput from "../SearchInput";
import SearchResults from "../SearchResults";
import pattern from "../../assets/pattern.svg";
import { DNAObject } from "../../api/dna";

interface SearchResultContext {
  result: Array<DNAObject>;
  setResult: (r: Array<DNAObject>) => void;
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

export const SearchContext = React.createContext<SearchResultContext>({
  result: [],
  setResult: () => {},
});

const App = () => {
  const [searchResult, setSearchResult] = useState<Array<DNAObject>>([]);
  const setResult = (results: Array<DNAObject>) => setSearchResult(results);

  return (
    <Page>
      <SearchContext.Provider
        value={{
          result: searchResult,
          setResult,
        }}
      >
        <MainContainer>
          <SearchInput />
          <SearchResults />
        </MainContainer>
      </SearchContext.Provider>
    </Page>
  );
};

export default App;

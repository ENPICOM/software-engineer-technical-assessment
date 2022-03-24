import { useContext } from "react";
import styled from "styled-components";
import { DnaContext } from "../App";

interface BaseProps {
  base: string;
}

const SearchResultWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 8rem);
  margin-top: 4rem;
  overflow-y: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 18px;
  font-weight: 600;
`;

const DnaWrapper = styled.div`
  display: flex;
  width: calc(100% - 2rem);

  span {
    display: flex;
    justify-content: center;
    width: 5rem;
    font-size: 16px;
    font-weight: 600;
  }
`;

const DnaString = styled.div`
  display: flex;
  flex: 1;
  min-height: 20px;
  overflow-x: auto;
  margin-bottom: 1rem;
  border: 1px solid #cdcdcd;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const Base = styled.div<BaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  ${(props) => {
    switch (props.base) {
      case "T":
        return `background-color: #A2D5B7; color: black;`;
      case "G":
        return `background-color: #7DD2F3; color: black;`;
      case "C":
        return `background-color: #80181B; color: white;`;
      case "A":
      default:
        return `background-color: #232057; color: white;`;
    }
  }};
`;

const DnaResults = () => {
  const { result } = useContext(DnaContext);
  return (
    <SearchResultWrapper>
      <Header>
        <div>String</div>
        <div>Distance</div>
      </Header>
      {result
        .sort((a, b) => (a.distance && b.distance ? a.distance - b.distance : 0))
        .map((row, i) => (
          <DnaWrapper key={`${row.id}`}>
            <DnaString key={`${row}-${i}`}>
              {Array.from(row.dna_string).map((base, i) => (
                <Base key={`base-${i}`} base={base}>
                  {base}
                </Base>
              ))}
            </DnaString>
            <span>{row.distance}</span>
          </DnaWrapper>
        ))}
    </SearchResultWrapper>
  );
};

export default DnaResults;

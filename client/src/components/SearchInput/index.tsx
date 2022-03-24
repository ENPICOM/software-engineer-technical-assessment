import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SearchContext } from "../App";
import api from "../../api/dna";

interface InputStatusProps {
  isError?: boolean;
  isSuccess?: boolean;
  createEnabled?: boolean;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BarWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const InputQuery = styled.input<InputStatusProps>`
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.isError ? "red" : props.isSuccess ? "#4caf50" : "#3a53a4")};
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
  height: 3rem;
  font-size: 15px;
  padding: 10px;

  background: #4040400a;
  ::placeholder {
    color: #e32327;
  }
  :focus {
    outline: 2px solid
      ${(props) => (props.isError ? "red" : props.isSuccess ? "#4caf50" : "#3a53a4")};
    outline-offset: -2px;
  }
`;

const InputDistance = styled.input<InputStatusProps>`
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.isError ? "red" : props.isSuccess ? "#4caf50" : "#3a53a4")};
  border-left: 0;
  ${(props) => (!props.createEnabled ? "border-top-right-radius: 10px;" : "")};
  ${(props) => (!props.createEnabled ? "border-bottom-right-radius: 10px;" : "")};
  width: 7rem;
  height: 3rem;
  font-size: 15px;
  padding: 10px;

  background: #4040400a;
  ::placeholder {
    color: #e32327;
  }
  :focus {
    outline: 2px solid
      ${(props) => (props.isError ? "red" : props.isSuccess ? "#4caf50" : "#3a53a4")};
    outline-offset: -2px;
  }
`;

const CreateButton = styled.div<InputStatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 7rem;
  box-sizing: border-box;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 0;
  border: 1px solid ${(props) => (props.isError ? "red" : "#3a53a4")};
  background: #4040400a;
  cursor: pointer;
  font-weight: 600;
`;

const Notification = styled.div<InputStatusProps>`
  font-style: italic;
  color: ${(props) => (props.isError ? "red" : props.isSuccess ? "#4caf50" : "")};
`;

const SearchInput = () => {
  const { setResult } = useContext(SearchContext);

  const [inputState, setInputState] = useState({
    error: false,
    success: false,
    createEnabled: false,
    query: "",
    distance: "",
    message: "",
  });

  const queryInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    if (query === "") {
      setResult([]);
    } else {
      queryDna(query, inputState.distance);
    }

    setInputState((prev) => ({ ...prev, query }));
  };

  const distanceInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const distance = e.target.value;

    setInputState((prev) => ({ ...prev, distance }));
    queryDna(inputState.query, distance);
  };

  const queryDna = (query: string, distance?: string) => {
    api
      .searchDna(query, distance)
      .then(({ errors, result }) => {
        if (errors) {
          setInputState((prev) => ({
            ...prev,
            success: false,
            error: true,
            createEnabled: false,
            message: " Your input is invalid",
          }));
          setResult([]);
          throw new Error(errors);
        }
        setInputState((prev) => ({
          ...prev,
          error: false,
          success: false,
          createEnabled: result.filter((row) => row.dna_string === query).length === 0,
          message: `Found ${result.length} results`,
        }));
        result && setResult(result);
      })
      .catch(console.error);
  };

  const createDna = () => {
    api
      .createDna(inputState.query)
      .then(({ errors, result }) => {
        if (errors) {
          setInputState((prev) => ({
            ...prev,
            error: true,
            success: false,
            message: "Failed to insert this DNA string into the database",
          }));
          throw new Error(errors);
        }
        setInputState((prev) => ({
          ...prev,
          success: true,
          error: false,
          createEnabled: false,
          message: `Inserted one DNA string`,
        }));
        result && setResult(result);
      })
      .catch(console.error);
  };

  return (
    <InputWrapper>
      <BarWrapper>
        <InputQuery
          type="text"
          isSuccess={inputState.success}
          isError={inputState.error}
          placeholder="Type a query..."
          onChange={queryInputHandler}
        />
        <InputDistance
          type="number"
          createEnabled={inputState.createEnabled}
          placeholder="Distance"
          onChange={distanceInputHandler}
        />
        {inputState.createEnabled && (
          <CreateButton isError={inputState.error} onClick={createDna}>
            Create
          </CreateButton>
        )}
      </BarWrapper>
      <Notification isSuccess={inputState.success} isError={inputState.error}>
        {inputState.message}
      </Notification>
    </InputWrapper>
  );
};

export default SearchInput;

import React, { useContext, useState } from "react";
import styled from "styled-components";
import { DnaContext } from "../App";
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
  width: 100%;
  height: 3rem;
  padding: 10px;
  border: 1px solid ${(props) => (props.isError ? "red" : props.isSuccess ? "#4caf50" : "#3a53a4")};
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 15px;

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
  width: 7rem;
  height: 3rem;
  padding: 10px;
  border: 1px solid ${(props) => (props.isError ? "red" : props.isSuccess ? "#4caf50" : "#3a53a4")};
  border-left: 0;
  ${(props) => (!props.createEnabled ? "border-top-right-radius: 10px;" : "")};
  ${(props) => (!props.createEnabled ? "border-bottom-right-radius: 10px;" : "")};
  font-size: 15px;
  transition: all 0.5s ease-in-out;

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
  box-sizing: border-box;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid ${(props) => (props.isError ? "red" : "#3a53a4")};
  border-left: 0;
  width: ${(props) => (props.createEnabled ? "7rem" : "0")};
  color: ${(props) => (props.createEnabled ? "inherit" : "transparent")};
  ${(props) => (!props.createEnabled ? "border: none;" : "")};
  background: #4040400a;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.5s ease-in-out;
`;

const Notification = styled.div<InputStatusProps>`
  font-style: italic;
  color: ${(props) => (props.isError ? "red" : props.isSuccess ? "#4caf50" : "")};
`;

const InputControls = () => {
  // Retrieve the context
  const { setResult } = useContext(DnaContext);

  // Create a state object for local use
  const [inputState, setInputState] = useState({
    error: false,
    success: false,
    createEnabled: false,
    query: "",
    distance: "",
    message: "",
  });

  // Simple function to set an error state. Reduces code
  const setErrorState = (message: string) => {
    setInputState((prev) => ({
      ...prev,
      success: false,
      error: true,
      createEnabled: false,
      message,
    }));
  };

  // Handler for the query text input field
  const queryInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    setInputState((prev) => ({ ...prev, success: false, error: false, message: "", query }));

    // Empty queries are not allowed and will clear the result list
    if (query === "") {
      setResult([]);
    } else {
      queryDna(query, inputState.distance);
    }
  };

  // Handler for the distance number input field
  const distanceInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const distance = e.target.value;

    setInputState((prev) => ({ ...prev, distance }));
    queryDna(inputState.query, distance);
  };

  // Function that fires the query via an api method
  const queryDna = (query: string, distance?: string) => {
    api
      .searchDna(query, distance)
      .then(({ errors, result }) => {
        // If we have an error object, the call failed for some reason, so abort
        if (errors) {
          throw new Error(errors);
        }

        // Update the local state
        setInputState((prev) => ({
          ...prev,
          error: false,
          success: false,
          createEnabled: result.filter((row) => row.dna_sequence === query).length === 0,
          message: `Found ${result.length} results`,
        }));

        // Insert the search results into the context;
        setResult(result);
      })
      .catch((_) => {
        // Set local state in error state
        setErrorState("Your input is invalid");

        // Clear the context
        setResult([]);
      });
  };

  // Function that fires the create request via an api method
  const createDna = () => {
    api
      .createDna(inputState.query)
      .then(({ errors, result }) => {
        // If we have an error object, the call failed for some reason, so abort
        if (errors) {
          throw new Error(errors);
        }

        // Update the local state
        setInputState((prev) => ({
          ...prev,
          success: true,
          error: false,
          createEnabled: false,
          message: `Inserted one DNA string`,
        }));

        // On successful insert, we get the inserted object back. Replace context with this so we get visual feedback
        setResult(result);
      })
      .catch((_) => {
        // Set local state in error state
        setErrorState("Failed to insert this DNA string into the database");
      });
  };

  return (
    <InputWrapper>
      <BarWrapper>
        <InputQuery
          type="text"
          aria-label="query-input"
          placeholder="Type a query..."
          isSuccess={inputState.success}
          isError={inputState.error}
          onChange={queryInputHandler}
        />
        <InputDistance
          type="number"
          aria-label="distance-input"
          placeholder="Distance"
          createEnabled={inputState.createEnabled}
          onChange={distanceInputHandler}
        />
        <CreateButton
          aria-label="create-input"
          createEnabled={inputState.createEnabled}
          isError={inputState.error}
          onClick={createDna}
        >
          Create
        </CreateButton>
      </BarWrapper>
      <Notification
        aria-label="input-notification"
        isSuccess={inputState.success}
        isError={inputState.error}
      >
        {inputState.message}
      </Notification>
    </InputWrapper>
  );
};

export default InputControls;

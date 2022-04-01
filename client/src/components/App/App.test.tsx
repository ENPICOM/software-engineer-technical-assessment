import { act, fireEvent, render, screen } from "@testing-library/react";
import App from ".";

test("basic app functionality", async () => {
  render(<App />);

  // Get some important elements
  const queryInput = screen.getByLabelText("query-input");
  const distanceInput = screen.getByLabelText("distance-input");
  const notificationElement = screen.getByLabelText("input-notification");

  // Test presence of the elements
  expect(queryInput).toBeInTheDocument();
  expect(distanceInput).toBeInTheDocument();
  expect(notificationElement).toBeInTheDocument();

  // Enter a query value
  await act(async () => {
    fireEvent.change(queryInput, { target: { value: "ACTGTAGTCATGATC" } });
    await new Promise((r) => setTimeout(r, 500));
  });

  // Expect a notification and the create button visible
  expect(notificationElement.innerHTML).toMatch(/Found [0-9]{1,10} results/);
  const createInput = screen.getByLabelText("create-input");
  expect(createInput).toBeInTheDocument();

  // Change query to invalid value
  await act(async () => {
    fireEvent.change(queryInput, { target: { value: "BBB" } });
    await new Promise((r) => setTimeout(r, 500));
  });

  // Expect error notification
  expect(notificationElement.innerHTML).toMatch(/Your input is invalid/);
});

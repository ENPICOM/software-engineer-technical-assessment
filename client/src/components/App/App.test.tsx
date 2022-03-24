import { render, screen } from "@testing-library/react";
import ReactApp from ".";

test("renders learn react link", () => {
  render(<ReactApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

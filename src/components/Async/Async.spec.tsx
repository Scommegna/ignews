import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from ".";

test("it renders correctly", async () => {
  render(<Async />);

  screen.logTestingPlaygroundURL();

  expect(screen.getByText("hello")).toBeInTheDocument();
  // expect(await screen.findByText("click")).toBeInTheDocument();

  await waitFor(() => {
    return expect(screen.getByText("click")).toBeInTheDocument();
  });
});

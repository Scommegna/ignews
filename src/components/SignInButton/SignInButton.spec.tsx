import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "dasdas@dsadas.com",
        },
        expires: "fake-expires",
      } as any,
      status: "loading",
    });

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});

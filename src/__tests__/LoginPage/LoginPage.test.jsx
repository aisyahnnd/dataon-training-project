import { describe, test, expect, it } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { MatchMediaConfig } from "@/Utils";
import { LoginPage } from "@/Pages";

MatchMediaConfig();

it("Renders card login page correctly", () => {
  const { getByTestId, queryByTestId } = render(
    <Router>
      <LoginPage setToken="user123" />
    </Router>
  );
  expect(getByTestId("card-login")).toBeTruthy();
  expect(getByTestId("header")).toBeDefined();
  expect(getByTestId("footer")).toBeDefined();
  expect(queryByTestId("carousel-login")).toBeDefined();
  expect(getByTestId("form-login")).toBeTruthy();
  expect(getByTestId("username")).toBeTruthy();
  expect(getByTestId("password")).toBeTruthy();
  expect(getByTestId("login-button")).toBeTruthy();
});

describe("Login page test", () => {
  it("Should render login page", () => {
    render(
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setToken="user123" />}
          />
        </Routes>
      </Router>
    );
  });
});

describe("Form input test", () => {
  it("Should updates on change username input", () => {
    const { getByTestId } = render(
      <Router>
        <LoginPage setToken="user123" />
      </Router>
    );
    const username = getByTestId("username");
    fireEvent.change(username, { target: { value: "user" } });
    expect(username.value).toBe("user");
  });
  it("Should updates on change password input", () => {
    const { getByTestId } = render(
      <Router>
        <LoginPage setToken="user123" />
      </Router>
    );
    const password = getByTestId("password");
    fireEvent.change(password, { target: { value: "user1234" } });
    expect(password.value).toBe("user1234");
  });
});

describe("Submit button login test", () => {
  it("Should redirect to dashboard", () => {
    const { getByTestId } = render(
      <Router>
        <LoginPage setToken="user123" />
      </Router>
    );
    const formLogin = getByTestId("form-login");
    const username = getByTestId("username");
    const password = getByTestId("password");
    fireEvent.change(username, { target: { value: "user" } });
    fireEvent.change(password, { target: { value: "user1234" } });
    fireEvent.submit(formLogin);
    expect(window.location.pathname).toBe("/");
  });
});

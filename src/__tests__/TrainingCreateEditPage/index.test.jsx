import { describe, expect, test, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextWrapper } from "@/Context";
import { TrainingCreateEditPage } from "@/Pages";
import { MatchMediaConfig } from "@/Utils";

MatchMediaConfig();

describe("should be run create edit page", () => {
  test("will be render", () => {
    render(
      <ContextWrapper>
        <Router>
          <TrainingCreateEditPage />
        </Router>
      </ContextWrapper>
    );
    const form = screen.getByTestId("form");
    const status = screen.getAllByTestId("status");
    const trainer = screen.getAllByTestId("trainer");
    const additionalInfo = screen.getAllByTestId("additionalInfo");
    expect(status).toBeDefined;
    expect(trainer).toBeDefined;
    expect(additionalInfo).toBeDefined;
    expect(form).toBeDefined;
  });
  test("should select isOnlineClass have value true", () => {
    render(
      <ContextWrapper>
        <Router>
          <TrainingCreateEditPage />
        </Router>
      </ContextWrapper>
    );
    const value = "true";
    const select = screen.getByRole("combobox");
    fireEvent.select(select, {
      target: { value },
    });
    expect(select).toHaveProperty("value", value);
  });
  test("should eventName can change value Data on x refactory", async () => {
    render(
      <ContextWrapper>
        <Router>
          <TrainingCreateEditPage />
        </Router>
      </ContextWrapper>
    );
    const inputField = await screen.findByTestId("eventName");
    await waitFor(() =>
      expect(inputField).toString("Data on x refactory")
    );
    fireEvent.change(screen.getByTestId("eventName"), {
      target: { value: "Data on x refactory" },
    });
    expect(inputField.value).toBe("Data on x refactory");
  });
  test("should event date have a few property", () => {
    render(
      <ContextWrapper>
        <Router>
          <TrainingCreateEditPage />
        </Router>
      </ContextWrapper>
    );
    const date = screen.getByTestId("date");
    expect(date).toHaveProperty("className");
    expect(date).toHaveProperty("style");
    expect(date).toHaveProperty("children");
  });
});

describe("should be run create page and take action", () => {
  test("will be test action form", async () => {
    render(
      <ContextWrapper>
        <Router>
          <TrainingCreateEditPage />
        </Router>
      </ContextWrapper>
    );

    fireEvent.change(screen.getByTestId("trainer"), {
      target: { value: "fatur rahman" },
    });
    const response = fireEvent.click(
      screen.getByTestId("submitButton")
    );
    expect(response).toBeTruthy();
  });
});

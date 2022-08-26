import { describe, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MatchMediaConfig } from "@/Utils";
import { SelectOption } from "@/Components";

MatchMediaConfig();

describe("select box should be render", () => {
  test("should render select option event and set value is true", () => {
    render(<SelectOption type="event" />);
    const value = "true";
    const select = screen.getByRole("combobox");
    fireEvent.select(select, {
      target: { value },
    });
    expect(select).toHaveProperty("value", value);
  });
  test("should render select option status and set value is false", () => {
    render(<SelectOption type="status" />);
    const value = "false";
    const select = screen.getByRole("combobox");
    fireEvent.select(select, {
      target: { value },
    });
    expect(select).toHaveProperty("value", value);
  });
});

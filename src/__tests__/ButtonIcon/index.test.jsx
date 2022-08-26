import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ButtonIcon } from "@/Components";

describe("should be run button", () => {
  test("will be render", () => {
    const type = "button";
    render(<ButtonIcon />);
    const button = screen.getByRole("button");
    expect(button).toHaveProperty("type", type);
  });
});

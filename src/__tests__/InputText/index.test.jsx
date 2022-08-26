import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { TextInput } from "@/Components";

describe("Text input should be run ", () => {
  test("test changing value text input", () => {
    render(<TextInput style={{ width: 230, borderRadius: 5 }} />);
    const search = screen.getByTestId("inputSearch");
    fireEvent.change(search, { target: { value: "data on" } });
    expect(search.value).toBe("data on");
  });
});

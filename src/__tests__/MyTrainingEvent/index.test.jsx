import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MyTrainingEvent } from "@/Components";
import { ContextWrapper } from "@/Context";
import userEvent from "@testing-library/user-event";

it("Renders my training card correctly", () => {
  const { queryByTestId } = render(
    <ContextWrapper>
      <MyTrainingEvent />
    </ContextWrapper>
  );
  expect(queryByTestId("site-card-wrapper")).toBeTruthy();
  expect(queryByTestId("badge-mytraining")).toBeTruthy();
  expect(queryByTestId("carousel")).toBeDefined();
});

describe("MyTrainingEvent test", () => {
  it("Should display carousel", () => {
    const { queryByTestId } = render(
      <ContextWrapper>
        <MyTrainingEvent />
      </ContextWrapper>
    );

    userEvent.click(queryByTestId("carousel"));
    expect(queryByTestId("site-card-wrapper")).toBeDefined();
  });
});

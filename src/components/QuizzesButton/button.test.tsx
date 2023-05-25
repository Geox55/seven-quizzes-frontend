import React from "react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import QuizzesButton from "./QuizzesButton";

describe("Button component tests", () => {
  it("render correct", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<QuizzesButton className={"card_button_answer"} disabled={false}
                                                onChange={() => mockOnClick}>Test button</QuizzesButton>);
    expect(getByText("Test button")).toBeInTheDocument();
  });

  it("enabled click correct", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <QuizzesButton className={"card_button_answer"} disabled={false} onChange={mockOnClick}> Test
        button </QuizzesButton>
    );

    act(() => {
      fireEvent.click(getByText("Test button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
    expect(getByText("Test button")).toBeInTheDocument();
  });

  it("disabled click correct", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <QuizzesButton className={"card_button_answer"} onChange={mockOnClick} disabled={true}> Test
        button </QuizzesButton>
    );

    act(() => {
      fireEvent.click(getByText("Test button"));
      expect(mockOnClick).toHaveBeenCalledTimes(0);
    });

    expect(getByText("Test button")).toBeInTheDocument();
  });

  it("check className", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <QuizzesButton className={"card_button_answer"} onChange={mockOnClick} disabled={false}>Test
        button</QuizzesButton>
    );
    expect(document.getElementsByClassName("button")[0]).toHaveClass("card_button_answer");
    expect(getByText("Test button")).toBeInTheDocument();
  });

  it("disabled style correct", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <QuizzesButton className={"card_button_answer"} onChange={mockOnClick} disabled={true}> Test
        button </QuizzesButton>
    );

    expect(document.getElementsByClassName("button")[0]).toHaveClass("card_button_disabled");
    expect(getByText("Test button")).toBeInTheDocument();
  });
});

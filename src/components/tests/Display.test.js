import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Display from "./../Display";
import mockFetch from "./../../api/fetchShow";
jest.mock("./../../api/fetchShow")
 
const testShow = {
  name: "Test Show",
  summary: "Test Summary, test text",
  seasons: [
    { id: 0, name: "Test Season 1", episodes: [] },
    { id: 1, name: "Test Season 2", episodes: [] },
    { id: 2, name: "Test Season 3", episodes: [{
        id: 3,
        image: null,
        name: "",
        number: 3,
        runtime: 3,
        season: 3,
        summary: "Summary, test text",
      }]
    },
  ]
}

test("renders without errors", () => {
  render(<Display />);
})

test("when the fetch button is pressed, the show component will display", async () => {
  //Arrange:
  mockFetch.mockResolvedValueOnce(testShow);
  render(<Display />);
  //Act:
  const button = screen.getByRole("button")
  userEvent.click(button);
  //Assert:
  const show = await screen.findByTestId("show-container")
  expect(show).toBeInTheDocument();
})

test("when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data", async () => {
  //Arrange:
  mockFetch.mockResolvedValueOnce(testShow);
  render(<Display />);
  //Act:
  const button = screen.getByRole("button")
  userEvent.click(button);
  //Assert:
  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(3);
  })
})

test("when the button is pressed displayFunc is called", async () => {
   //Arrange:
   mockFetch.mockResolvedValueOnce(testShow);
   const displayFunc = jest.fn();
   render(<Display displayFunc={displayFunc}/>);
   //Act:
   const button = screen.getByRole("button")
   userEvent.click(button);
   //Assert:
   await waitFor(() => {
     expect(displayFunc).toHaveBeenCalled();
   })
})

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
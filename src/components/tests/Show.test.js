import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

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

test('renders testShow and no selected Season without errors', ()=>{
  //Arrange:
  render(<Show show={testShow} selectedSeason={"none"}/>);
});

test('renders Loading component when prop show is null', () => {
  //Arrange:
  render(<Show show={null}/>);
  //Act:
  const loadingContainer = screen.queryByTestId("loading-container");
  //Assert:
  expect(loadingContainer).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', ()=>{
  //Arrange:
  render(<Show show={testShow} selectedSeason={"none"}/>);
  //Act:
  const seasonOptions = screen.queryAllByTestId("season-option");
  //Assert:
  expect(seasonOptions).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
  //Arrange:
  const handleSelect = jest.fn();
  render(<Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect}/>);
  //Act:
  const selectSeason = screen.getByLabelText(/select a season/i)
  userEvent.selectOptions(selectSeason, ["0"]);
  //Assert:
  expect(handleSelect).toBeCalled();

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  //Arrange 1:
  const { rerender } = render(<Show show={testShow} selectedSeason={"none"}/>);
  //Act 1:
  let episodesContainer = screen.queryByTestId("episodes-container");
  //Assert 1:
  expect(episodesContainer).toBeFalsy();
  //Arrange 2:
  rerender(<Show show={testShow} selectedSeason={2}/>);
  //Act 2:
  episodesContainer = screen.queryByTestId("episodes-container");
  //Assert 2:
  expect(episodesContainer).toBeTruthy();
});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
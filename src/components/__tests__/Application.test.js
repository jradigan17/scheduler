import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, waitForElementToBeRemoved, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";
// import axios from "__mocks__/axios";
import { prettyDOM } from "@testing-library/react";


afterEach(cleanup);


describe("Application", () => {
// --------------------------------------------------
  xit("renders without crashing", () => {
    render(<Application />);
  });

// --------------------------------------------------
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

// --------------------------------------------------
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

// --------------------------------------------------
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // console.log(prettyDOM(container));
    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));
    // const appointment = appointments[0];
    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // debug();
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElementToBeRemoved(() => queryByText(appointment, "Saving"));

    // await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, 'day').find(each => queryByText(each, "Monday"))
    // console.log(prettyDOM(day));

    // debug();
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

// --------------------------------------------------
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, /Are you sure you would like to delete/i)).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, 'Confirm'))

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => queryByAltText(appointment, 'Add'));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

    const day = getAllByTestId(container, 'day').find(each => queryByText(each, "Monday"))

    expect(getByAltText(appointment, "Add")).toBeInTheDocument();
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });
// --------------------------------------------------

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the "Edit" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Enter the name "Lydia Miller-Jones" into the input.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElementToBeRemoved(() => queryByText(appointment, "Saving"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, 'day').find(each => queryByText(each, "Monday"))

    // debug();
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });
// --------------------------------------------------

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];

    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Mock Reject "Save" appointment
    await waitForElementToBeRemoved(() => queryByText(appointment, "Saving"));

    // 8. Error Messaging
    expect(getByText(appointment, "There was an error adding your appointment. Try again later.")).toBeInTheDocument();
  
    expect(getByText(appointment, "Error")).toBeInTheDocument();

    // 9. Fire close on error message
    fireEvent.click(queryByAltText(appointment, "Close"));

    const day = getAllByTestId(container, 'day').find(each => queryByText(each, "Monday"))

    expect(queryByText(appointment, "Lydia Miller-Jones")).not.toBeInTheDocument();
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
    expect(getByText(appointment, 'Save')).toBeInTheDocument();
    expect(getByText(appointment, 'Cancel')).toBeInTheDocument();

    // 10. Fire cancel and verify no change to days
    fireEvent.click(queryByText(appointment, "Cancel"))
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();

  });
// --------------------------------------------------
  
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, /Are you sure you would like to delete/i)).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, 'Confirm'))

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Mock Reject "Delete" appointment
    await waitForElementToBeRemoved(() => queryByText(appointment, "Deleting"));

    // 8. Error Messaging
    expect(getByText(appointment, "There was an error deleting your appointment. Try again later.")).toBeInTheDocument();

    expect(getByText(appointment, "Error")).toBeInTheDocument();

    // 9. Fire close on error message
    fireEvent.click(queryByAltText(appointment, "Close"));

    const day = getAllByTestId(container, 'day').find(each => queryByText(each, "Monday"))

    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
    expect(getByAltText(appointment, 'Edit')).toBeInTheDocument();
    expect(getByAltText(appointment, 'Delete')).toBeInTheDocument();

  });
// --------------------------------------------------
});

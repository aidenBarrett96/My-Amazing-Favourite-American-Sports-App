import { dummyPeople } from "app/person/__dummy__/people.dummy"
import { render, fireEvent } from "test/utils"

import Home from "./index"

test("Renders all of the table headers", () => {
  const tableHeaders = ["Name", "Enabled", "Valid", "Authorised", "Palindromes", "Favourite Sports"]

  const { getByText } = render(<Home people={dummyPeople} />)

  tableHeaders.forEach((heading) => {
    expect(getByText(heading)).toBeInTheDocument()
  })
})

test("There should be 3 items per page", () => {
  const { container } = render(<Home people={dummyPeople} />)

  const rows = container.querySelectorAll("tbody tr")

  expect(rows.length).toBeLessThanOrEqual(3)
})

test("People data should be shown in the table", () => {
  const { getByText } = render(<Home people={dummyPeople} />)

  dummyPeople.slice(0, 3).forEach((person) => {
    expect(getByText(`${person.firstName} ${person.lastName}`)).toBeInTheDocument()
  })
})

test("Clicking the next page should show new data", () => {
  const { getByText } = render(<Home people={dummyPeople} />)

  const page2Button = getByText("2")

  fireEvent.click(page2Button, new Event("click"))

  dummyPeople.slice(3, 3).forEach((person) => {
    expect(getByText(`${person.firstName} ${person.lastName}`)).toBeInTheDocument()
  })
})

test("Each persons name should be clickable to go to their update page", () => {
  const { getByText } = render(<Home people={dummyPeople} />)

  dummyPeople.slice(0, 3).forEach((person) => {
    const link = getByText(`${person.firstName} ${person.lastName}`)

    expect(link).toHaveAttribute("href", `/person/${person.personId}`)
  })
})

test("The favourite sports should be rendered joined by a comma", () => {
  const { getByText } = render(<Home people={dummyPeople} />)

  dummyPeople.slice(0, 3).forEach((person) => {
    const favouriteSports = person.favouriteSports.map((sport) => sport.name).join(", ")

    expect(getByText(favouriteSports)).toBeInTheDocument()
  })
})

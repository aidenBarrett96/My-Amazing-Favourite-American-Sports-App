import { dummyPerson } from "app/person/__dummy__/person.dummy"
import { render, fireEvent } from "test/utils"

import PersonPage from "./[id]"

const requiredFields = [
  "firstName",
  "lastName",
  "isEnabled",
  "isValid",
  "isAuthorised",
  "isPalindrome",
]

test("Renders all of the fields with a label", () => {
  const { container } = render(<PersonPage person={dummyPerson} />)

  requiredFields.forEach((field) => {
    const input = container.querySelector(`[name=${field}]`)
    expect(input).toBeInTheDocument()
  })
})

test("The text fields should have the correct default values", () => {
  const { container } = render(<PersonPage person={dummyPerson} />)

  const textFieldNames = ["firstName", "lastName"]

  textFieldNames.forEach((field) => {
    const input = container.querySelector(`[name=${field}]`)
    expect(input).toHaveValue(dummyPerson[field])
  })
})

test("The toggle inputs should have the correct default value", () => {
  const { container } = render(<PersonPage person={dummyPerson} />)

  const toggleFieldNames = ["isEnabled", "isValid", "isAuthorised", "isPalindrome"]

  toggleFieldNames.forEach((field) => {
    const input = container.querySelector(`[name=${field}]`)
    if (!!dummyPerson[field]) {
      expect(input).toBeChecked()
    } else {
      expect(input).not.toBeChecked()
    }
  })
})

test("The checkbox inputs should have the correct default value", () => {
  const { container } = render(<PersonPage person={dummyPerson} />)

  const checkboxFieldNames = ["American Football", "Baseball", "Basketball"]

  checkboxFieldNames.forEach((field) => {
    const input = container.querySelector(`[name='${field}']`)
    if (!!dummyPerson.favouriteSports.find(({ name }) => name === field)?.isEnabled) {
      expect(input).toBeChecked()
    } else {
      expect(input).not.toBeChecked()
    }
  })
})

test("You should be able to change all of the values", () => {
  const { container } = render(<PersonPage person={dummyPerson} />)

  const textFieldNames = ["firstName", "lastName"]

  textFieldNames.forEach((field) => {
    const input = container.querySelector(`[name=${field}]`) as any
    expect(input).toHaveValue(dummyPerson[field])

    input.value = "New Value"
    fireEvent.change(input)
    fireEvent(input, new Event("change"))

    expect(input).toHaveValue("New Value")
  })
  const toggleFieldNames = ["isEnabled", "isValid", "isAuthorised", "isPalindrome"]

  toggleFieldNames.forEach((field) => {
    const input = container.querySelector(`[name=${field}]`) as any
    if (!!dummyPerson[field]) {
      expect(input).toBeChecked()
    } else {
      expect(input).not.toBeChecked()
    }

    input.click()

    if (!!dummyPerson[field]) {
      expect(input).not.toBeChecked()
    } else {
      expect(input).toBeChecked()
    }
  })

  const checkboxFieldNames = ["American Football", "Baseball", "Basketball"]

  checkboxFieldNames.forEach((field) => {
    const input = container.querySelector(`[name='${field}']`) as any
    if (!!dummyPerson.favouriteSports.find(({ name }) => name === field)?.isEnabled) {
      expect(input).toBeChecked()
    } else {
      expect(input).not.toBeChecked()
    }

    input.click()
    fireEvent(input as Element, new Event("change"))

    if (!!dummyPerson.favouriteSports.find(({ name }) => name === field)?.isEnabled) {
      expect(input).not.toBeChecked()
    } else {
      expect(input).toBeChecked()
    }
  })
})

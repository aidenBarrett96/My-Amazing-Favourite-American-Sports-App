import { Person } from "../person.types"

export const dummyPerson: Person = {
  personId: 1,
  firstName: "John",
  lastName: "Doe",
  isEnabled: true,
  isValid: true,
  isAuthorised: true,
  isPalindrome: true,
  favouriteSports: [
    {
      sportId: 1,
      name: "American Football",
      isEnabled: false,
    },
    {
      sportId: 2,
      name: "Baseball",
      isEnabled: false,
    },
    {
      sportId: 3,
      name: "Basketball",
      isEnabled: true,
    },
  ],
}

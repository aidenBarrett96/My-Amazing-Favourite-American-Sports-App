import { Person } from "app/person/person.types"
import { getAllPeopleEndpoint } from "app/lib/endpoints"
import axios from "axios"

/** Simple function to get all athletes from the athlete endpoint */
export const getAllPeople = async (): Promise<Person[]> => {
  // Try and get the athletes from the endpoint
  try {
    const { data } = await axios.get(getAllPeopleEndpoint())

    // If no data is returned throw an error
    if (!data) {
      throw new Error("No data returned from server")
    }

    return data
  } catch (err) {
    // If an error is thrown log it and return an empty array
    console.error(err)
    return []
  }
}

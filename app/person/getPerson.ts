import { getPersonEndpoint } from "app/lib/endpoints"
import axios from "axios"
import { Person } from "./person.types"

/** Simple function to get all athletes from the athlete endpoint */
export const getPerson = async (id: string): Promise<Person | null> => {
  // Try and get the athletes from the endpoint
  try {
    const { data } = await axios.get(getPersonEndpoint(id))

    // If no data is returned throw an error
    if (!data) {
      throw new Error("No data returned from server")
    }

    return data
  } catch (err) {
    // If an error is thrown log it and return an empty array
    console.error(err)
    return null
  }
}

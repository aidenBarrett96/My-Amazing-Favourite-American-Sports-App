import { useEffect, useState } from "react"
import { Person } from "app/person/person.types"
import { getAllPeople } from "./getAllPeople"
import {
  useClientSidePagination,
  UsePaginationReturns,
} from "app/utilities/pagination/usePagination"

export const useGetAllPeople = (): UsePaginationReturns<Person> => {
  const [people, setPeople] = useState<Person[] | null>(null)

  useEffect(() => {
    getAllPeople().then((people) => setPeople(people))
  }, [setPeople])

  // Implement client side pagination
  const peopleWithPagination = useClientSidePagination<Person>({ data: people || [] })

  return peopleWithPagination
}

import {
  Box,
  Container,
  Heading,
  HStack,
  LinkBox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { getAllPeople } from "app/person/getAllPeople"
import { Person } from "app/person/person.types"
import { PaginationButtons } from "app/utilities/pagination/PaginationButtons"
import { useClientSidePagination } from "app/utilities/pagination/usePagination"
import { BlitzPage, GetStaticProps, Link } from "blitz"

interface HomePageProps {
  people: Person[]
}

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage<HomePageProps> = ({ people }) => {
  // Paginate the people from props
  const [paginatedPeople, peoplePaginationDetails] = useClientSidePagination({ data: people })
  return (
    <Container maxW="container.lg" as="main" py="80px">
      <Heading mb="4">My Amazing Favourite American Sports App</Heading>
      <Box overflow="auto">
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Enabled</Th>
              <Th>Valid</Th>
              <Th>Authorised</Th>
              <Th>Palindromes</Th>
              <Th>Favourite Sports</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedPeople?.map((person) => (
              <Tr key={person.personId}>
                <Td>
                  <Link href={`/person/${person.personId}`} passHref>
                    <LinkBox textDecor="underline" cursor="pointer">
                      {person.firstName} {person.lastName}
                    </LinkBox>
                  </Link>
                </Td>
                <Td>{person.isEnabled.toString()}</Td>
                <Td>{person.isValid.toString()}</Td>
                <Td>{person.isAuthorised.toString()}</Td>
                <Td>{person.isPalindrome.toString()}</Td>
                <Td>{person.favouriteSports.map((sport) => sport.name).join(", ")}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <HStack mt="24px" w="100%" justify="flex-end" spacing="12px">
        <PaginationButtons {...peoplePaginationDetails} />
      </HStack>
    </Container>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const people = await getAllPeople()

  return {
    props: {
      people,
    },
  }
}

import {
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  VStack,
} from "@chakra-ui/react"
import { getAllPeople } from "app/person/getAllPeople"
import { getPerson } from "app/person/getPerson"
import { Person } from "app/person/person.types"
import { BlitzPage, GetStaticPaths, GetStaticProps, Link } from "blitz"
import { useCallback } from "react"
import { useForm } from "react-hook-form"

// Set up the props for the person page
interface PersonPageProps {
  /** The data for the person */
  person: Person | null
}

const PersonPage: BlitzPage<PersonPageProps> = ({ person }) => {
  // Set up the form functionality with react-hook-form
  const { register, getValues, setValue } = useForm({
    defaultValues: { ...person },
  })

  // TODO: update the submit functionalit (no update endpoint)
  const onSubmit = useCallback(() => {
    alert(`Submitted form values =>> ${JSON.stringify(getValues(), null, 4)}`)
  }, [getValues])

  // Fallback if no person is found (one is always found with this endpoint)
  if (!person)
    return (
      <Center h="100vh">
        <Heading>Person not found!</Heading>
        <Link href="/" passHref>
          <Button as="a">Return home</Button>
        </Link>
      </Center>
    )
  return (
    <Container as="main" py="40px">
      <Heading mb="8">Update Person Details</Heading>
      {/* Set up the form for the person details */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <VStack spacing="12px" align="flex-start" maxW="920px">
          {/* First name field */}
          <FormControl>
            <Flex align="center" justify="flex-start">
              <FormLabel htmlFor="firstName" width="120px" flexShrink={0}>
                First Name
              </FormLabel>
              <Input {...register("firstName")} />
            </Flex>
          </FormControl>

          {/* Last name field */}
          <FormControl>
            <Flex align="center" justify="flex-start">
              <FormLabel htmlFor="lastName" width="120px" flexShrink={0}>
                Last Name
              </FormLabel>
              <Input {...register("lastName")} />
            </Flex>
          </FormControl>

          {/* Enabled field */}
          <FormControl>
            <Flex align="center" justify="flex-start">
              <FormLabel htmlFor="isEnabled" width="120px">
                Enabled
              </FormLabel>
              <Switch {...register("isEnabled")} />
            </Flex>
          </FormControl>

          {/* Valid field */}
          <FormControl>
            <Flex align="center" justify="flex-start">
              <FormLabel htmlFor="isValid" width="120px">
                Valid
              </FormLabel>
              <Switch {...register("isValid")} />
            </Flex>
          </FormControl>

          {/* Authorised field */}
          <FormControl>
            <Flex align="center" justify="flex-start">
              <FormLabel htmlFor="isAuthorised" width="120px">
                Authorised
              </FormLabel>
              <Switch {...register("isAuthorised")} />
            </Flex>
          </FormControl>

          {/* Submit button */}
          <FormControl>
            <Flex align="center" justify="flex-start">
              <FormLabel htmlFor="isPalindrome" width="120px">
                Palindrome
              </FormLabel>
              <Switch {...register("isPalindrome")} />
            </Flex>
          </FormControl>

          {/* Favourite sports fields */}
          <CheckboxGroup
            // Set up a custom controller for the change event to map to our values
            onChange={(values) => {
              setValue(
                "favouriteSports",
                person.favouriteSports.map((sport) => ({
                  ...sport,
                  isEnabled: values.includes(sport.name),
                }))
              )
            }}
            // Extract the default values for the checkboxes
            defaultValue={person.favouriteSports
              .filter(({ isEnabled }) => isEnabled)
              .map(({ name }) => name)}
          >
            <Flex align="center" justify="flex-start">
              <FormLabel width="120px">Favourite Sports</FormLabel>
              <VStack align="flex-start">
                {person.favouriteSports.map((sport) => (
                  <Checkbox key={sport.sportId} value={sport.name} name={sport.name}>
                    {sport.name}
                  </Checkbox>
                ))}
              </VStack>
            </Flex>
          </CheckboxGroup>
          <ButtonGroup pt="12px" justifyContent="flex-start">
            <Button type="button" colorScheme="red">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </ButtonGroup>
        </VStack>
      </form>
    </Container>
  )
}

export default PersonPage

// Set up the static paths from the full list of people
export const getStaticPaths: GetStaticPaths = async () => {
  const people = await getAllPeople()
  return {
    paths: people.map((person) => ({ params: { id: person.personId.toString() } })),
    fallback: true,
  }
}

// Get the data for each static path (each person)
export const getStaticProps: GetStaticProps<PersonPageProps, { id: string }> = async ({
  params,
}) => {
  const person = await getPerson(params?.id || "")

  return {
    props: {
      person,
    },
  }
}

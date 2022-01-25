export interface Person {
  personId: number
  firstName: string
  lastName: string
  isAuthorised: boolean
  isValid: boolean
  isEnabled: boolean
  isPalindrome: boolean
  favouriteSports: FavouriteSport[]
}

export interface FavouriteSport {
  sportId: number
  name: string
  isEnabled: boolean
}

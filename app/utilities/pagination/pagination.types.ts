export interface PaginationDetails {
  /** Whether there is a next page */
  hasNextPage: boolean
  /** Whether there is a previous page */
  hasPreviousPage: boolean
  /** The total amount of pages */
  totalPages: number
  /** The current page index */
  currentPage: number
  /** A manual function to change the page */
  setCurrentPage: (page: number) => void
  /** A simple function to go to next page */
  goToNextPage: () => void
  /** A simple function to go to previous page */
  goToPreviousPage: () => void
}

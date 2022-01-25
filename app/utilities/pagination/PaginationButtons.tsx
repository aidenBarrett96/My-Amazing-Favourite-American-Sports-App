import { Button, ButtonGroup } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { getPageRangeAsArray, pageRange } from "./getPageRange"
import { PaginationDetails } from "./pagination.types"

/**
 * This component renders out the pagination buttons, trying to show 5 at al times
 */
export const PaginationButtons: FC<PaginationDetails> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  // create an array of page numbers between start and finish
  const pages = useMemo(
    () => getPageRangeAsArray(currentPage, totalPages),
    [currentPage, totalPages]
  )

  return (
    <ButtonGroup>
      {pages.map((page) => (
        <Button
          onClick={() => {
            setCurrentPage(page - 1)
          }}
          disabled={page === currentPage + 1}
          key={page}
        >
          {page}
        </Button>
      ))}
    </ButtonGroup>
  )
}

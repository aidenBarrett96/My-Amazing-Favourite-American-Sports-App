import { useCallback, useMemo, useState } from "react"
import { PaginationDetails } from "./pagination.types"

interface UsePaginationProps<DataType> {
  /** How many items should be in a page */
  pageSize?: number
  /** The data to paginate */
  data: DataType[]
}

export type UsePaginationReturns<DataType> = [DataType[], PaginationDetails]

export function useClientSidePagination<DataType>({
  data,
  pageSize = 3,
}: UsePaginationProps<DataType>): UsePaginationReturns<DataType> {
  // Determine the total pages
  const totalPages = Math.ceil(data.length / pageSize)

  // Also hold the current page index in state
  const [currentPage, setCurrentPage] = useState<number>(0)

  // Find out the index that the first item is on the page
  const pageStartIndex = useMemo(() => currentPage * pageSize, [currentPage, pageSize])

  // Find out if there are more pages
  const hasNextPage = useMemo(() => currentPage < totalPages - 1, [currentPage, totalPages])

  // Hold the current items in state
  const items = useMemo<DataType[]>(
    () => data.slice(pageStartIndex, pageStartIndex + pageSize),
    [data, pageSize, pageStartIndex]
  )

  // Set up the methods for next and previous pages
  const goToNextPage = useCallback(() => {
    setCurrentPage((page) => Math.max(page + 1, totalPages))
  }, [totalPages])
  const goToPreviousPage = useCallback(() => {
    setCurrentPage((page) => Math.max(page - 1, 0))
  }, [])

  return [
    items,
    {
      hasNextPage,
      currentPage: currentPage,
      hasPreviousPage: currentPage > 0,
      totalPages,
      setCurrentPage,
      goToNextPage,
      goToPreviousPage,
    },
  ]
}

export const pageRange = (page: number, pageCount: number) => {
  // Establish the start and end of the range
  let start = page - 2
  let end = page + 2

  // keep the range to 5 items if too close to the start or end
  if (end > pageCount) {
    start -= end - pageCount
    end = pageCount
  }
  if (start <= 0) {
    end += (start - 1) * -1
    start = 1
  }

  // Ensure the end doesnt go over the page count
  end = end > pageCount ? pageCount : end

  return { start: start, end: end }
}

export const getPageRangeAsArray = (page: number, pageCount: number): number[] => {
  // Get the start and finish from the page range function
  const { start, end } = pageRange(page, pageCount)
  // Create an array of the range
  const pages = Array.from(Array(end - start + 1), (_, i) => start + i)

  return pages
}

import { createContext, useContext } from 'react'
import useFetch from '../../hooks/useFetch'

const BookmarkContext = createContext()
const BASE_URL = 'http://localhost:5000'

function BookmarkListProvider({ children }) {
	const { isLoading, data: bookmarks } = useFetch(
		`${BASE_URL}/bookmarks`,
	)

	return (
		<BookmarkContext.Provider value={{ isLoading, bookmarks }}>
			{children}
		</BookmarkContext.Provider>
	)
}

export default BookmarkListProvider

export function useBookmark() {
	return useContext(BookmarkContext)
}

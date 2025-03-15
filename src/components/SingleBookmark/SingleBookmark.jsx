import { useBookmark } from '../context/BookmarkListContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Loader from '../Loader/Loader'
import ReactCountryFlag from 'react-country-flag'

function SingleBookmark() {
	const { id } = useParams()
	const navigate = useNavigate()
	const { isLoading, bookmarks } = useBookmark()
	const singleBookmark = bookmarks?.find(
		bookmark => bookmark.id === Number(id),
	)

	if (isLoading || !singleBookmark) return <Loader />

	return (
		<div>
			<button onClick={() => navigate(-1)} className="btn btn--back">
				&larr; بازگشت
			</button>
			<h2>{singleBookmark.cityName}</h2>

			<div className="bookmarkItem">
				<ReactCountryFlag
					svg
					countryCode={singleBookmark.countryCode}
				/>
				&nbsp; <strong>{singleBookmark.cityName}</strong> &nbsp;
				<span className="bookmarkCountry">
					{singleBookmark.country}
				</span>
			</div>
		</div>
	)
}

export default SingleBookmark

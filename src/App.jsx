import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/header/Header'
import LocationList from './components/LocationList/LocationList'
import AppLayout from './components/AppLayout/AppLayout'
import Hotels from './components/Hotels/Hotels'
import BookmarkLayout from './components/BookmarkLayout/BookmarkLayout'
import Bookmark from './components/Bookmark/Bookmark'
import SingleHotel from './components/SingleHotel/SingleHotel'
import HotelsProvider from './components/context/HotelsProvider'
import BookmarkListProvider from './components/context/BookmarkListContext'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<BookmarkListProvider>
			<HotelsProvider>
				<Toaster />
				<Header />
				<Routes>
					<Route path="/" element={<LocationList />} />
					<Route path="/hotels" element={<AppLayout />}>
						<Route index element={<Hotels />} />
						<Route path=":id" element={<SingleHotel />} />
					</Route>
					<Route path="/bookmark" element={<BookmarkLayout />}>
						<Route index element={<Bookmark />} />
						<Route path=":id" element={<div>single Bookmark</div>} />
						<Route path="add" element={<div>add new bookmark</div>} />
					</Route>
				</Routes>
			</HotelsProvider>
		</BookmarkListProvider>
	)
}

export default App

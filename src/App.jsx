import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/header/Header'
import LocationList from './components/LocationList/LocationList'
import AppLayout from './components/AppLayout/AppLayout'
import Hotels from './components/Hotels/Hotels'
import BookmarkLayout from './components/BookmarkLayout/BookmarkLayout'
import Bookmark from './components/Bookmark/Bookmark'
import SingleHotel from './components/SingleHotel/SingleHotel'
import SingleBookmark from './components/SingleBookmark/SingleBookmark'
import AddNewBookmark from './components/AddNewBookmark/AddNewBookmark'
import HotelsProvider from './components/context/HotelsProvider'
import Login from './components/Login/Login'
import BookmarkListProvider from './components/context/BookmarkListContext'
import AuthProvider from './components/context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<AuthProvider>
			<BookmarkListProvider>
				<HotelsProvider>
					<Toaster />
					<Header />
					<Routes>
						<Route path="/" element={<LocationList />} />
						<Route path="/login" element={<Login />} />
						<Route path="/hotels" element={<AppLayout />}>
							<Route index element={<Hotels />} />
							<Route path=":id" element={<SingleHotel />} />
						</Route>
						<Route
							path="/bookmark"
							element={
								<ProtectedRoute>
									<BookmarkLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Bookmark />} />
							<Route path=":id" element={<SingleBookmark />} />
							<Route path="add" element={<AddNewBookmark />} />
						</Route>
					</Routes>
				</HotelsProvider>
			</BookmarkListProvider>
		</AuthProvider>
	)
}

export default App

import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/header/Header'
import LocationList from './components/LocationList/LocationList'
import AppLayout from './components/AppLayout/AppLayout'
import Hotels from './components/Hotels/Hotels'
import SingleHotel from './components/SingleHotel/SingleHotel'
import HotelsProvider from './components/context/HotelsProvider'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<HotelsProvider>
			<Toaster />
			<Header />
			<Routes>
				<Route path="/" element={<LocationList />} />
				<Route path="/hotels" element={<AppLayout />}>
					<Route index element={<Hotels />} />
					<Route path=":id" element={<SingleHotel />} />
				</Route>
			</Routes>
		</HotelsProvider>
	)
}

export default App

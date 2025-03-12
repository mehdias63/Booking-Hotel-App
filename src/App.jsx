import './App.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/header/Header'
import LocationList from './components/LocationList/LocationList'
import AppLayout from './components/AppLayout/AppLayout'
import Hotels from './components/Hotels/Hotels'
import { Route, Routes } from 'react-router-dom'

function App() {
	return (
		<div>
			<Toaster />
			<Header />
			<Routes>
				<Route path="/" element={<LocationList />} />
				<Route path="/hotels" element={<AppLayout />}>
					<Route index element={<Hotels />} />
					<Route path=":id" element={<div>single hotel</div>} />
				</Route>
			</Routes>
		</div>
	)
}

export default App

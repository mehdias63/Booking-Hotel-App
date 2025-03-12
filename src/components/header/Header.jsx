import { MdLocationOn } from 'react-icons/md'
import { HiCalendar } from 'react-icons/hi'
import { HiSearch } from 'react-icons/hi'
import { useState, useRef } from 'react'
import {
	useNavigate,
	createSearchParams,
	useSearchParams,
} from 'react-router-dom'
import { HiPlus } from 'react-icons/hi'
import { HiMinus } from 'react-icons/hi'
import useOutsideClick from '../../hooks/useOutsideClick'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
function Header() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [destination, setDestination] = useState(
		searchParams.get('destination') || '',
	)
	const [openOptions, setOpenOptions] = useState(false)
	const [options, setOptions] = useState({
		adult: 1,
		children: 0,
		room: 1,
	})
	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	])
	const [openDate, setOpenDate] = useState(false)
	const navigate = useNavigate()

	const handleOption = (name, operation) => {
		setOptions(prev => {
			return {
				...prev,
				[name]:
					operation === 'inc' ? options[name] + 1 : options[name] - 1,
			}
		})
	}

	const handleSearch = () => {
		const encodedParams = createSearchParams({
			date: JSON.stringify(date),
			destination,
			options: JSON.stringify(options),
		})
		navigate({
			pathname: '/hotels',
			search: encodedParams.toString(),
		})
	}

	return (
		<div className="header">
			<div className="headerSearch">
				<div className="headerSearchItem">
					<MdLocationOn className="headerIcon locationIcon" />
					<input
						value={destination}
						onChange={e => setDestination(e.target.value)}
						type="text"
						placeholder="where to go?"
						className="headerSearchInput"
						name="destination"
						id="destination"
					/>
					<span className="separator"></span>
				</div>
				<div className="headerSearchItem">
					<HiCalendar className="headerIcon dateIcon" />
					<div
						className="dateDropDown"
						onClick={() => setOpenDate(!openDate)}
					>
						{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
							date[0].endDate,
							'MM/dd/yyyy',
						)}`}
					</div>
					{openDate && (
						<DateRange
							ranges={date}
							className="date"
							onChange={item => setDate([item.selection])}
							minDate={new Date()}
							moveRangeOnFirstSelection={true}
						/>
					)}
					<span className="separator"></span>
				</div>
				<div className="headerSearchItem">
					<div
						id="optionDropDown"
						onClick={() => setOpenOptions(!openOptions)}
					>
						{options.adult} adult &bull; {options.children} children
						&bull; {options.room} rooms
					</div>
					{openOptions && (
						<GuestOptionList
							handleOption={handleOption}
							options={options}
							setOpenOptions={setOpenOptions}
						/>
					)}
					<span className="separator"></span>
				</div>
				<div className="headerSearchItem">
					<button className="headerSearchBtn" onClick={handleSearch}>
						<HiSearch className="headerIcon" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Header

function GuestOptionList({ options, handleOption, setOpenOptions }) {
	const optionsRef = useRef()
	useOutsideClick(optionsRef, 'optionDropDown', () =>
		setOpenOptions(false),
	)
	return (
		<div className="guestOptions" ref={optionsRef}>
			<OptionItem
				type="adult"
				options={options}
				minLimit={1}
				handleOption={handleOption}
			/>
			<OptionItem
				type="children"
				options={options}
				minLimit={0}
				handleOption={handleOption}
			/>
			<OptionItem
				type="room"
				options={options}
				minLimit={1}
				handleOption={handleOption}
			/>
		</div>
	)
}

function OptionItem({ type, options, minLimit, handleOption }) {
	return (
		<div className="guestOptionItem">
			<span className="optionText">{type}</span>
			<div className="optionCounter">
				<button
					onClick={() => handleOption(type, 'dec')}
					className="optionCounterBtn"
					disabled={options[type] <= minLimit}
				>
					<HiMinus className="icon" />
				</button>
				<span className="optionCounterNumber">{options[type]}</span>
				<button
					onClick={() => handleOption(type, 'inc')}
					className="optionCounterBtn"
				>
					<HiPlus className="icon" />
				</button>
			</div>
		</div>
	)
}

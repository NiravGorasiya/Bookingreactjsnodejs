import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import useFetch from '../Hook/useFetch'
import { useState } from 'react'
import { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'
import "./reserve.css"

const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, erorr } = useFetch(`/hotels/room/${hotelId}`)
    const { dates } = useContext(SearchContext)

    const getDatesInRag = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        const dates = []
        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }
    const alldates = getDatesInRag(dates[0].startDate, dates[0].endDate)
    const handleSelect = (e) => {
        const selected = e.target.checked
        const value = e.target.value
        setSelectedRooms(selected ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
    }
    const handleClick = (e) => {
        console.log("sdfds");
    }
    return (
        <div className='reserve'>
            <div className='rContainer'>
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rColse"
                    onClick={() => setOpen(false)}
                >
                </FontAwesomeIcon>
                <span>Select Your room:</span>
                {
                    data.map((item) => (
                        <div className='rItem' key={item._id}>
                            <div className='rItemInfo'>
                                <div className='rTitle'>{item.title}</div>
                                <div className='rDesc'>{item.description}</div>
                                <div className='rMax'>Max People :<b>{item.maxPeople}</b></div>
                                <div className='rPrice'>{item.price}</div>
                            </div>
                            <div className='rSelectRooms'>
                                {
                                    item.roomNumber.map((roomNumber) => (
                                        <div className='room'>
                                            <label>{roomNumber.number}</label>
                                            <input
                                                type="checkbox"
                                                value={roomNumber._id}
                                                onChange={handleSelect}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                <button
                    className='rbutton'
                    onClick={handleClick}
                >
                    Reserve Book
                </button>
            </div>
        </div>
    )
}

export default Reserve

import React, { useState } from 'react'
import '../index.css'
import { FaBars, FaDotCircle, FaList } from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default function Navigation() {
    const [barClicked, setBarClicked] = useState(false)
    const handleBarClick = () => {
        setBarClicked(!barClicked);
    }
    return (
        <div>
            <div className='bar-div'>
                <button onClick={handleBarClick}><FaBars /></button>
            </div>
            {barClicked && (
                <div className='navs'>
                    <div>
                        <button><FaDotCircle /></button>
                        <Link to={'/'} className='nav-key' htmlFor="record">Record Voice</Link>
                    </div>
                    <div>
                        <button ><FaList /></button>
                        <Link to={'/list'} className='nav-key' htmlFor="list">List of recorded items</Link>
                    </div>
                </div>

            )}
        </div>
    )
}

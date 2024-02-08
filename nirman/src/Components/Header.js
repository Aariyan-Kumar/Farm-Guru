import React from 'react';
import logo from './images/logo.jpeg';
import avatar from './images/avatar.png'
import './Header.css';

export default function Home() {
    return (
        <>
            {/* <h1>Farm Guru Project</h1> */}
            <div className="header-cont">
                <div className="img-cont">
                    <a href="#home"><img className='h-img' src={logo} alt="logo" /></a>
                </div>
                <div className="link-cont">
                    <ul>
                        <li className='nav-link'><a href="#home">Home</a></li>
                        <li className='nav-link'><a href="#Weather">Weather</a></li>
                        <li className='nav-link'><a href="#community">Community</a></li>
                        <li className='nav-link'><a href="#Market">Market</a></li>
                        <li className='nav-link'><a href="#Rentals">Rentals</a></li>
                        <li className='nav-link'><a href="#Tutorials">Tutorilas</a></li>
                        <li className='nav-link'><a href="#About Us">About us</a></li>
                        <li className="nav-link"><a href="#Login"><img className="l-img" src={avatar} alt="avatar logo" /></a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

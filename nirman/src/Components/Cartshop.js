import React from 'react';
import Button from 'react-bootstrap/Button';
import ct from './images/img-ct-1.jpg';
import '../Components/Cartshop.css';


export default function cartshop() {
    return (
        <>
            <div className='cart-cont my-4'>
                <div className='cart-img shadow-lg' width={50}>
                    <img src={ct} alt='card-img' />
                </div>
                <div className='cart-details'>
                    <h5>Vegetable name 1</h5>
                    <p>₹XX.XX <br /> Lorem ipsum dolor sit amet.</p>
                    <Button variant='success' className='cart-btn mx-0 my-2'>Add to Cart</Button>
                </div>
            </div>
        </>
    )
}

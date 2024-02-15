import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartItem from '../Components/CartItem';
import './Cart.css';

export default function Cart() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Container className='mw-100'>
                <Row>
                    <Col className='p-0'>
                        <h1 className='text-center'>The Cart</h1>
                        <div className='cart-cont p-2 mx-3 '>
                            <CartItem />
                            <CartItem />
                            <CartItem />
                        </div>
                        <div className='text-end m-3'>
                            <Button variant='outline-success' onClick={() => navigate(-1)}>Go Back to Market</Button>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <Row className='side-ht-up'>
                            <Col>
                                <div className='shadow coupon-cont text-center'>
                                    <h3 className='text-center my-3 p-2'>Coupon Code</h3>
                                    <Form className="d-flex mx-auto my-3 shadow-sm w-75 " >
                                        <Form.Control
                                            type="search"
                                            placeholder="Enter Your Coupon Code"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                    </Form>
                                    <Button variant='outline-success'>Apply</Button>
                                </div>

                            </Col>
                        </Row>
                        <Row className='side-ht-dn'>
                            <Col className='mb-3'>
                                <div className='shadow total-cont text-center'>
                                    <h3 className='text-center mt-3 p-2'>Cart Total</h3>
                                    <ul className='mx-3'>
                                        <li>Lorem ipsum amet. price-₹XX.XX</li>
                                        <li>Lorem ipsum amet. price-₹XX.XX</li>
                                        <li>Lorem ipsum amet. price-₹XX.XX</li>
                                        <li>Lorem ipsum amet. price-₹XX.XX</li>
                                        <li>Lorem ipsum amet. price-₹XX.XX</li>
                                    </ul>
                                    <h2 className='mx-3 p-2'>Total : ₹XX.XX</h2>
                                    <Button className='my-3 p-2' variant='outline-success'>Pay Now</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

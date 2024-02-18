import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import './CartItem.css';


export default function CartItem(cartItems) {
    const { id, imgsrc, tittle, price, onDelete } = cartItems;
    let qunatity = 1;
    const [add, setadd] = useState(qunatity);
    // const [cart, setCart] = useState(cartItems);


    const inc = () => {
        if (add !== 10) {

            setadd(add + 1);
        }
    }

    const dec = () => {
        if (add !== 0) {
            setadd(add - 1);
        }
    }

    let x = add * cartItems.price;



    return (
        <>
            <div className='cart-item-cont mx-3 '>
                <Container >
                    <Row className='shadow item'>
                        <Col xs={6} className='mx-3'>
                            <Card className="d-flex flex-sm-row border-0 " style={{ height: 'auto' }} >
                                <Image
                                    style={{ objectFit: 'cover', maxWidth: '100%', height: 'auto', width: '150px' }}
                                    src={cartItems.imgsrc}
                                    alt="Caffe Latte"
                                />
                                <Card.Body>
                                    <Card.Title as="h5">{cartItems.tittle}</Card.Title>
                                    <Card.Text>
                                        {cartItems.tittle}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='my-auto'>
                            <h5>price</h5>
                            <p>₹{cartItems.price} Kg</p>
                        </Col>
                        <Col className='my-auto'>
                            <h5>Quantity</h5>
                            <Button onClick={dec} variant='outline-success'>-</Button>
                            <span className='m-2 sp'>{add}</span>
                            <Button onClick={inc} variant='outline-success'>+</Button>
                        </Col>
                        <Col className='my-auto'>
                            <h5>Sub Total price</h5>
                            <p>₹{x}</p>
                        </Col>
                        <Col className='my-auto'>
                            <Button variant='outline-danger' onClick={() => onDelete({ id, imgsrc, tittle, price })}>X</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

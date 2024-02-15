import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import './CartItem.css';


export default function CartItem() {

    let price = 100.00, qunatity = 0;
    const [add, setadd] = useState(qunatity);

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

    return (
        <>
            <div className='cart-item-cont mx-3 '>
                <Container >
                    <Row className='shadow item'>
                        <Col xs={7} className='mx-3'>
                            <Card className="d-flex flex-sm-row border-0 " style={{ height: 'auto' }} >
                                <Image
                                    style={{ objectFit: 'cover', maxWidth: '100%', height: 'auto', width: '150px' }}
                                    src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                    alt="Caffe Latte"
                                />
                                <Card.Body>
                                    <Card.Title as="h5">The perfect latte</Card.Title>
                                    <Card.Text>
                                        Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className='my-auto'>
                            <h5>price</h5>
                            <p>₹{price}.00</p>
                        </Col>
                        <Col className='my-auto'>
                            <h5>Quantity</h5>
                            <Button onClick={dec} variant='outline-success'>-</Button>
                            <span className='m-2 sp'>{add}</span>
                            <Button onClick={inc} variant='outline-success'>+</Button>
                        </Col>
                        <Col className='my-auto'>
                            <h5>Total price</h5>
                            <p>₹{add * price}.00</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

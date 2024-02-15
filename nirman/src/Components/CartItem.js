import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import './CartItem.css';


export default function CartItem() {
    return (
        <>
            <h1 className='text-center'>The Cart</h1>
            <div className='cart-item-cont'>
                <Container >
                    <Row>
                        <Col className='mx-3'>
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
                        <Col xs={1} className='my-auto'>
                            <h5>price</h5>
                            <p>₹XX.XX</p>
                        </Col>
                        <Col className='my-auto' inline>
                            <Button variant='outline-success'>-</Button>
                            <span className='m-2 sp'>x</span>
                            <Button variant='outline-success'>+</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

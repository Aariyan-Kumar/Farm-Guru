import React from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';



export default function cartshop(props) {
    console.log(props);
    return (
        <>
            <Card style={{ width: '12rem' }} className='shadow my-2'>
                <Card.Img variant="top" src={props.imgsrc} />
                <Card.Body>
                    <Card.Title>{props.tittle}</Card.Title>
                    <Card.Text>
                        {props.price}
                    </Card.Text>
                    <Button variant="success">Add to Cart</Button>
                </Card.Body>
            </Card>
        </>
    )
}

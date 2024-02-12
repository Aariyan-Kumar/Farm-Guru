import React from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css';

export default function Weather() {
    const i=50;
    console.log(i);
    return (
        <>
            <Header />
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://t3.ftcdn.net/jpg/05/02/18/64/360_F_502186443_Kubg3Wl76uE8BYl1tcAuYYXgGKAaO6r4.jpg" />
                <Card.Body>
                <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            <Footer />
        </>
    )
}

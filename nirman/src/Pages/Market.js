import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Cartshop from '../Components/Cartshop';
import { Container, Row, Col, Carousel, Button, Form } from 'react-bootstrap';
import './Market.css'
import s1 from './images/img-s-1.jpg';
import s2 from './images/img-s-2.jpg';
import s3 from './images/img-s-3.jpg';


export default function Market() {
  return (
    <>
      <Header />
      <Container fluid className='market-cont mw-100'>
        <Row>
          <Col className='side-bar-cont' xs={2}>
            <h5 className='text-center fs-3 m-2'>Products</h5>
            <hr className='hr' />
            <div className='side-bar-l fs-6'>
              <ul>
                <li className='shadow-lg'><a href="#veg">Vegetables</a></li>
                <li className='shadow-lg'><a href="#fru">Fruits</a></li>
                <li className='shadow-lg'><a href="#dfru">Dry Fruits</a></li>
              </ul>
            </div>
          </Col>
          <Col className='main-frame-cont p-0' xs={10}>
            <Carousel className='m-0 p-0 object-fit-none'>
              <Carousel.Item >
                <img src={s1} alt="slide-img-1" height={350} width={1300} />
                <Carousel.Caption className='text-start'>
                  <h3>50% OFF <br />
                    Shop Badam Milk & Badam Drink</h3>
                  <p>
                    The Real Taste And Boost Your Day With The Power
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={s2} alt="slide-img-2" height={350} width={1300} />
                <Carousel.Caption className='text-start'>
                  <h3>30% OFF <br />
                    Fruit Produced Buy Apple</h3>
                  <p>
                    SALE UP TO 30% OFF <br />
                    The Real Taste And Boost Your Day With The Power
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img src={s3} alt="slide-img-3" height={350} width={1300} />
                <Carousel.Caption className='text-start'>
                  <h3>20% OFF <br />
                    Buy Fresh Bread Every Day</h3>
                  <p>
                    SALE UP TO 20% OFF <br />
                    The Real Taste And Boost Your Day With The Power
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            <div>
              <Row className='m-0'>
                <Col xs={10}>
                  <Form className="d-flex my-3" >
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Col>
                <Col xs={2}>
                  <Button variant='' className='mx-2 border border-2 border-success p-0 mt-4'>🛒</Button>
                </Col>
              </Row>
              <Row className='m-0'>
                <Col xs={2}><Cartshop /></Col>
                <Col xs={2}><Cartshop /></Col>
                <Col xs={2}><Cartshop /></Col>
                <Col xs={2}><Cartshop /></Col>
                <Col xs={2}><Cartshop /></Col>
                <Col xs={2}><Cartshop /></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container >
      <Footer />

    </>
  )
}

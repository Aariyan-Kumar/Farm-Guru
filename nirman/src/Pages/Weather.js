import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_KEY = '88939f44c6bda2a77f49d29e14f2e8b8';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export default function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false); // Track if search button has been clicked
    const [hourlyForecast, setHourlyForecast] = useState(null); // State to store hourly forecast data
    const [dailyForecast, setDailyForecast] = useState(null); // State to store daily forecast data

    useEffect(() => {
        if (searched && city) {
            const fetchWeatherData = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
                    if (!response.ok) {
                        throw new Error('City not found');
                    }
                    const data = await response.json();
                    setWeatherData({
                        temperature: data.list[0].main.temp,
                        feelsLike: data.list[0].main.feels_like,
                        humidity: data.list[0].main.humidity,
                        precipitation: calculatePrecipitation(data.list[0].weather[0].id),
                        windSpeed: data.list[0].wind.speed,
                        weatherIcon: `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`,
                        weatherDescription: data.list[0].weather[0].description
                    });
                    setHourlyForecast(data.list.slice(0, 8)); // Store hourly forecast data for the next 8 hours
                    setDailyForecast(data.list.filter((item, index) => index % 8 === 0).slice(0, 7)); // Store daily forecast data for the next 7 days
                    setError(null); // Clear error if previous request was successful
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchWeatherData();
        }
    }, [searched, city]);

    const calculatePrecipitation = (weatherId) => {
        if ((weatherId >= 200 && weatherId < 300) || (weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600) || (weatherId >= 600 && weatherId < 700)) {
            return '10 mm'; // Rough estimation of precipitation in mm
        } else {
            return '0 mm';
        }
    };

    const formatHour = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getHours()}:00`;
    };

    const formatDay = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <>
            <Header />
            <Container className="mt-4" style={{ marginBottom: '50px' }}>
                <Form className="d-flex">
                    <Form.Control
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{ width: '200px', marginRight: '10px' }}
                    />
                    <Button onClick={() => setSearched(true)}>Search</Button>
                </Form>
            </Container>
            {searched && (
                <Container className="mt-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : weatherData && (
                        <>
                            <h2>Weather in {city}</h2>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Temperature</Card.Title>
                                            <Card.Text>
                                                {weatherData.temperature}°C
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Feels Like</Card.Title>
                                            <Card.Text>
                                                {weatherData.feelsLike}°C
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Humidity</Card.Title>
                                            <Card.Text>
                                                {weatherData.humidity}%
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Precipitation</Card.Title>
                                            <Card.Text>
                                                {weatherData.precipitation}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Wind Speed</Card.Title>
                                            <Card.Text>
                                                {weatherData.windSpeed} km/h
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Weather Condition</Card.Title>
                                            <Card.Text>
                                                {weatherData.weatherDescription}
                                            </Card.Text>
                                            <img src={weatherData.weatherIcon} alt="Weather Icon" />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )}
                    {hourlyForecast && (
                        <Container className="mt-4">
                            <h3>Hourly Forecast</h3>
                            <Slider {...settings}>
                                {hourlyForecast.map((hourlyData, index) => (
                                    <div key={index} className="hourly-forecast-item">
                                        <p>{formatHour(hourlyData.dt_txt)}: {hourlyData.main.temp}°C</p>
                                        <p>{hourlyData.weather[0].description}</p>
                                        <img src={`https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}.png`} alt="Weather Icon" />
                                    </div>
                                ))}
                            </Slider>
                        </Container>
                    )}
                    {dailyForecast && (
                        <Container className="mt-4">
                            <h3>Daily Forecast</h3>
                            {dailyForecast.map((dailyData, index) => (
                                <Card key={index} className="mt-3">
                                    <Card.Body>
                                        <Card.Title>{formatDay(dailyData.dt_txt)}</Card.Title>
                                        <Card.Text>
                                            <p>Temperature: {dailyData.main.temp}°C</p>
                                            <p>{dailyData.weather[0].description}</p>
                                            <img src={`https://openweathermap.org/img/wn/${dailyData.weather[0].icon}.png`} alt="Weather Icon" />
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Container>
                    )}
                </Container>
            )}
            <Footer style={{ marginTop: '50px' }}/>
        </>
    );
}

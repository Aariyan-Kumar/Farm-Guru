import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Weather.css';

const API_KEY = '88939f44c6bda2a77f49d29e14f2e8b8';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export default function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);

    const getCurrentPosition = useCallback(() => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }, []);

    const reverseGeocode = useCallback(async (latitude, longitude) => {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();
        return data.city;
    }, []);

    const calculatePrecipitation = useCallback((weatherId) => {
        if ((weatherId >= 200 && weatherId < 300) || (weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600) || (weatherId >= 600 && weatherId < 700)) {
            return '10 mm';
        } else {
            return '0 mm';
        }
    }, []);

    const getBackgroundImage = useCallback((weatherIcon) => {
        // Background image switch cases
        switch (weatherIcon) {
            case '01d':
                return 'url("https://images.unsplash.com/photo-1511836536898-6d6f1b8f6948?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VubnklMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww")';
            case '02d':
            case '03d':
            case '04d':
                return 'url("https://wallpaperset.com/w/full/d/f/5/137181.jpg")';
            case '09d':
            case '10d':
                return 'url("https://cdn.pixabay.com/photo/2014/04/05/11/39/rain-316579_1280.jpg")';
            case '11d':
                return 'url("https://images.unsplash.com/photo-1600323847785-fe21bc36acdf?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbiUyQyUyMHRodW5kZXJzdG9ybXxlbnwwfHwwfHx8MA%3D%3D")';
            case '13d':
                return 'url("https://www.vmcdn.ca/f/files/via/images/weather/vancouver-weather-forecast-december-2021-snowfall.jpg;w=960")';
            case '50d':
                return 'url("https://c1.wallpaperflare.com/preview/1002/896/900/foggy-mountains-nature-fog.jpg")';
            default:
                return 'url("https://img.freepik.com/free-vector/blue-sky-with-clouds-background-elegant_1017-26302.jpg?w=996&t=st=1708202012~exp=1708202612~hmac=8c95e666f8566e1b9b658efeb286d247fdc541be08dfc9ab42c6a945498b2e1d")';
        }
    }, []);

    const fetchWeatherDataByCity = useCallback(async (cityName) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`);
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
            setHourlyForecast(data.list.slice(0, 8));
            setDailyForecast(data.list.filter((item, index) => index % 8 === 0).slice(0, 7));
            setError(null);
            setBackgroundImage(getBackgroundImage(data.list[0].weather[0].icon));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [calculatePrecipitation, getBackgroundImage]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const position = await getCurrentPosition();
                const { latitude, longitude } = position.coords;
                const cityName = await reverseGeocode(latitude, longitude);
                setCity(cityName);
                fetchWeatherDataByCity(cityName);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchWeatherData();
    }, [getCurrentPosition, reverseGeocode, fetchWeatherDataByCity]);

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
            <div className="weather-background" style={{ backgroundImage: backgroundImage }}>
                <Container className="mt-4" style={{ marginBottom: '50px' }}>
                    {/* Search form */}
                    <Form className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            style={{ width: '200px', marginRight: '10px' }}
                        />
                        <Button onClick={() => {
                            fetchWeatherDataByCity(city);
                            setSearched(true);
                        }}>Search</Button>
                    </Form>
                </Container>
                {searched && (
                    <Container className="mt-4">
                        {/* Display weather forecast */}
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : weatherData && (
                            <>
                                <h2>Weather in {city}</h2> {/* Show the city name here */}
                                <Row>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Temperature</Card.Title>
                                                <Card.Text>
                                                    {weatherData.temperature}°C
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Feels Like</Card.Title>
                                                <Card.Text>
                                                    {weatherData.feelsLike}°C
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Humidity</Card.Title>
                                                <Card.Text>
                                                    {weatherData.humidity}%
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <div style={{ marginBottom: '20px' }}></div> {/* Add space between temperature and precipitation */}
                                <Row>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Precipitation</Card.Title>
                                                <Card.Text>
                                                    {weatherData.precipitation}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="weather-card">
                                            <Card.Body>
                                                <Card.Title>Wind Speed</Card.Title>
                                                <Card.Text>
                                                    {weatherData.windSpeed} km/h
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <div style={{ marginBottom: '20px' }}></div> {/* Add space between precipitation and weather condition */}
                                <Row>
                                    <Col>
                                        <Card className="weather-card">
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
                                {/* Display hourly forecast */}
                                <h3> Hourly Forecast</h3>
                                <Card className="weather-card">
                                    <Card.Body>
                                        <Slider {...settings}>
                                            {hourlyForecast.map((hourlyData, index) => (
                                                <div key={index} className="hourly-forecast-item">
                                                    <p>{formatHour(hourlyData.dt_txt)}: {hourlyData.main.temp}°C</p>
                                                    <p>{hourlyData.weather[0].description}</p>
                                                    <img src={`https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}.png`} alt="Weather Icon" />
                                                </div>
                                            ))}
                                        </Slider>
                                    </Card.Body>
                                </Card>
                            </Container>
                        )}
                        {dailyForecast && (
                            <Container className="mt-4">
                                {/* Display daily forecast */}
                                <h3>Daily Forecast</h3>
                                {dailyForecast.map((dailyData, index) => (
                                    <Card key={index} className="mt-3 weather-card">
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
            </div>
            <Footer style={{ marginTop: '50px' }} />
        </>
    );
}



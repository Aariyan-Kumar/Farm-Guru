import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_KEY = '88939f44c6bda2a77f49d29e14f2e8b8';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false); // Track if search button has been clicked
    const [hourlyForecast, setHourlyForecast] = useState(null); // State to store hourly forecast data

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
                        temperature: data.main.temp,
                        feelsLike: data.main.feels_like,
                        humidity: data.main.humidity,
                        precipitation: calculatePrecipitation(data.weather[0].id),
                        windSpeed: data.wind.speed,
                        weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                    });
                    setHourlyForecast(null); // Clear previous hourly forecast data
                    setError(null); // Clear error if previous request was successful
                    fetchHourlyForecast(); // Fetch hourly forecast data
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

    const fetchHourlyForecast = async () => {
        try {
            const response = await fetch(`${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('Failed to fetch hourly forecast');
            }
            const data = await response.json();
            setHourlyForecast(data.list); // Store hourly forecast data
        } catch (error) {
            setError(error.message);
        }
    };

    const formatHour = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getHours()}:00`;
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
            <div className="container mt-4">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={() => setSearched(true)}>Search</button>
            </div>
            {searched && (
                <div className="container mt-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : weatherData && (
                        <>
                            <h2>Weather in {city}</h2>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Today's Weather</Card.Title>
                                    <div>
                                        <p><strong>Temperature:</strong> {weatherData.temperature}°C</p>
                                        <p><strong>Feels Like:</strong> {weatherData.feelsLike}°C</p>
                                        <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
                                        <p><strong>Precipitation:</strong> {weatherData.precipitation}</p>
                                        <p><strong>Wind Speed:</strong> {weatherData.windSpeed} km/h</p>
                                    </div>
                                    <img src={weatherData.weatherIcon} alt="Weather Icon" />
                                </Card.Body>
                            </Card>
                        </>
                    )}
                    {hourlyForecast && (
                        <div className="container mt-4">
                            <h3>Hourly Forecast</h3>
                            <Slider {...settings}>
                                {hourlyForecast.map((hourlyData, index) => (
                                    <div key={index} className="hourly-forecast-item">
                                        <p>{formatHour(hourlyData.dt_txt)}: {hourlyData.main.temp}°C</p>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </div>
            )}
            <Footer />
        </>
    );
}

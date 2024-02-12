import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '88939f44c6bda2a77f49d29e14f2e8b8';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=YOUR_CITY_NAME&appid=${API_KEY}&units=metric`;

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData({
                temperature: data.main.temp,
                feelsLike: data.main.feels_like,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                weatherIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            });
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                weatherData && (
                    <div className="container">
                        <h1 className="mt-4 mb-4">Weather Forecast</h1>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Today's Weather</Card.Title>
                                <div className="row">
                                    <div className="col-md-4">
                                        <p><strong>Temperature:</strong> {weatherData.temperature}°C</p>
                                        <p><strong>Feels Like:</strong> {weatherData.feelsLike}°C</p>
                                        <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
                                        <p><strong>Wind Speed:</strong> {weatherData.windSpeed} km/h</p>
                                    </div>
                                    <div className="col-md-8">
                                        <img src={weatherData.weatherIcon} alt="Weather Icon" />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Button variant="primary">Refresh</Button>
                    </div>
                )
            )}
            <Footer />
        </>
    );
}

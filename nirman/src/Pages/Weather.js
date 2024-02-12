import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        // Fetch weather data from API and set it to the state
        // Example: fetchWeatherData();
    }, []);

    return (
        <>
            <Header />
            {weatherData && (
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
                                    <p><strong>Precipitation:</strong> {weatherData.precipitation}%</p>
                                    <p><strong>Wind Speed:</strong> {weatherData.windSpeed} km/h</p>
                                </div>
                                <div className="col-md-8">
                                    <Card.Img src={weatherData.weatherIcon} alt="Weather Icon" />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Button variant="primary">Refresh</Button>
                </div>
            )}
            <Footer />
        </>
    );
}

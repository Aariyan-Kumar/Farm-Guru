import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HourlyForecast = ({ forecastData }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <div>
            <h3>Hourly Forecast</h3>
            <Slider {...settings}>
                {forecastData.map((hourlyData, index) => (
                    <div key={index} className="hourly-forecast-item">
                        {/* Render hourly forecast hour and temperature */}
                        <p>{formatHour(hourlyData.dt_txt)}: {hourlyData.main.temp}°C</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

// Function to format hour from date string
const formatHour = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${date.getHours()}:00`; // Assuming the date format is YYYY-MM-DD HH:MM:SS
};

export default HourlyForecast;

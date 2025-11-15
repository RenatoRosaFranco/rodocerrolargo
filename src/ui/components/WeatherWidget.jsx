'use client';

import { useEffect, useState } from 'react';
import { FaCloudSun } from 'react-icons/fa';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
    // Atualiza o clima a cada 30 minutos
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    try {
      // Usando OpenWeatherMap API (você precisará configurar uma chave API)
      // Coordenadas de Cerro Largo, RS: lat=-28.1489, lon=-54.7378
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo';
      const lat = -28.1489;
      const lon = -54.7378;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      } else {
        // Fallback: usar dados simulados se a API falhar
        setWeather({
          temp: 25,
          description: 'céu limpo',
          icon: '01d',
        });
      }
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
      // Dados simulados em caso de erro
      setWeather({
        temp: 25,
        description: 'céu limpo',
        icon: '01d',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !weather) {
    return (
      <div className="d-flex align-items-center">
        <FaCloudSun className="me-2" style={{ fontSize: '0.9rem' }} />
        <small>Carregando...</small>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center">
      <FaCloudSun className="me-2" style={{ fontSize: '0.9rem' }} />
      <small className="fw-bold">
        {weather.temp}°C
      </small>
      <small className="ms-2 text-muted" style={{ textTransform: 'capitalize' }}>
        {weather.description}
      </small>
    </div>
  );
};

export default WeatherWidget;

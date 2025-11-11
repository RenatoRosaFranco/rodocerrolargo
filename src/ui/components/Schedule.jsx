'use client';

import scheduleData from '@/data/schedule.json';
import { useMemo, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import PopularDestinations from './PopularDestinations';
import ScheduleCard from './ScheduleCard';

const Schedule = () => {
  // Função para obter o dia da semana atual em inglês
  const getCurrentDay = () => {
    const daysInEnglish = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    return daysInEnglish[today];
  };

  const [filters, setFilters] = useState({
    origin: 'Cerro Largo',
    destination: '',
    day: getCurrentDay()
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      origin: '',
      destination: '',
      day: ''
    });
  };

  // Extrair origens e destinos únicos
  const { origins, destinations } = useMemo(() => {
    const originsSet = new Set();
    const destinationsSet = new Set();

    Object.values(scheduleData.schedules).forEach(daySchedules => {
      daySchedules.forEach(trip => {
        if (trip.origin) originsSet.add(trip.origin);
        if (trip.destination) destinationsSet.add(trip.destination);
      });
    });

    return {
      origins: Array.from(originsSet).sort(),
      destinations: Array.from(destinationsSet).sort()
    };
  }, []);

  // Filtrar horários
  const filteredSchedules = useMemo(() => {
    const filtered = {};

    Object.entries(scheduleData.schedules).forEach(([day, trips]) => {
      const filteredTrips = trips.filter(trip => {
        const matchOrigin = !filters.origin || trip.origin === filters.origin;
        const matchDestination = !filters.destination || trip.destination === filters.destination;
        const matchDay = !filters.day || day === filters.day;

        return matchOrigin && matchDestination && matchDay && Object.keys(trip).length > 0;
      });

      if (filteredTrips.length > 0) {
        filtered[day] = filteredTrips;
      }
    });

    return filtered;
  }, [filters]);

  const daysMap = {
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  // Função para aplicar filtro rápido
  const handleDestinationSelect = (destination) => {
    setFilters(prev => ({
      ...prev,
      origin: 'Cerro Largo',
      destination: destination,
      day: getCurrentDay()
    }));
    // Scroll suave para a seção de resultados
    setTimeout(() => {
      document.getElementById('search-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <section id="schedule-section" className='py-5'>
      <Container>
        <Row>
          <h1 className="fw-bold text-center mb-2">Horários de Ônibus</h1>
        </Row>

        {/* Cards de Destinos Populares */}
        <PopularDestinations
          filters={filters}
          onSelectDestination={handleDestinationSelect}
        />

        {/* Card de Busca */}
        <Row className="mb-4" id="search-card">
          <Col md={10} lg={8} className="offset-md-1 offset-lg-2">
            <Card className="shadow-sm border" style={{ borderRadius: '12px' }}>
              <Card.Body className="p-3">
                <Row className="align-items-center g-2">
                  <Col md={4}>
                    <Form.Select
                      value={filters.origin}
                      onChange={(e) => handleFilterChange('origin', e.target.value)}
                      size="md"
                    >
                      <option value="">Origem</option>
                      {origins.map(origin => (
                        <option key={origin} value={origin}>{origin}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Form.Select
                      value={filters.destination}
                      onChange={(e) => handleFilterChange('destination', e.target.value)}
                      size="md"
                    >
                      <option value="">Destino</option>
                      {destinations.map(destination => (
                        <option key={destination} value={destination}>{destination}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      value={filters.day}
                      onChange={(e) => handleFilterChange('day', e.target.value)}
                      size="md"
                    >
                      <option value="">Dia da Semana</option>
                      {Object.entries(daysMap).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={1} className="d-flex justify-content-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={resetFilters}
                      title="Limpar filtros"
                    >
                      ✕
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Resultados Filtrados */}
        {Object.keys(filteredSchedules).length === 0 ? (
          <Row>
            <Col md={8} className="offset-md-2">
              <div className="alert alert-info text-center">
                Nenhum horário encontrado com os filtros selecionados.
              </div>
            </Col>
          </Row>
        ) : (
          Object.entries(filteredSchedules).map(([day, trips]) => (
            <Row key={day}>
              <Col md={10} className="offset-md-1">
                <ScheduleCard day={day} schedules={{ [day]: trips }} />
              </Col>
            </Row>
          ))
        )}
      </Container>
    </section>
  )
}

export default Schedule;

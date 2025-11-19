'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useAnimatedPlaceholder } from '@/hooks/useAnimatedPlaceholder';
import SearchResultsModal from './SearchResultsModal';
import styles from './BusSearch.module.scss';

const BusSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState('');

  const placeholders = [
    'Quando sai o próximo ônibus para Santa Rosa?',
    'Qual o horário do ônibus para Ijuí?',
    'Quanto custa a passagem para Porto Alegre?',
    'Quais os horários disponíveis hoje?',
    'Como enviar encomendas pela rodoviária?',
    'Tem ônibus para São Luiz Gonzaga?',
  ];

  const currentPlaceholder = useAnimatedPlaceholder(placeholders, 3000);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className={styles.searchSection}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <div className={styles.searchWrapper}>
                <h2 className={styles.title}>
                  Como podemos ajudar você?
                </h2>
                <p className={styles.subtitle}>
                  Faça uma pergunta sobre horários, destinos, passagens ou encomendas
                </p>

                <Form onSubmit={handleSubmit} className={styles.searchForm}>
                  <div className={styles.inputWrapper}>
                    <FaSearch className={styles.searchIcon} />
                    <Form.Control
                      type="text"
                      placeholder={currentPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className={styles.searchButton}
                      disabled={!searchQuery.trim()}
                    >
                      Buscar
                    </Button>
                  </div>
                </Form>

                <div className={styles.suggestions}>
                  <span className={styles.suggestionsLabel}>Sugestões:</span>
                  <button
                    className={styles.suggestionChip}
                    onClick={() => {
                      setSearchQuery('Quando sai o próximo ônibus para Santa Rosa?');
                    }}
                  >
                    Horários Santa Rosa
                  </button>
                  <button
                    className={styles.suggestionChip}
                    onClick={() => {
                      setSearchQuery('Como enviar encomendas?');
                    }}
                  >
                    Encomendas
                  </button>
                  <button
                    className={styles.suggestionChip}
                    onClick={() => {
                      setSearchQuery('Qual o horário do ônibus para Porto Alegre?');
                    }}
                  >
                    Porto Alegre
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <SearchResultsModal
        show={showModal}
        onHide={handleCloseModal}
        query={submittedQuery}
      />
    </>
  );
};

export default BusSearch;

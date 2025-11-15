'use client';

import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaStar, FaTimes } from 'react-icons/fa';

const FeedbackWidget = () => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          message: feedback,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setShowModal(false);
          setSubmitted(false);
          setRating(0);
          setFeedback('');
        }, 2000);
      } else {
        console.error('Failed to submit feedback');
        alert('Erro ao enviar feedback. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Erro ao enviar feedback. Tente novamente.');
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      <div
        style={{
          position: 'fixed',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000
        }}
      >
        <Button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: '#3b82f6',
            border: 'none',
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            padding: '16px 12px',
            boxShadow: '-2px 0 10px rgba(59, 130, 246, 0.3)',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.paddingRight = '16px';
            e.currentTarget.style.boxShadow = '-4px 0 15px rgba(59, 130, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.paddingRight = '12px';
            e.currentTarget.style.boxShadow = '-2px 0 10px rgba(59, 130, 246, 0.3)';
          }}
        >
          FEEDBACK
        </Button>
      </div>

      {/* Modal de Feedback */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        centered
        size="lg"
      >
        <Modal.Body style={{ padding: '2.5rem', position: 'relative' }}>
          <Button
            variant="link"
            onClick={() => setShowModal(false)}
            style={{ 
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              textDecoration: 'none',
              color: '#9ca3af',
              padding: '0.5rem',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#6b7280'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
          >
            <FaTimes size={20} />
          </Button>

          {submitted ? (
            <div className="text-center py-5">
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h4 className="fw-bold mb-3" style={{ color: '#111827' }}>
                Obrigado pelo seu Feedback!
              </h4>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                Sua opinião é muito importante para melhorarmos nossos serviços.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-4">
                <h3 className="fw-bold mb-2" style={{ color: '#111827' }}>
                  Como foi sua experiência?
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: 0 }}>
                  Sua opinião nos ajuda a melhorar
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="d-flex gap-2 justify-content-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={40}
                        style={{
                          cursor: 'pointer',
                          color: star <= (hoverRating || rating) ? '#fbbf24' : '#e5e7eb',
                          transition: 'all 0.2s',
                          filter: star <= (hoverRating || rating) 
                            ? 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4))' 
                            : 'none'
                        }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <small style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                      {rating === 0 && 'Selecione uma avaliação'}
                      {rating === 1 && 'Muito ruim'}
                      {rating === 2 && 'Ruim'}
                      {rating === 3 && 'Regular'}
                      {rating === 4 && 'Bom'}
                      {rating === 5 && 'Excelente'}
                    </small>
                  </div>
                </div>

                <Form.Group className="mb-4">
                  <Form.Label 
                    className="fw-semibold mb-2" 
                    style={{ color: '#374151', fontSize: '0.95rem' }}
                  >
                    Conte-nos mais sobre sua experiência
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="O que podemos melhorar? Compartilhe suas sugestões..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                    style={{
                      resize: 'none',
                      borderColor: '#e5e7eb',
                      borderRadius: '12px',
                      padding: '1rem',
                      fontSize: '0.95rem',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  disabled={rating === 0}
                  className="w-100"
                  style={{
                    backgroundColor: rating === 0 ? '#e5e7eb' : '#3b82f6',
                    border: 'none',
                    padding: '0.875rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    cursor: rating === 0 ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (rating !== 0) {
                      e.currentTarget.style.backgroundColor = '#2563eb';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (rating !== 0) {
                      e.currentTarget.style.backgroundColor = '#3b82f6';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  Enviar Feedback
                </Button>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FeedbackWidget;


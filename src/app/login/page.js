'use client';

import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de login aqui
    console.log('Login:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Lado Esquerdo - Branding */}
      <div style={{
        flex: 1,
        backgroundColor: '#f8f9fa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '500px', textAlign: 'center' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '20px',
            backgroundColor: 'white',
            border: '2px solid #dee2e6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px',
            overflow: 'hidden'
          }}>
            <img
              src="https://placehold.co/120x120/f8f9fa/6c757d?text=RC"
              alt="Logo Rodoviária Cerro Largo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h1 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
            Rodoviária Cerro Largo
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Acesse sua conta para gerenciar suas viagens, consultar horários e muito mais.
          </p>
        </div>

        {/* Decoração */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          right: '40px',
          textAlign: 'center'
        }}>
          <small className="text-muted">
            © 2024 Rodoviária Cerro Largo. Todos os direitos reservados.
          </small>
        </div>
      </div>

      {/* Lado Direito - Formulário de Login */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: 'white'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div className="mb-4">
            <h2 className="fw-bold mb-2">Bem-vindo de volta!</h2>
            <p className="text-muted">Entre com suas credenciais para acessar sua conta.</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  padding: '12px 16px',
                  fontSize: '1rem',
                  borderRadius: '8px'
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Senha</Form.Label>
              <div style={{ position: 'relative' }}>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '12px 16px',
                    paddingRight: '45px',
                    fontSize: '1rem',
                    borderRadius: '8px'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6c757d',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <Form.Check
                type="checkbox"
                id="remember"
                label="Lembrar-me"
                style={{ fontSize: '0.9rem' }}
              />
              <a
                href="/recuperar-senha"
                style={{
                  fontSize: '0.9rem',
                  color: '#0d6efd',
                  textDecoration: 'none'
                }}
              >
                Esqueceu a senha?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-100 fw-semibold"
              style={{
                padding: '12px',
                fontSize: '1rem',
                borderRadius: '8px'
              }}
            >
              Entrar
            </Button>
          </Form>

          <div className="mt-4 text-center">
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
              Não tem uma conta?{' '}
              <a
                href="/registro"
                style={{
                  color: '#0d6efd',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Criar conta
              </a>
            </p>
          </div>

          <div style={{
            marginTop: '40px',
            paddingTop: '30px',
            borderTop: '1px solid #dee2e6'
          }}>
            <p className="text-muted text-center mb-3" style={{ fontSize: '0.85rem' }}>
              Ou continue com
            </p>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                className="flex-fill"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              >
                Google
              </Button>
              <Button
                variant="outline-secondary"
                className="flex-fill"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              >
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

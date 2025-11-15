'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const TaxistaForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const initialValues = {
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    whatsapp: '',
    email: '',
    numeroAlvara: '',
    placaVeiculo: '',
    modeloVeiculo: '',
    anoVeiculo: '',
    corVeiculo: '',
    descricao: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/taxistas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Cadastro realizado com sucesso!');
        setSubmitSuccess(true);
        resetForm();

        // Scroll para o topo para ver a mensagem
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(data.error || 'Erro ao realizar cadastro');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro ao conectar com o servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const maskPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  };

  const maskPlaca = (value) => {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4" style={{ color: '#7C3AED' }}>
                Cadastro de Taxista
              </h2>

              {submitSuccess && (
                <Alert variant="success" dismissible onClose={() => setSubmitSuccess(false)}>
                  <Alert.Heading>Cadastro enviado com sucesso!</Alert.Heading>
                  <p>
                    Seu cadastro foi recebido e está aguardando análise. Você será
                    notificado por email assim que for aprovado.
                  </p>
                </Alert>
              )}

              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, errors, touched }) => (
                  <Form>
                    {/* Dados Pessoais */}
                    <h5 className="mb-3 mt-4" style={{ color: '#7C3AED' }}>
                      Dados Pessoais
                    </h5>

                    <Row>
                      <Col md={6} className="mb-3">
                        <label htmlFor="nomeCompleto" className="form-label">
                          Nome Completo *
                        </label>
                        <Field
                          type="text"
                          name="nomeCompleto"
                          className={`form-control ${
                            errors.nomeCompleto && touched.nomeCompleto ? 'is-invalid' : ''
                          }`}
                          placeholder="João da Silva"
                        />
                        <ErrorMessage
                          name="nomeCompleto"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>

                      <Col md={6} className="mb-3">
                        <label htmlFor="cpf" className="form-label">
                          CPF *
                        </label>
                        <Field name="cpf">
                          {({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className={`form-control ${
                                errors.cpf && touched.cpf ? 'is-invalid' : ''
                              }`}
                              placeholder="000.000.000-00"
                              value={maskCPF(field.value)}
                              onChange={(e) =>
                                setFieldValue('cpf', e.target.value.replace(/\D/g, ''))
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="cpf"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4} className="mb-3">
                        <label htmlFor="telefone" className="form-label">
                          Telefone *
                        </label>
                        <Field name="telefone">
                          {({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className={`form-control ${
                                errors.telefone && touched.telefone ? 'is-invalid' : ''
                              }`}
                              placeholder="(00) 0000-0000"
                              value={maskPhone(field.value)}
                              onChange={(e) =>
                                setFieldValue('telefone', e.target.value.replace(/\D/g, ''))
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="telefone"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>

                      <Col md={4} className="mb-3">
                        <label htmlFor="whatsapp" className="form-label">
                          WhatsApp
                        </label>
                        <Field name="whatsapp">
                          {({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className={`form-control ${
                                errors.whatsapp && touched.whatsapp ? 'is-invalid' : ''
                              }`}
                              placeholder="(00) 00000-0000"
                              value={maskPhone(field.value)}
                              onChange={(e) =>
                                setFieldValue('whatsapp', e.target.value.replace(/\D/g, ''))
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="whatsapp"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>

                      <Col md={4} className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email *
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className={`form-control ${
                            errors.email && touched.email ? 'is-invalid' : ''
                          }`}
                          placeholder="seuemail@exemplo.com"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>
                    </Row>

                    {/* Dados Profissionais */}
                    <h5 className="mb-3 mt-4" style={{ color: '#7C3AED' }}>
                      Dados Profissionais
                    </h5>

                    <Row>
                      <Col md={6} className="mb-3">
                        <label htmlFor="numeroAlvara" className="form-label">
                          Número do Alvará *
                        </label>
                        <Field
                          type="text"
                          name="numeroAlvara"
                          className={`form-control ${
                            errors.numeroAlvara && touched.numeroAlvara ? 'is-invalid' : ''
                          }`}
                          placeholder="123456"
                        />
                        <ErrorMessage
                          name="numeroAlvara"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>

                      <Col md={6} className="mb-3">
                        <label htmlFor="placaVeiculo" className="form-label">
                          Placa do Veículo *
                        </label>
                        <Field name="placaVeiculo">
                          {({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className={`form-control ${
                                errors.placaVeiculo && touched.placaVeiculo ? 'is-invalid' : ''
                              }`}
                              placeholder="ABC1234 ou ABC1D23"
                              value={maskPlaca(field.value)}
                              onChange={(e) =>
                                setFieldValue('placaVeiculo', maskPlaca(e.target.value))
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="placaVeiculo"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <label htmlFor="modeloVeiculo" className="form-label">
                          Modelo do Veículo *
                        </label>
                        <Field
                          type="text"
                          name="modeloVeiculo"
                          className={`form-control ${
                            errors.modeloVeiculo && touched.modeloVeiculo ? 'is-invalid' : ''
                          }`}
                          placeholder="Ex: Corolla, Civic, etc"
                        />
                        <ErrorMessage
                          name="modeloVeiculo"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>

                      <Col md={3} className="mb-3">
                        <label htmlFor="anoVeiculo" className="form-label">
                          Ano *
                        </label>
                        <Field
                          type="number"
                          name="anoVeiculo"
                          className={`form-control ${
                            errors.anoVeiculo && touched.anoVeiculo ? 'is-invalid' : ''
                          }`}
                          placeholder="2024"
                        />
                        <ErrorMessage
                          name="anoVeiculo"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>

                      <Col md={3} className="mb-3">
                        <label htmlFor="corVeiculo" className="form-label">
                          Cor *
                        </label>
                        <Field
                          type="text"
                          name="corVeiculo"
                          className={`form-control ${
                            errors.corVeiculo && touched.corVeiculo ? 'is-invalid' : ''
                          }`}
                          placeholder="Branco"
                        />
                        <ErrorMessage
                          name="corVeiculo"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>
                    </Row>

                    {/* Informações Adicionais */}
                    <h5 className="mb-3 mt-4" style={{ color: '#7C3AED' }}>
                      Informações Adicionais
                    </h5>

                    <div className="mb-3">
                      <label htmlFor="descricao" className="form-label">
                        Descrição (Opcional)
                      </label>
                      <Field
                        as="textarea"
                        name="descricao"
                        rows={4}
                        className={`form-control ${
                          errors.descricao && touched.descricao ? 'is-invalid' : ''
                        }`}
                        placeholder="Conte um pouco sobre você e seus serviços..."
                      />
                      <ErrorMessage
                        name="descricao"
                        component="div"
                        className="invalid-feedback"
                      />
                      <small className="text-muted">
                        {values.descricao.length}/500 caracteres
                      </small>
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: '#7C3AED',
                          borderColor: '#7C3AED',
                        }}
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}
                      </Button>
                    </div>

                    <p className="text-muted text-center mt-3 mb-0">
                      * Campos obrigatórios
                    </p>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TaxistaForm;

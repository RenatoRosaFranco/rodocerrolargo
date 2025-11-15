'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { publicidadeSchema } from '@/validations/publicidadeSchema';
import { useState } from 'react';
import { toast } from 'react-toastify';

const PublicidadeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const bannerTypes = [
    { value: 'topo', label: 'Banner Topo', dimensoes: '1200x120px' },
    { value: 'lateral-esquerdo', label: 'Banner Lateral Esquerdo', dimensoes: '300x600px' },
    { value: 'lateral-direito', label: 'Banner Lateral Direito', dimensoes: '300x600px' },
    { value: 'rodape', label: 'Banner Rodapé', dimensoes: '1200x100px' },
    { value: 'popup', label: 'Banner Popup', dimensoes: '800x600px' },
  ];

  const planos = [
    { value: 'basico', label: 'Básico', preco: 'R$ 150/mês' },
    { value: 'intermediario', label: 'Intermediário', preco: 'R$ 250/mês' },
    { value: 'premium', label: 'Premium', preco: 'R$ 400/mês' },
  ];

  const initialValues = {
    nomeEmpresa: '',
    cnpj: '',
    responsavel: '',
    email: '',
    telefone: '',
    tipoBanner: '',
    imagemUrl: '',
    linkDestino: '',
    textoAlternativo: '',
    dataInicio: '',
    dataFim: '',
    plano: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/publicidades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Solicitação enviada com sucesso!');
        setSubmitSuccess(true);
        resetForm();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(data.error || 'Erro ao enviar solicitação');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro ao conectar com o servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const maskCNPJ = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const maskPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={9}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4" style={{ color: '#7C3AED' }}>
                Solicitar Cota de Publicidade
              </h2>

              <p className="text-center text-muted mb-4">
                Preencha o formulário abaixo para solicitar uma cota de publicidade.
                Nossa equipe entrará em contato em até 48 horas.
              </p>

              {submitSuccess && (
                <Alert variant="success" dismissible onClose={() => setSubmitSuccess(false)}>
                  <Alert.Heading>Solicitação enviada!</Alert.Heading>
                  <p>
                    Recebemos sua solicitação de publicidade. Nossa equipe irá analisá-la e
                    entrar em contato em breve através do email cadastrado.
                  </p>
                </Alert>
              )}

              <Formik
                initialValues={initialValues}
                validationSchema={publicidadeSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, errors, touched }) => (
                  <Form>
                    {/* Dados da Empresa */}
                    <h5 className="mb-3 mt-4" style={{ color: '#7C3AED' }}>
                      Dados da Empresa
                    </h5>

                    <Row>
                      <Col md={6} className="mb-3">
                        <label htmlFor="nomeEmpresa" className="form-label">
                          Nome da Empresa *
                        </label>
                        <Field
                          type="text"
                          name="nomeEmpresa"
                          className={`form-control ${
                            errors.nomeEmpresa && touched.nomeEmpresa ? 'is-invalid' : ''
                          }`}
                          placeholder="Empresa LTDA"
                        />
                        <ErrorMessage
                          name="nomeEmpresa"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>

                      <Col md={6} className="mb-3">
                        <label htmlFor="cnpj" className="form-label">
                          CNPJ (Opcional)
                        </label>
                        <Field name="cnpj">
                          {({ field }) => (
                            <input
                              {...field}
                              type="text"
                              className={`form-control ${
                                errors.cnpj && touched.cnpj ? 'is-invalid' : ''
                              }`}
                              placeholder="00.000.000/0000-00"
                              value={maskCNPJ(field.value)}
                              onChange={(e) =>
                                setFieldValue('cnpj', e.target.value.replace(/\D/g, ''))
                              }
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="cnpj"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4} className="mb-3">
                        <label htmlFor="responsavel" className="form-label">
                          Responsável *
                        </label>
                        <Field
                          type="text"
                          name="responsavel"
                          className={`form-control ${
                            errors.responsavel && touched.responsavel ? 'is-invalid' : ''
                          }`}
                          placeholder="João Silva"
                        />
                        <ErrorMessage
                          name="responsavel"
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
                          placeholder="contato@empresa.com"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>

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
                              placeholder="(00) 00000-0000"
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
                    </Row>

                    {/* Informações da Publicidade */}
                    <h5 className="mb-3 mt-4" style={{ color: '#7C3AED' }}>
                      Informações da Publicidade
                    </h5>

                    <Row>
                      <Col md={6} className="mb-3">
                        <label htmlFor="tipoBanner" className="form-label">
                          Tipo de Banner *
                        </label>
                        <Field
                          as="select"
                          name="tipoBanner"
                          className={`form-select ${
                            errors.tipoBanner && touched.tipoBanner ? 'is-invalid' : ''
                          }`}
                        >
                          <option value="">Selecione...</option>
                          {bannerTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label} ({type.dimensoes})
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="tipoBanner"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>

                      <Col md={6} className="mb-3">
                        <label htmlFor="plano" className="form-label">
                          Plano *
                        </label>
                        <Field
                          as="select"
                          name="plano"
                          className={`form-select ${
                            errors.plano && touched.plano ? 'is-invalid' : ''
                          }`}
                        >
                          <option value="">Selecione...</option>
                          {planos.map((plano) => (
                            <option key={plano.value} value={plano.value}>
                              {plano.label} - {plano.preco}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="plano"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>
                    </Row>

                    <div className="mb-3">
                      <label htmlFor="imagemUrl" className="form-label">
                        URL da Imagem *
                      </label>
                      <Field
                        type="url"
                        name="imagemUrl"
                        className={`form-control ${
                          errors.imagemUrl && touched.imagemUrl ? 'is-invalid' : ''
                        }`}
                        placeholder="https://exemplo.com/banner.jpg"
                      />
                      <ErrorMessage
                        name="imagemUrl"
                        component="div"
                        className="invalid-feedback"
                      />
                      <small className="text-muted">
                        A imagem deve estar hospedada online. Verifique as dimensões recomendadas.
                      </small>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="linkDestino" className="form-label">
                        Link de Destino (Opcional)
                      </label>
                      <Field
                        type="url"
                        name="linkDestino"
                        className={`form-control ${
                          errors.linkDestino && touched.linkDestino ? 'is-invalid' : ''
                        }`}
                        placeholder="https://www.suaempresa.com"
                      />
                      <ErrorMessage
                        name="linkDestino"
                        component="div"
                        className="invalid-feedback"
                      />
                      <small className="text-muted">
                        Para onde o usuário será direcionado ao clicar no banner
                      </small>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="textoAlternativo" className="form-label">
                        Texto Alternativo (Opcional)
                      </label>
                      <Field
                        type="text"
                        name="textoAlternativo"
                        className={`form-control ${
                          errors.textoAlternativo && touched.textoAlternativo ? 'is-invalid' : ''
                        }`}
                        placeholder="Descrição do banner para acessibilidade"
                      />
                      <ErrorMessage
                        name="textoAlternativo"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* Período de Veiculação */}
                    <h5 className="mb-3 mt-4" style={{ color: '#7C3AED' }}>
                      Período de Veiculação
                    </h5>

                    <Row>
                      <Col md={6} className="mb-3">
                        <label htmlFor="dataInicio" className="form-label">
                          Data de Início *
                        </label>
                        <Field
                          type="date"
                          name="dataInicio"
                          className={`form-control ${
                            errors.dataInicio && touched.dataInicio ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="dataInicio"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>

                      <Col md={6} className="mb-3">
                        <label htmlFor="dataFim" className="form-label">
                          Data de Fim *
                        </label>
                        <Field
                          type="date"
                          name="dataFim"
                          className={`form-control ${
                            errors.dataFim && touched.dataFim ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="dataFim"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>
                    </Row>

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
                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
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

export default PublicidadeForm;

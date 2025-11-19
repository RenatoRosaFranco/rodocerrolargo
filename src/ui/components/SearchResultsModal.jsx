'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';
import { sendMessageToChatGPT, localSearch } from '@/services/chatService';
import styles from './SearchResultsModal.module.scss';

const SearchResultsModal = ({ show, onHide, query }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Função para buscar resposta (ChatGPT ou local)
  const getResponse = async (userMessage, currentMessages = []) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (apiKey) {
      // Tenta usar ChatGPT
      const result = await sendMessageToChatGPT(userMessage, currentMessages);
      if (result.success) {
        return result.message;
      }
    }

    // Fallback para busca local
    return localSearch(userMessage);
  };

  // Quando o modal abre com uma nova query
  useEffect(() => {
    if (show && query) {
      // Limpa mensagens anteriores e adiciona a query do usuário
      const userMsg = { type: 'user', text: query };
      setMessages([userMsg]);
      setIsLoading(true);

      // Busca resposta
      getResponse(query, []).then(response => {
        setMessages(prev => [...prev, { type: 'assistant', text: response }]);
        setIsLoading(false);
      });
    }
  }, [show, query]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    const newUserMsg = { type: 'user', text: userMessage };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsLoading(true);

    // Busca resposta passando o histórico
    const response = await getResponse(userMessage, messages);
    setMessages(prev => [...prev, { type: 'assistant', text: response }]);
    setIsLoading(false);
  };

  const handleClose = () => {
    setMessages([]);
    setInputValue('');
    setIsLoading(false);
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    onHide();
  };

  // Inicializa o reconhecimento de voz
  useEffect(() => {
    if (typeof window !== 'undefined' && show) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        let finalTranscript = '';

        recognition.onresult = (event) => {
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          // Atualiza o campo com o transcript (final ou interim)
          setInputValue((finalTranscript + interimTranscript).trim());
        };

        recognition.onerror = (event) => {
          console.error('Erro no reconhecimento de voz:', event.error);
          if (event.error !== 'no-speech' && event.error !== 'aborted') {
            setIsListening(false);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          finalTranscript = '';
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [show]);

  const toggleVoiceRecognition = () => {
    if (!recognitionRef.current) {
      alert('Seu navegador não suporta reconhecimento de voz. Tente usar o Google Chrome.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      className={styles.chatModal}
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <div className={styles.headerContent}>
          <img
            src="https://placehold.co/40x40/e5e7eb/6b7280?text=AI"
            alt="Avatar do Assistente"
            className={styles.headerAvatar}
          />
          <div className={styles.titleContainer}>
            <div className={styles.title}>Assistente Virtual</div>
            <div className={styles.subtitle}>Rodoviária de Cerro Largo</div>
          </div>
        </div>
      </Modal.Header>

      {/* Commands Bar */}
      <div className={styles.commandsBar}>
        <button
          onClick={async () => {
            const userMessage = 'Quais são os horários de ônibus disponíveis hoje?';
            const newUserMsg = { type: 'user', text: userMessage };
            setMessages(prev => [...prev, newUserMsg]);
            setIsLoading(true);
            const response = await getResponse(userMessage, messages);
            setMessages(prev => [...prev, { type: 'assistant', text: response }]);
            setIsLoading(false);
          }}
          className={styles.commandBadge}
          disabled={isLoading}
        >
          /horarios-do-dia
        </button>
        <button
          onClick={async () => {
            const userMessage = 'Quais hotéis tem em Cerro Largo?';
            const newUserMsg = { type: 'user', text: userMessage };
            setMessages(prev => [...prev, newUserMsg]);
            setIsLoading(true);
            const response = await getResponse(userMessage, messages);
            setMessages(prev => [...prev, { type: 'assistant', text: response }]);
            setIsLoading(false);
          }}
          className={styles.commandBadge}
          disabled={isLoading}
        >
          /hoteis
        </button>
        <button
          onClick={async () => {
            const userMessage = 'Quais restaurantes você recomenda em Cerro Largo?';
            const newUserMsg = { type: 'user', text: userMessage };
            setMessages(prev => [...prev, newUserMsg]);
            setIsLoading(true);
            const response = await getResponse(userMessage, messages);
            setMessages(prev => [...prev, { type: 'assistant', text: response }]);
            setIsLoading(false);
          }}
          className={styles.commandBadge}
          disabled={isLoading}
        >
          /restaurantes
        </button>
        <button
          onClick={async () => {
            const userMessage = 'Quais serviços estão disponíveis na rodoviária?';
            const newUserMsg = { type: 'user', text: userMessage };
            setMessages(prev => [...prev, newUserMsg]);
            setIsLoading(true);
            const response = await getResponse(userMessage, messages);
            setMessages(prev => [...prev, { type: 'assistant', text: response }]);
            setIsLoading(false);
          }}
          className={styles.commandBadge}
          disabled={isLoading}
        >
          /servicos
        </button>
        <button
          onClick={async () => {
            const userMessage = 'Como posso usar este assistente? Quais comandos estão disponíveis?';
            const newUserMsg = { type: 'user', text: userMessage };
            setMessages(prev => [...prev, newUserMsg]);
            setIsLoading(true);
            const response = await getResponse(userMessage, messages);
            setMessages(prev => [...prev, { type: 'assistant', text: response }]);
            setIsLoading(false);
          }}
          className={styles.commandBadge}
          disabled={isLoading}
        >
          /ajuda
        </button>
        <button
          onClick={handleClose}
          className={`${styles.commandBadge} ${styles.commandBadgeExit}`}
        >
          /sair
        </button>
      </div>

      <Modal.Body className={styles.modalBody}>
        <div className={styles.messagesContainer}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.type === 'user' ? styles.userMessage : styles.assistantMessage
              }`}
            >
              <div className={styles.messageContent}>
                {message.type === 'assistant' && (
                  <div className={styles.avatar}>
                    <img
                      src="https://placehold.co/32x32/e5e7eb/6b7280?text=AI"
                      alt="Avatar do Assistente"
                      style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                    />
                  </div>
                )}
                <div className={styles.messageText}>
                  {message.text.split('\n').map((line, i) => {
                    // Processa markdown inline (bold com **)
                    const processInlineMarkdown = (text) => {
                      const parts = [];
                      let currentText = text;
                      let key = 0;

                      while (currentText.includes('**')) {
                        const startIdx = currentText.indexOf('**');
                        const endIdx = currentText.indexOf('**', startIdx + 2);

                        if (endIdx === -1) break;

                        // Adiciona texto antes do bold
                        if (startIdx > 0) {
                          parts.push(currentText.substring(0, startIdx));
                        }

                        // Adiciona texto em bold
                        parts.push(
                          <strong key={key++}>
                            {currentText.substring(startIdx + 2, endIdx)}
                          </strong>
                        );

                        currentText = currentText.substring(endIdx + 2);
                      }

                      // Adiciona texto restante
                      if (currentText) {
                        parts.push(currentText);
                      }

                      return parts.length > 0 ? parts : text;
                    };

                    // Lista com bullet
                    if (line.startsWith('•') || line.startsWith('-')) {
                      return (
                        <div key={i} className={styles.listItem}>
                          • {processInlineMarkdown(line.slice(1).trim())}
                        </div>
                      );
                    }

                    // Linha vazia
                    if (!line.trim()) {
                      return <br key={i} />;
                    }

                    // Linha normal com suporte a markdown inline
                    return (
                      <div key={i} style={{ marginBottom: '0.5rem' }}>
                        {processInlineMarkdown(line)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.messageContent}>
                <div className={styles.avatar}>
                  <img
                    src="https://placehold.co/32x32/e5e7eb/6b7280?text=AI"
                    alt="Avatar do Assistente"
                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                  />
                </div>
                <div className={styles.loadingDots}>
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" size="sm" />
                  <Spinner animation="grow" size="sm" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </Modal.Body>

      <Modal.Footer className={styles.modalFooter}>
        <Form onSubmit={handleSendMessage} className={styles.inputForm}>
          <div className={styles.inputWrapper}>
            <Form.Control
              type="text"
              placeholder="Digite sua mensagem ou use o microfone..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className={styles.input}
            />
            <Button
              type="button"
              onClick={toggleVoiceRecognition}
              disabled={isLoading}
              className={styles.micButton}
              title={isListening ? 'Parar gravação' : 'Falar'}
            >
              <FaMicrophone
                style={{
                  color: isListening ? '#dc3545' : 'inherit',
                  animation: isListening ? 'pulse 1.5s infinite' : 'none'
                }}
              />
            </Button>
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={styles.sendButton}
            >
              <FaPaperPlane />
            </Button>
          </div>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchResultsModal;

'use client';

import { useState } from 'react';
import styles from '@/ui/styles/Newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log('Email enviado:', email);
      // Aqui você pode adicionar a lógica para enviar o email para um serviço de newsletter
      alert('Email cadastrado com sucesso!');
      setEmail('');
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  }

  return(
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <svg className={styles.icon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="30" width="80" height="50" rx="4" stroke="currentColor" strokeWidth="3" fill="none"/>
            <path d="M10 35 L50 60 L90 35" stroke="currentColor" strokeWidth="3" fill="none"/>
            <circle cx="75" cy="25" r="15" fill="#7C3AED"/>
            <text x="75" y="32" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">$</text>
          </svg>
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>Inscreva-se para receber ofertas exclusivas</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              Quero recebê-las!
            </button>
          </form>

          <p className={styles.privacy}>
            Você receberá e-mails promocionais da Rodoviária de Cerro Largo. Para mais informações, consulte as{' '}
            <a href="/politicas-de-privacidade" className={styles.link}>
              políticas de privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter;

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});  // Para armazenar os erros dos campos

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !passwordConfirmation) {
      setMessage('Todos os campos são obrigatórios.');
      setMessageType('danger');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
      return;
    }

    if (password !== passwordConfirmation) {
      setMessage('As senhas não coincidem!');
      setMessageType('danger');
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
      return;
    }

    const data = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const response = await axios.post('http://localhost:8000/register', data);
      console.log('Registro bem-sucedido', response.data);
      setMessage('Usuário cadastrado com sucesso!');
      setMessageType('success');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;
        setMessage(message || 'Erro ao registrar usuário. Tente novamente.');
        setMessageType('danger');
        setErrors(errors || {});
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      } else {
        console.error('Erro desconhecido', error);
        setMessage('Erro desconhecido. Tente novamente.');
        setMessageType('danger');
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      }
    }
  };

  return (
    <div className="container">
      {showModal && (
        <div className={`alert alert-${messageType} mt-3`} role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Digite seu nome"
            value={name || ''}
            onChange={(e) => setName(e.target.value || '')}
          />
          {errors.name && <div className="text-danger">{errors.name.join(', ')}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Digite seu email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value || '')}
          />
          {errors.email && <div className="text-danger">{errors.email.join(', ')}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Digite sua senha"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value || '')}
          />
          {errors.password && <div className="text-danger">{errors.password.join(', ')}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="passwordConfirmation" className="form-label">Confirmar Senha</label>
          <input
            type="password"
            id="passwordConfirmation"
            className="form-control"
            placeholder="Confirme sua senha"
            value={passwordConfirmation || ''}
            onChange={(e) => setPasswordConfirmation(e.target.value || '')}
          />
          {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation.join(', ')}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default Register;

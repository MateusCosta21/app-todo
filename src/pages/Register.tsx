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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert('As senhas não coincidem!');
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
    } catch (error) {
      console.error('Erro ao registrar', error);
      setMessage('Erro ao registrar usuário. Tente novamente.');
      setMessageType('danger');
      setShowModal(true); 

      setTimeout(() => {
        setShowModal(false);
      }, 3000);
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
        </div>

        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default Register;

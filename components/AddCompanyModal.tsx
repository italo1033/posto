'use client';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddCompanyModal: React.FC = () => {
  const [show, setShow] = useState(false); // Controla a visibilidade do modal
  const [companyData, setCompanyData] = useState({
    email: '',
    password: '',
    companyName: '',
    legalName: '',
    cnpj: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false); // Controle de carregamento
  const [error, setError] = useState<string>(''); // Armazenar mensagens de erro
  const [success, setSuccess] = useState<string>(''); // Armazenar mensagem de sucesso

  // Função para abrir o modal
  const handleShow = () => setShow(true);

  // Função para fechar o modal
  const handleClose = () => setShow(false);

  // Função para atualizar o estado conforme os dados do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para enviar os dados para o backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Exibe a mensagem de carregamento enquanto faz a requisição
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Fazendo a requisição para a API de registro
      const response = await fetch('http://localhost:3005/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        // Se a requisição for bem-sucedida
        setSuccess('Empresa registrada com sucesso!');
        setCompanyData({
          email: '',
          password: '',
          companyName: '',
          legalName: '',
          cnpj: '',
          phone: '',
        });
      } else {
        // Se houver um erro no registro
        const data = await response.json();
        setError(data.message || 'Erro ao registrar a empresa');
      }
    } catch (err) {
      // Se houver algum erro com a requisição
      setError('Erro ao registrar a empresa. Tente novamente.');
    } finally {
      // Após a requisição (independente de sucesso ou falha)
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Botão que abre o modal */}
      <Button onClick={handleShow}>
        +
      </Button>

      {/* Modal de Adicionar Empresa */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Nova Empresa</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Exibe mensagens de sucesso ou erro */}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Nome da Empresa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da empresa"
                name="companyName"
                value={companyData.companyName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLegalName">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control
                type="text"
                placeholder="Razão social"
                name="legalName"
                value={companyData.legalName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCNPJ">
              <Form.Label>CNPJ</Form.Label>
              <Form.Control
                type="text"
                placeholder="CNPJ"
                name="cnpj"
                value={companyData.cnpj}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefone"
                name="phone"
                value={companyData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={companyData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                name="password"
                value={companyData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Adicionar Empresa'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCompanyModal;

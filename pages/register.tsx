'use client';
import React, { useEffect, useState } from 'react';
import AddCompanyModal from '../components/AddCompanyModal';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Company {
  id: number;
  name: string;
  legalName: string;
  cnpj: string;
  phone: string;
  email: string;
}

const CompaniesList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:3005/users/allCompany');
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }

        const data = await response.json();
        setCompanies(data); // Armazena os dados no estado
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar as empresas');
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Renderização dos dados
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Lista de Empresas</h1> 
      <AddCompanyModal />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Razão Social</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.legalName}</td>
              <td>{company.cnpj}</td>
              <td>{company.phone}</td>
              <td>{company.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesList;

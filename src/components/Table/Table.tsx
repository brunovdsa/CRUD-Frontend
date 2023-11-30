import { useEffect, useState } from 'react';
import './Tabel.scss';
import { request } from '../../utils/request';

export interface ClientData {
  map(
    arg0: (client: ClientData) => import('react/jsx-runtime').JSX.Element
  ): import('react').ReactNode;

  id: number;
  nome: string;
  email: string;
  telefone: string;
  tipoFornecedor?: any;
  observacao?: any;
}

export function Table() {
  const [clientData, setClientData] = useState<ClientData>();

  useEffect(() => {
    const ENDPOINT: string = 'http://localhost:8080/api/clientes';
    request<ClientData>(ENDPOINT).then((response) => setClientData(response));
  }, []);

  return (
    <div className='table-wrapper'>
      <table>
        <thead>
          <tr>
            <td className='td-input'>
              <input type='checkbox' />
            </td>
            <td>Nome</td>
            <td>Email</td>
            <td>Telefone</td>
            <td>Tipo de fornecedor</td>
            <td>Observação</td>
          </tr>
        </thead>
        <tbody>
          {clientData &&
            clientData.map((client: ClientData) => {
              return (
                <tr key={client.id}>
                  <td className='td-input'>
                    <input type='checkbox' />
                  </td>
                  <td>{client.nome}</td>
                  <td>{client.email}</td>
                  <td>{client.telefone}</td>
                  <td>{client.tipoFornecedor}</td>
                  <td>{client.observacao}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

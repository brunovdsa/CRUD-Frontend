import { ChangeEventHandler, useEffect, useState } from 'react';
import './Tabel.scss';
export interface SupplierData {
  map(
    arg0: (supplier: SupplierData) => import('react/jsx-runtime').JSX.Element
  ): import('react').ReactNode;

  id: number;
  nome: string;
  email: string;

  telefone: string;
  tipoFornecedor?: any;
  observacao?: any;
  length: any;
}

export interface TableProps {
  handleChecked: ChangeEventHandler<HTMLInputElement>;
  isChecked: String[];
}

export function Table(props: TableProps) {
  const [tableData, setTabelData] = useState<Array<SupplierData>>();

  useEffect(() => {
    const ENDPOINT: string = 'http://localhost:8080/api/clientes';
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        const results = await response.json();
        setTabelData(results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(ENDPOINT);
  }, []);

  return (
    <div className='table-wrapper'>
      <table>
        <thead>
          <tr>
            <td className='td-input'>              
            </td>
            <td>Nome</td>
            <td>Email</td>
            <td>Telefone</td>
            <td>Tipo de fornecedor</td>
            <td>Observação</td>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((supplier: SupplierData) => {
              return (
                <tr key={supplier.id}>
                  <td className='td-input'>
                    <input
                      type='checkbox'
                      value={supplier.id}
                      onChange={props.handleChecked}
                    />
                  </td>
                  <td>{supplier.nome}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.telefone}</td>
                  <td>{supplier.tipoFornecedor}</td>
                  <td>{supplier.observacao}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

import { useState } from 'react';
import './Tabel.scss';
import { SupplierDataProps } from '../../interfaces/interfaces';
import { SolidStar } from '../Icons/Icons';

export interface TableProps {
  handleCheckedId: (id: number) => void;
  supplierData: SupplierDataProps;
  tableData: SupplierDataProps[];
  toggleIsFavorite: (id: number) => void;
}

export function Table(props: TableProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlechange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsPressed(!isPressed);
    if (e.currentTarget.className == 'fav-disabled') {
      e.currentTarget.className = 'fav-enabled';
    } else {
      e.currentTarget.className = 'fav-disabled';
    }
  };

  return (
    <div className='table-wrapper'>
      <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <td>Selecione</td>
            <td>Nome</td>
            <td>Email</td>
            <td>Telefone</td>
            <td>Tipo de fornecedor</td>
            <td>Observação</td>
            <td>Favoritos</td>
          </tr>
        </thead>
        <tbody>
          {props.tableData &&
            props.tableData.map((supplier: SupplierDataProps) => {
              return (
                <tr key={supplier.id}>
                  <td className='td-input'>
                    <input
                      type='checkbox'
                      value={supplier.id}
                      onChange={() => {
                        props.handleCheckedId(supplier.id);
                      }}
                    />
                  </td>
                  <td>{supplier.nome}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.telefone}</td>
                  <td>{supplier.tipoFornecedor}</td>
                  <td>{supplier.observacao}</td>
                  <td>
                    <button
                      className='fav-disabled'
                      onClick={(e) => {
                        handlechange(e);
                        props.toggleIsFavorite(supplier.id);
                      }}
                    >
                      {' '}
                      <SolidStar />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

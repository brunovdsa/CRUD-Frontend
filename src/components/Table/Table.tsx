import { useState } from 'react';
import './Tabel.scss';
import { SupplierDataProps } from '../../interfaces/interfaces';

export interface TableProps {
  handleCheckedId: (id: number) => void;
  supplierData: SupplierDataProps;
  tableData: SupplierDataProps[];
  loadTable: any;
  toggleIsFavorite: (id: number) => void;
}

export function Table(props: TableProps) {
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
                    <input
                      type='checkbox'
                      value={supplier.id}
                      onChange={() => props.toggleIsFavorite(supplier.id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

import { useState } from 'react';
import './Tabel.scss';
import { SupplierDataProps } from '../../interfaces/interfaces';

export interface TableProps {
  handleCheckedId: (id: number) => void;
  supplierData: SupplierDataProps;
  tableData: SupplierDataProps[];
  loadTable: any;
}

export function Table(props: TableProps) {
  const [favList, setFavList] = useState<Array<SupplierDataProps>>([]);

  function handleFavorite(id: number) {
    const newFavorites = props.tableData.map((item: SupplierDataProps) => {
      return item.id === id ? { ...item, favorite: !item.favorite } : item;
    });
    console.log(id);
    setFavList(newFavorites);
  }

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
                        console.log('supplier id: ', supplier.id);
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
                    <button onClick={() => handleFavorite(supplier.id)}>
                      ok
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

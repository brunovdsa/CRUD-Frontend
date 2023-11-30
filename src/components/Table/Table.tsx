import { useEffect } from 'react';
import './Tabel.scss';
import axios from 'axios';

export function Table() {
  useEffect(() => {
    const ENDPOINT: string = 'http://localhost:8080/api/clientes';

    axios.get(ENDPOINT).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className='table-wrapper'>
      <table>
        <thead>
          <td className='td-input'>
            <input type='checkbox' />
          </td>
          <td>Nome</td>
          <td>Email</td>
          <td>Telefone</td>
          <td>Tipo de fornecedor</td>
          <td>Observação</td>
        </thead>
        <tbody>
          <tr>
            <td className='td-input'>
              <input type='checkbox' />
            </td>
            <td>Bruno Vinicius Souza de Sá</td>
            <td>brunoviniciussouza.sa@gmail.com</td>
            <td>{'(47) 99905-4703'}</td>
            <td>Primario</td>
            <td>Apagar</td>
          </tr>
        </tbody>
        <tfoot>
          <td className='td-input'>
            <input type='checkbox' />
          </td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>

          <td>&nbsp;</td>
        </tfoot>
      </table>
    </div>
  );
}

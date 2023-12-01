import { useState } from 'react';
import './Form.scss';

interface FormProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

interface clienteDataProps {
  id: number;
  nome: string;
  telefone: string;
  observacao: string;
  tipoFornecedor: string;
  email: string;
}

export function Form(props: FormProps) {
  const [clienteData, setClienteData] = useState<clienteDataProps>({
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    tipoFornecedor: 'selecione',
    observacao: '',
  });

  const inputChanges = (e: any) => {
    const value = e.target.value;

    setClienteData({
      ...clienteData,
      [e.target.name]: value,
    });
  };

  const onClick = async (e: any) => {
    const body = new FormData();

    body.set('clienteData', JSON.stringify(clienteData));

    console.log(clienteData);

    e.preventDefault();
    await fetch('http://localhost:8080/api/clientes', {
      method: 'POST',
      body: body,
    }).then((res) => console.log(res));
  };

  return (
    <form className='form' id='form' onSubmit={onClick}>
      <fieldset className='form-header'>
        <h1 className='title'>Novo Fornecedor</h1>
        <div className='inputs-header'>
          <div>
            <label htmlFor='name'>
              Nome<span>*</span>
            </label>
            <input
              required
              type='text'
              name='nome'
              placeholder='Nome'
              value={clienteData.nome}
              onChange={inputChanges}
            />
          </div>
          <div>
            <label htmlFor='email'>
              Email<span>*</span>
            </label>
            <input
              required
              type='text'
              name='email'
              placeholder='E-mail'
              value={clienteData.email}
              onChange={inputChanges}
            />
          </div>
          <div>
            <label htmlFor='select-supplier'>
              Tipo de Fornecedor<span>*</span>
            </label>
            <select
              required
              name='tipoFornecedor'
              id='select-supplier'
              onChange={inputChanges}
              value={clienteData.tipoFornecedor}
            >
              <option value=''>Selecione</option>
              <option value='teste'>Atacadista</option>
              <option value='Distribuidor'>Distribuidor</option>
              <option value='Terceiro'>Terceiro</option>
              <option value='Varejista'>Varejista</option>
            </select>
          </div>
        </div>
      </fieldset>
      <fieldset className='form-body'>
        <label>
          Telefones<span>*</span>
        </label>
        <input
          required
          type='text'
          name='telefone'
          placeholder='Phone'
          value={clienteData.telefone}
          onChange={inputChanges}
        />
        <label htmlFor='comments'>Observações</label>
        <textarea
          name='observacao'
          value={clienteData.observacao}
          onChange={inputChanges}
        />
      </fieldset>

      <fieldset className='form-footer'>
        <button onClick={props.onClick} className='btn-cancel'>
          Cancelar
        </button>
        <button type='submit' className='btn-submit-form'>
          Salvar
        </button>
      </fieldset>
    </form>
  );
}

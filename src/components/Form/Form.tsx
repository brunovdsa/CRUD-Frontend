import { ChangeEvent, useState } from 'react';
import './Form.scss';

interface FormProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

interface JsonData {
  nome: string;
  telefone: string;
  observacao: string;
  tipoFornecedor: string;
  email: string;
}

export function Form(props: FormProps) {
  const [jsonData, setJsonData] = useState<JsonData>({
    nome: '',
    telefone: '',
    observacao: '',
    tipoFornecedor: '',
    email: '',
  });

  const inputChanges = (e: any) => {
    const value = e.target.value;

    setJsonData({
      ...jsonData,
      [e.target.name]: value,
    });
  };

  const onClick = (e: any) => {
    e.preventDefault();

    console.log(jsonData);

    fetch('http://localhost:8080/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify(jsonData),
    });
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
              value={jsonData.nome}
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
              value={jsonData.email}
              onChange={inputChanges}
            />
          </div>
          <div>
            <label htmlFor='select-supplier'>
              Tipo de Fornecedor<span>*</span>
            </label>
            <select required name='select-supplier' id='select-supplier'>
              <option value=''>Selecione</option>
              <option value='Atacadista'>Atacadista</option>
              <option value='Distribuidor'>Distribuidor</option>
              <option value='Fabricante'>Distribuidor</option>
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
          value={jsonData.telefone}
          onChange={inputChanges}
        />
        <label htmlFor='comments'>Observações</label>
        <textarea
          name='observacao'
          value={jsonData.observacao}
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

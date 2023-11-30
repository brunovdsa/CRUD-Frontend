import { ChangeEvent, useState } from 'react';
import './Form.scss';

interface FormProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

interface JsonData {
  id: number;
  name: string;
  email: string;
  phone: string;
  supplierType: string;
  comments: string;
}

export function Form(props: FormProps) {
  const [jsonData, setJsonData] = useState<JsonData>({
    id: 1,
    name: '',
    email: '',
    phone: '',
    supplierType: '',
    comments: '',
  });

  const inputChanges = (evt: any) => {
    console.log(evt);
    const value = evt.target.value;

    // const name = ;

    setJsonData({
      ...jsonData,
      [evt.target.name]: value,
    });
  };

  const onClick = () => {
    console.log(jsonData);
  };

  return (
    <form className='form'>
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
              name='name'
              placeholder='Nome'
              value={jsonData.name}
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
          name='phone'
          placeholder='Phone'
          value={jsonData.phone}
          onChange={inputChanges}
        />
        <label htmlFor='comments'>Observações</label>
        <textarea
          name='comments'
          value={jsonData.comments}
          onChange={inputChanges}
        />
      </fieldset>

      <fieldset className='form-footer'>
        <button onClick={props.onClick} className='btn-cancel'>
          Cancelar
        </button>
        <button onClick={onClick} className='btn-submit-form'>
          Salvar
        </button>
      </fieldset>
    </form>
  );
}

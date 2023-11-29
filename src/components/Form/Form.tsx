import './Form.scss';

interface FormProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Form(props: FormProps) {
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
              id='name'
              type='text'
              name='name'
              placeholder='Nome'
            />
          </div>
          <div>
            <label htmlFor='email'>
              Email<span>*</span>
            </label>
            <input
              required
              id='email'
              type='text'
              name='email'
              placeholder='E-mail'
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
          type='tel'
          id='phone-number'
          name='phone-number'
          placeholder='((XX) XXXXX-XXXX)'
        />
        <input
          required
          type='tel'
          id='phone-number'
          name='phone-number'
          placeholder='((XX) XXXXX-XXXX)'
        />
        <label htmlFor='comments'>Observações</label>
        <textarea id='comments' />
      </fieldset>

      <fieldset className='form-footer'>
        <button onClick={props.onClick} className='btn-cancel'>
          Cancelar
        </button>
        <button className='btn-submit-form'>Salvar</button>
      </fieldset>
    </form>
  );
}

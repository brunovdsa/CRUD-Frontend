import './Form.scss';
import { clienteDataProps } from '../ModalNewSupplier/ModalNewSupplier';

interface FormProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  clienteData: clienteDataProps;
  inputChanges: any;
  onSubmit: any;
}

export function Form(props: FormProps) {
  return (
    <form className='form' id='form' onSubmit={props.onSubmit}>
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
              value={props.clienteData.nome}
              onChange={props.inputChanges}
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
              value={props.clienteData.email}
              onChange={props.inputChanges}
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
              onChange={props.inputChanges}
              value={props.clienteData.tipoFornecedor}
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
          value={props.clienteData.telefone}
          onChange={props.inputChanges}
        />
        <label htmlFor='comments'>Observações</label>
        <textarea
          name='observacao'
          value={props.clienteData.observacao}
          onChange={props.inputChanges}
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

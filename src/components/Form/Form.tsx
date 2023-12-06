import { SupplierDataProps } from '../../interfaces/interfaces';
import { ReturnButton } from '../CancelButton/ReturnButton';
import { SubmitButton } from '../SubmitButton/SubmitButton';
import { IMaskInput } from 'react-imask';
import './Form.scss';
interface FormProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  supplierData: SupplierDataProps;
  inputChanges: any;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  typeAction: string;
}

export function Form(props: FormProps) {
  return (
    <form className='form' id='form' onSubmit={props.onSubmit}>
      <fieldset className='form-header'>
        <h1 className='title'>{`${props.typeAction} Fornecedor`}</h1>
        <div className='inputs-header'>
          <div>
            <label htmlFor='name'>
              Nome<span>*</span>
            </label>
            <input
              type='text'
              name='nome'
              placeholder='Nome'
              value={props.supplierData.nome}
              onChange={props.inputChanges}
            />
          </div>
          <div>
            <label htmlFor='email'>
              Email<span>*</span>
            </label>
            <input
              type='text'
              name='email'
              placeholder='E-mail'
              value={props.supplierData.email}
              onChange={(e) => {
                props.inputChanges(e);
              }}
            />
          </div>
          <div>
            <label htmlFor='select-supplier'>
              Tipo de Fornecedor<span>*</span>
            </label>
            <select
              name='tipoFornecedor'
              id='select-supplier'
              onChange={props.inputChanges}
              value={props.supplierData.tipoFornecedor}
            >
              <option value=''>Selecione</option>
              <option value='Atacadista'>Atacadista</option>
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
        <IMaskInput
          type='text'
          name='telefone'
          placeholder='Phone'
          mask={'(00) 0 0000-0000'}
          value={props.supplierData.telefone}
          onChange={props.inputChanges}
        />
        <label htmlFor='comments'>Observações</label>
        <textarea
          name='observacao'
          value={props.supplierData.observacao}
          onChange={props.inputChanges}
        />
      </fieldset>

      <fieldset className='form-footer'>
        <ReturnButton action={'Cancelar'} onClick={props.onClick} />
        <SubmitButton action={'Salvar'} />
      </fieldset>
    </form>
  );
}

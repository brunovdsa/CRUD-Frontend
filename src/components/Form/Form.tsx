import { SupplierDataProps } from '../Header/Header';
import { Modal } from '../Modal/Modal';
import './Form.scss';

interface FormProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  supplierData: SupplierDataProps;
  inputChanges: any;
  onSubmit: any;
  requestSend: boolean;
  fieldsError: boolean;
  handleModalNewClientActive?: (e: React.MouseEvent<HTMLElement>) => void;
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
              onChange={props.inputChanges}
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
          type='text'
          name='telefone'
          placeholder='Phone'
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
        <button onClick={props.onClick} className='btn-cancel'>
          Cancelar
        </button>
        <button type='submit' className='btn-submit-form'>
          Salvar
        </button>
      </fieldset>

      {props.fieldsError === true ? (
        <>
          <div
            className='bg-overlay'
            onClick={props.handleModalNewClientActive}
          ></div>
          <Modal>
            <h1>Atenção!</h1>
            <span>Por gentileza preencha todos os campos em branco.</span>
          </Modal>
        </>
      ) : (
        'esquece'
      )}
    </form>
  );
}

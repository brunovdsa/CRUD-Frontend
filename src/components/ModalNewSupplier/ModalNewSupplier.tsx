import { ModalNewSupplierProps } from '../../interfaces/interfaces';
import { Container } from '../Container/Container';
import './ModalNewSupplier.scss';

export function ModalNewSupplier(props: ModalNewSupplierProps) {
  return (
    <Container>
      <div className='modal-bg'>
        <div className='modal'>
          <form className='modal-form'>
            <fieldset className='form-header'>
              <h1 className='modal-title'>Novo Fornecedor</h1>
              <div className='inputs-header'>
                <input type='text' name='name' placeholder='Nome' />
                <input type='text' name='email' placeholder='E-mail' />
                <select name='' id=''>
                  <option value=''>Tipo de Fornecedor</option>
                  <option value='Atacadista'>Atacadista</option>
                  <option value='Distribuidor'>Distribuidor</option>
                  <option value='Fabricante'>Distribuidor</option>
                  <option value='Varejista'>Varejista</option>
                </select>
              </div>
            </fieldset>
            <fieldset className='form-body'>
              <legend>Telefones</legend>
              <input type='text' />
              <input type='text' />
            </fieldset>

            <fieldset className='form-footer'>
              <button onClick={props.onClick}>Cancelar</button>
              <button>Salvar</button>
            </fieldset>
          </form>
        </div>
      </div>
    </Container>
  );
}

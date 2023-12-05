import { API_URL } from '../../../services/api';
import { ReturnButton } from '../../CancelButton/ReturnButton';
import { ExclamationIcon } from '../../Icons/Icons';
import { SubmitButton } from '../../SubmitButton/SubmitButton';
import { Modal } from '../Modal';
import './ModalDeleteSupplier.scss';

interface ModalDeleteSupplierProps {
  modalDeleteSupplierIsActive: boolean;
  inputChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteSelectedSupplier: () => void;
  checkedId: number;
  handleCheckedId: (id: number) => void;
}

export function ModalDeleteSupplier(props: ModalDeleteSupplierProps) {
  //DELETA Supplier SELECIONADO
  const deleteSelectedSupplier = async () => {
    await fetch(`${API_URL}/${props.checkedId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log(res);
        props.handleDeleteSelectedSupplier();
        props.handleCheckedId(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {props.modalDeleteSupplierIsActive && (
        <>
          <div
            className='bg-overlay'
            onClick={props.handleDeleteSelectedSupplier}
          ></div>
          <div>
            <Modal>
              <div className='container-modal-delete'>
                <div className='header-modal-delete'>
                  <ExclamationIcon style={{ color: '#0065b3' }} />
                  <h1>Atenção!</h1>
                </div>
                <span>
                  Tem certeza que deseja deletar o fornecedor selecionado?
                </span>
                <div className='footer-modal-delete'>
                  <ReturnButton
                    action={'Cancelar'}
                    onClick={props.handleDeleteSelectedSupplier}
                  />
                  <SubmitButton
                    action={'Deletar'}
                    onClick={deleteSelectedSupplier}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}
    </>
  );
}

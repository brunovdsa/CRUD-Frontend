import { API_URL } from '../../../services/api';
import { Modal } from '../Modal';

interface ModalDeleteSupplierProps {
  modalDeleteSupplierIsActive: boolean;
  inputChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteSelectedSupplier: () => void;
  checkedId: String[];
}

export function ModalDeleteSupplier(props: ModalDeleteSupplierProps) {
  //DELETA Supplier SELECIONADO
  const deleteSelectedSupplier = async () => {
    const ID = props.checkedId[0];
    await fetch(`${API_URL}/${ID}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.log(res);
        props.handleDeleteSelectedSupplier();
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
              <>
                <h1>Atenção!</h1>
                <span>
                  Tem certeza que deseja deletar o fornecedor selecionado?
                </span>
                <button onClick={props.handleDeleteSelectedSupplier}>
                  Cancelar
                </button>
                <button onClick={deleteSelectedSupplier}>Deletar</button>
              </>
            </Modal>
          </div>
        </>
      )}
    </>
  );
}

import { FieldsErrorModal } from '../ModalFieldsError/ModalFieldsError';
import { ModalRequestSuccessResponse } from '../ModalRequestSuccessResponse/ModalRequestSuccessResponse';

export interface ModalErrorToShowProps {
  hasError: boolean;
  emptyFieldsError: boolean;
  isEmailFormated: boolean;
  requestSend: boolean;
  clearFieldsStates: () => void;
  onClick: () => void;
}

export function ModalErrorToShow(props: ModalErrorToShowProps) {
  return (
    <>
      {props.hasError === true &&
      props.emptyFieldsError === true &&
      props.isEmailFormated === false ? (
        <FieldsErrorModal
          errorDescription='Preencha todos os campos em branco!'
          clearFieldsStates={props.clearFieldsStates}
        />
      ) : (
        ''
      )}

      {props.hasError === true &&
      props.emptyFieldsError === false &&
      props.isEmailFormated === true ? (
        <FieldsErrorModal
          errorDescription='Email já cadastrado!'
          clearFieldsStates={props.clearFieldsStates}
        />
      ) : (
        ''
      )}

      {props.hasError === true &&
      props.emptyFieldsError === false &&
      props.isEmailFormated === false ? (
        <FieldsErrorModal
          errorDescription={'Formato de email inválido!'}
          clearFieldsStates={props.clearFieldsStates}
        />
      ) : (
        ''
      )}

      {props.requestSend === true && props.hasError === false ? (
        <ModalRequestSuccessResponse
          handleModal={props.onClick}
          typeRequest={'criado'}
        />
      ) : (
        ''
      )}
    </>
  );
}

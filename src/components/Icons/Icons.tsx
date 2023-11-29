import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IconProps {
  style?: React.CSSProperties;
}

export function EditIcon(props: IconProps) {
  return <FontAwesomeIcon icon={faPencil} style={props.style} />;
}

export function DeleteIcon(props: IconProps) {
  return <FontAwesomeIcon icon={faTrashCan} style={props.style} />;
}

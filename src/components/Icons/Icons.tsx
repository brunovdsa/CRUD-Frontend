import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faExclamationTriangle,
  faPencil,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

interface IconProps {
  style?: React.CSSProperties;
}

export function EditIcon(props: IconProps) {
  return <FontAwesomeIcon icon={faPencil} style={props.style} />;
}

export function DeleteIcon(props: IconProps) {
  return <FontAwesomeIcon icon={faTrashCan} style={props.style} />;
}

export function ExclamationIcon(props: IconProps) {
  return <FontAwesomeIcon icon={faExclamationTriangle} style={props.style} />;
}

export function SuccessIcon(props: IconProps) {
  return <FontAwesomeIcon icon={faCircleCheck} style={props.style} />;
}

export function SolidStar(props: IconProps) {
  return <FontAwesomeIcon icon={faStar} style={props.style} />;
}

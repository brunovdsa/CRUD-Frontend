import { ContainerProps } from '../../interfaces/interfaces';

export function Container(props: ContainerProps) {
  return <div onClick={props.onClick}>{props.children}</div>;
}

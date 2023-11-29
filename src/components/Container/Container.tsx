import './Container.scss';

interface ContainerProps {
  children: JSX.Element;

  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Container(props: ContainerProps) {
  return <div onClick={props.onClick}>{props.children}</div>;
}

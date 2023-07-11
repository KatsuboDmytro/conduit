import { FC, PropsWithChildren } from 'react';

interface ContainerProps {}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
  children,
}) => {
  return <div className="container w-3/4 mx-auto">{children}</div>;
};
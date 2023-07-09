import { FC } from 'react';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <h1 className="text-3xl font-bold underline">
      Header
    </h1>
  );
}
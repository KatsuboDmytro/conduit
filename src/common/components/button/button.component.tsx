import clsx from 'clsx';
import { ComponentProps, FC, PropsWithChildren } from 'react';

export enum ButtonStyleEnum {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  GREEN = 'GREEN',
}

enum ButtonSizeEnum {
  BASE = 'BASE',
  LG = 'LG',
}

interface ButtonProps {
  btnStyle?: keyof typeof ButtonStyleEnum;
  btnSize?: keyof typeof ButtonSizeEnum;
  type?: ComponentProps<'button'>['type'];
  disabled?: ComponentProps<'button'>['disabled'];
}

export const Button: FC<PropsWithChildren<ButtonProps>> = (
  {btnStyle = ButtonStyleEnum.DARK, btnSize = ButtonSizeEnum.BASE, children, ...buttonProps}
) => {
  const btnClasses = clsx('text-center align-middle cursor-pointer select-none border active:bg-conduit-activeBtn', {
    'border-conduit-darkenGray text-conduit-darkenGray bg-conduit-followGray': btnStyle === ButtonStyleEnum.DARK,
    'border-conduit-followGray text-conduit-followGray hover:bg-conduit-followGray hover:text-white': btnStyle === ButtonStyleEnum.LIGHT,
    'border-conduit-green text-white bg-conduit-green hover:bg-conduit-darkGreen hover:text-white active:bg-conduit-darkGreen': btnStyle === ButtonStyleEnum.GREEN,
    'py-1 px-2 text-sm rounded-buttonSm': btnSize === ButtonSizeEnum.BASE,
    'py-3 px-6 text-xl rounded': btnSize === ButtonSizeEnum.LG,
  })
  return (
    <button className={btnClasses}>
      {children}
    </button>
  )
}

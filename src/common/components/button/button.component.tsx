import clsx from 'clsx';
import { ComponentProps, FC, PropsWithChildren } from 'react';

export enum ButtonStyleEnum {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  GREEN = 'GREEN',
  DANGER = 'DANGER',
}

enum ButtonSizeEnum {
  BASE = 'BASE',
  LG = 'LG',
}

enum ButtonVariantEnum {
  BASE = 'BASE',
  OUTLINED = 'OUTLINED',
}

interface ButtonProps {
  btnStyle?: keyof typeof ButtonStyleEnum;
  btnSize?: keyof typeof ButtonSizeEnum;
  variant?: keyof typeof ButtonVariantEnum;
  type?: ComponentProps<'button'>['type'];
  disabled?: ComponentProps<'button'>['disabled'];
  onClick: any;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  btnStyle = ButtonStyleEnum.DARK,
  btnSize = ButtonSizeEnum.BASE,
  variant = ButtonVariantEnum.BASE,
  children,
  onClick,
  ...buttonProps
}) => {
  const btnClasses = clsx(
    'text-center align-middle cursor-pointer select-none border active:bg-conduit-gray-650 disabled:opacity-70',
    {
      'border-conduit-gray-700 text-conduit-gray-700 hover:bg-conduit-gray-400 focus:bg-conduit-gray-400':
        btnStyle === ButtonStyleEnum.DARK,
      'border-conduit-gray-400 text-conduit-gray-400 hover:bg-conduit-gray-400 hover:text-white':
        btnStyle === ButtonStyleEnum.LIGHT,
      'border-conduit-green active:bg-conduit-darkGreen':
        btnStyle === ButtonStyleEnum.GREEN,
      'bg-conduit-green text-white hover:bg-conduit-darkGreen hover:border-conduit-darkGreen hover:text-white':
        btnStyle === ButtonStyleEnum.GREEN &&
        variant === ButtonVariantEnum.BASE,
      'bg-white text-conduit-green hover:bg-conduit-green hover:text-white disabled:bg-conduit-darkGreen disabled:text-white':
        btnStyle === ButtonStyleEnum.GREEN &&
        variant === ButtonVariantEnum.OUTLINED,
      'border-conduit-red text-conduit-red hover:bg-conduit-red focus:bg-conduit-red hover:text-white disabled:bg-conduit-red disabled:text-white disabled:cursor-not-allowed':
        btnStyle === ButtonStyleEnum.DANGER,
      'py-1 px-2 text-sm rounded-buttonSm': btnSize === ButtonSizeEnum.BASE,
      'py-3 px-6 text-xl rounded': btnSize === ButtonSizeEnum.LG,
    }
  );

  return (
    <button className={btnClasses} onClick={onClick} {...buttonProps}>
      {children}
    </button>
  )
}

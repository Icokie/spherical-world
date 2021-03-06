// @flow strict
import React from 'react';
import { button, small, big } from './button.module.scss';

export const SIZE_SMALL: 'small' = 'small';
export const SIZE_BIG: 'big' = 'big';

export type Size =
  | typeof SIZE_SMALL
  | typeof SIZE_BIG;

type Props = {|
  +children?: React$Node;
  +size?: Size;
  +onClick?: () => mixed;
  +className?: string;
|}

const sizes = {
  [SIZE_SMALL]: small,
  [SIZE_BIG]: big,
};

const Button = ({
  size = SIZE_BIG, onClick, className = '', children,
}: Props) => (
  <button
    onClick={onClick}
    type="button"
    className={`${button} ${sizes[size]} ${className}`}
  >
    {children}
  </button>
);

export default Button;

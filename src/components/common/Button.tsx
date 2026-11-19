import { classNames } from '@constants';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
  className?: string
  elementType?: 'button' | 'a'
  href?: LinkProps['href'];
  target?: string
}

export const Button: React.FC<IProps> = ({
  children, className = '', elementType = 'button', href = '', target = '', ...props
}) => {
  if (elementType === 'button') {
    return (
      <button
        type="button"
        className={classNames('brl-button', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
  return (
    <Link
      type="button"
      className={classNames('brl-button', className)}
      href={href}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
};

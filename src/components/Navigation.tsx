import { NAVIGATION_DATA } from '@constants';
import { useOutside, useTheme } from '@hooks';
import { MoonIcon, NavHamburgerIcon, SunIcon } from '@icons';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { BrlLogo } from './common';

interface IProps { }

export const Navigation: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen, navContainer] = useOutside(false);
  const [theme, toggleTheme] = useTheme();

  return (
    <nav ref={navContainer}>
      <Link className="nav-icon" href="/">
        <BrlLogo size="md" />
        <h1>BRL-CAD</h1>
      </Link>
      <ul className="nav-links" data-open={isOpen}>
        {NAVIGATION_DATA.map((item) => (
          <li key={item.value}>
            <Link href={item.value}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <div className="nav-actions">
        <button
          type="button"
          className="nav-theme"
          onClick={toggleTheme}
          aria-label={t('NAVIGATION.TOGGLE_THEME')}
          aria-pressed={theme === 'dark'}
        >
          <MoonIcon className="nav-theme-moon" />
          <SunIcon className="nav-theme-sun" />
        </button>
        <button type="button" className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <NavHamburgerIcon />
        </button>
      </div>
    </nav>
  );
};

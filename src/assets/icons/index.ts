import React from 'react';

export { CrossIcon } from './Cross';
export { FacebookIcon } from './Facebook';
export { GithubIcon } from './Github';
export { HeartIcon } from './Heart';
export { LinkedInIcon } from './LinkedIn';
export { MoonIcon } from './Moon';
export { NavHamburgerIcon } from './NavHamburger';
export { OpenSourceIcon } from './OpenSource';
export { PlusIcon } from './Plus';
export { SolidModelingIcon } from './SolidModeling';
export { SunIcon } from './Sun';
export { TwitterIcon } from './Twitter';
export { YoutubeIcon } from './Youtube';

export interface IconProps {
  onClick?: any;
  className?: string;
  style?: React.CSSProperties;
  [keys: string]: any
}

'use client';

import { useTranslations } from 'next-intl';
import '../../app/styles/buttons.scss';
import './header.scss';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Header = () => {
  const t = useTranslations('header');

  return (
    <div className="container--header">
      <div>
        <span className="text--logo">Portal</span>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

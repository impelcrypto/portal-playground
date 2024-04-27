'use client';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import './sidebar.scss';

export const Sidebar = (): JSX.Element => {
  const t = useTranslations('sidebar');
  const pathname = usePathname();
  const path = pathname && pathname.split('/')[2];

  const pages = [
    {
      label: 'assets',
      isEnabled: true,
      icon: 'account_balance_wallet',
    },
    {
      label: 'bridge',
      isEnabled: true,
      icon: 'swap_horiz',
    },
    {
      label: 'stake',
      isEnabled: false,
      icon: 'account_balance',
    },
  ];

  const getBtnClass = (label: string): string => {
    return `btn--link ${path === label && 'bg--active'} ${path !== label && 'bg--hover'}`;
  };

  return (
    <div className="container--sidebar">
      <div className="container--links">
        {pages.map(({ label, isEnabled, icon }) =>
          isEnabled ? (
            <Link key={label} href={`/${label}`} className={getBtnClass(label)}>
              <span className="material-symbols-outlined">{icon}</span>
              <span>{t(label)}</span>
            </Link>
          ) : (
            <button key={label} className={`${getBtnClass(label)} btn--not-allowed`}>
              <span className="material-symbols-outlined">{icon}</span>
              <span>{t(label)}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
};
